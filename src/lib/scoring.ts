export interface Candidate {
  id: string;
  name: string;
  district: string;
  polling: {
    us: number;
    them: number;
    moe: number;
  };
  funding: {
    us: number;
    them: number;
  };
  issues: string[];
  donationLeverage: "high" | "med-high" | "medium" | "low";
  timeToElectionDays: number;
  competitiveness: "tossup" | "lean" | "safe";
  site: string;
  profile: string;
}

export interface UserPreferences {
  issues: string[];
  impact: "close" | "track" | "infra" | undefined;
  strategy: "single" | "spread" | undefined;
}

export function computeScore(candidate: Candidate, preferences: UserPreferences): number {
  // Competitiveness weight
  const competitivenessWeight = {
    "tossup": 1,
    "lean": 0.6,
    "safe": 0.2
  }[candidate.competitiveness];

  // Funding gap calculation
  const maxFunding = Math.max(candidate.funding.us, candidate.funding.them, 1);
  const fundingGap = Math.max(0, Math.min(1, (candidate.funding.them - candidate.funding.us) / maxFunding));

  // Time decay calculation
  const timeDecay = Math.max(0, Math.min(1, 1 - (candidate.timeToElectionDays / 365)));

  // Issue match calculation
  const selectedIssues = preferences.issues;
  const candidateIssues = candidate.issues;
  const issueOverlap = selectedIssues.filter(issue => candidateIssues.includes(issue)).length;
  const issueMatch = selectedIssues.length > 0 ? issueOverlap / Math.max(selectedIssues.length, 1) : 0;

  // Dynamic weight adjustment based on impact preference
  let weights = {
    competitiveness: 0.35,
    fundingGap: 0.35,
    timeDecay: 0.15,
    issueMatch: 0.15
  };

  // Adjust weights based on impact preference
  if (preferences.impact === 'close') {
    weights.competitiveness = 0.5;
    weights.fundingGap = 0.3;
    weights.timeDecay = 0.1;
    weights.issueMatch = 0.1;
  } else if (preferences.impact === 'track') {
    weights.competitiveness = 0.25;
    weights.fundingGap = 0.25;
    weights.timeDecay = 0.15;
    weights.issueMatch = 0.35;
  } else if (preferences.impact === 'infra') {
    weights.competitiveness = 0.25;
    weights.fundingGap = 0.2;
    weights.timeDecay = 0.4;
    weights.issueMatch = 0.15;
  }

  // Final score calculation with dynamic weights
  const score = 
    weights.competitiveness * competitivenessWeight +
    weights.fundingGap * fundingGap +
    weights.timeDecay * timeDecay +
    weights.issueMatch * issueMatch;

  return Math.round(score * 100) / 100; // Round to 2 decimal places
}

export function getScoreExplanation(candidate: Candidate, preferences: UserPreferences) {
  const competitivenessWeight = {
    "tossup": 1,
    "lean": 0.6,
    "safe": 0.2
  }[candidate.competitiveness];

  const maxFunding = Math.max(candidate.funding.us, candidate.funding.them, 1);
  const fundingGap = Math.max(0, Math.min(1, (candidate.funding.them - candidate.funding.us) / maxFunding));

  const timeDecay = Math.max(0, Math.min(1, 1 - (candidate.timeToElectionDays / 365)));

  const selectedIssues = preferences.issues;
  const candidateIssues = candidate.issues;
  const issueOverlap = selectedIssues.filter(issue => candidateIssues.includes(issue)).length;
  const issueMatch = selectedIssues.length > 0 ? issueOverlap / Math.max(selectedIssues.length, 1) : 0;

  return {
    competitiveness: {
      value: competitivenessWeight,
      weight: 0.35,
      contribution: competitivenessWeight * 0.35
    },
    fundingGap: {
      value: fundingGap,
      weight: 0.35,
      contribution: fundingGap * 0.35
    },
    timeDecay: {
      value: timeDecay,
      weight: 0.15,
      contribution: timeDecay * 0.15
    },
    issueMatch: {
      value: issueMatch,
      weight: 0.15,
      contribution: issueMatch * 0.15
    }
  };
}
