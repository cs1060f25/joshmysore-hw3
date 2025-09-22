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
  impact: string[];
  strategy: "single" | "spread";
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

  // Final score calculation
  const score = 
    0.35 * competitivenessWeight +
    0.35 * fundingGap +
    0.15 * timeDecay +
    0.15 * issueMatch;

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
