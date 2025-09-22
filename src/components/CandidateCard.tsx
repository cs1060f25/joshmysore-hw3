import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DollarSign } from 'lucide-react';
import ScoreBadge from './ScoreBadge';
import IssuePills from './IssuePills';
import FundingBar from './FundingBar';

interface Candidate {
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
  donationLeverage: string;
  timeToElectionDays: number;
  competitiveness: string;
  site: string;
  profile: string;
  score?: number;
}

interface CandidateCardProps {
  candidate: Candidate;
  onDonate: () => void;
  onViewDetails: () => void;
}

export default function CandidateCard({ candidate, onDonate, onViewDetails }: CandidateCardProps) {
  const leverageColors: Record<string, string> = {
    high: 'bg-red-100 text-red-800',
    'med-high': 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-gray-100 text-gray-800'
  };

  const competitivenessColors: Record<string, string> = {
    tossup: 'bg-red-100 text-red-800',
    lean: 'bg-yellow-100 text-yellow-800',
    safe: 'bg-green-100 text-green-800'
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{candidate.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{candidate.district}</p>
            <div className="flex items-center space-x-2">
              {candidate.score !== undefined && <ScoreBadge score={candidate.score} />}
              <Badge className={competitivenessColors[candidate.competitiveness]}>
                {candidate.competitiveness}
              </Badge>
            </div>
          </div>
        </div>

        {/* Polling */}
        <div className="mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-gray-900">
              {candidate.polling.us}% vs {candidate.polling.them}%
            </div>
            <p className="text-xs text-gray-600">(MoE ±{candidate.polling.moe}%)</p>
          </div>
        </div>

        {/* Funding Gap */}
        <div className="mb-4">
          <FundingBar
            us={candidate.funding.us}
            them={candidate.funding.them}
          />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>Us: ${(candidate.funding.us / 1000000).toFixed(1)}M</span>
            <span>Them: ${(candidate.funding.them / 1000000).toFixed(1)}M</span>
          </div>
        </div>

        {/* Issues */}
        <div className="mb-4">
          <IssuePills issues={candidate.issues} />
        </div>

        {/* Metrics */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-gray-600">Leverage:</span>
              <Badge className={`ml-1 ${leverageColors[candidate.donationLeverage]}`}>
                {candidate.donationLeverage}
              </Badge>
            </div>
            <div>
              <span className="text-gray-600">Days:</span>
              <span className="ml-1 font-medium">{candidate.timeToElectionDays}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto space-y-2">
          <Button
            onClick={onDonate}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Donate $50
          </Button>
          <Button
            variant="outline"
            onClick={onViewDetails}
            className="w-full"
          >
            View Details
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
