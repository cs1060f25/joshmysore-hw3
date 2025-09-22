import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '../lib/store';
import { computeScore } from '../lib/scoring';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, ExternalLink, TrendingUp, DollarSign, Calendar, Target } from 'lucide-react';
import ScoreBadge from '../components/ScoreBadge';
import IssuePills from '../components/IssuePills';
import FundingBar from '../components/FundingBar';

export default function Candidate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { preferences, setSelectedCandidates } = useAppStore();

  const { data: candidates = [], isLoading } = useQuery({
    queryKey: ['candidates'],
    queryFn: async () => {
      const response = await fetch('/src/data/candidates.json');
      return response.json();
    }
  });

  const candidate = candidates.find(c => c.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading candidate details...</p>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Candidate not found</h1>
          <Button onClick={() => navigate('/results')}>
            Back to Results
          </Button>
        </div>
      </div>
    );
  }

  const score = computeScore(candidate, preferences);
  const leverageColors = {
    high: 'bg-red-100 text-red-800',
    'med-high': 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-gray-100 text-gray-800'
  };

  const competitivenessColors = {
    tossup: 'bg-red-100 text-red-800',
    lean: 'bg-yellow-100 text-yellow-800',
    safe: 'bg-green-100 text-green-800'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/results')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Results
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{candidate.name}</h1>
                <p className="text-gray-600">{candidate.district}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ScoreBadge score={score} />
              <Button
                onClick={() => {
                  setSelectedCandidates([candidate.id]);
                  navigate('/confirm');
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Donate $50
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Polling Snapshot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Polling Snapshot</h2>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {candidate.polling.us}% vs {candidate.polling.them}%
                  </div>
                  <p className="text-gray-600">(MoE ±{candidate.polling.moe}%)</p>
                </div>
              </Card>
            </motion.div>

            {/* Funding Gap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Funding Gap</h2>
                </div>
                <FundingBar
                  us={candidate.funding.us}
                  them={candidate.funding.them}
                />
                <div className="mt-4 text-sm text-gray-600">
                  <p>Our candidate: ${(candidate.funding.us / 1000000).toFixed(1)}M</p>
                  <p>Opponent: ${(candidate.funding.them / 1000000).toFixed(1)}M</p>
                </div>
              </Card>
            </motion.div>

            {/* District Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">District Profile</h2>
                <p className="text-gray-700 leading-relaxed">{candidate.profile}</p>
              </Card>
            </motion.div>

            {/* Issues and Positions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Issues</h2>
                <IssuePills issues={candidate.issues} />
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Donation Leverage</span>
                    <Badge className={leverageColors[candidate.donationLeverage]}>
                      {candidate.donationLeverage}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Competitiveness</span>
                    <Badge className={competitivenessColors[candidate.competitiveness]}>
                      {candidate.competitiveness}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Days to Election</span>
                    <span className="text-sm font-medium">{candidate.timeToElectionDays}</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      setSelectedCandidates([candidate.id]);
                      navigate('/confirm');
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Donate $50
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(candidate.site, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Campaign Site
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
