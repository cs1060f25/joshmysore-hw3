import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '../lib/store';
import { computeScore } from '../lib/scoring';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, ExternalLink, Download } from 'lucide-react';
import ScoreBadge from '../components/ScoreBadge';
import IssuePills from '../components/IssuePills';
import FundingBar from '../components/FundingBar';
import NotImplemented from '../components/NotImplemented';

export default function Confirm() {
  const navigate = useNavigate();
  const { preferences, selectedCandidates } = useAppStore();

  const { data: candidates = [] } = useQuery({
    queryKey: ['candidates'],
    queryFn: async () => {
      const response = await fetch('/data/candidates.json');
      return response.json();
    }
  });

  const selectedCandidatesData = candidates.filter((c: any) => selectedCandidates.includes(c.id));
  const isSpreadStrategy = preferences.strategy === 'spread';
  const donationAmount = 50;
  const amountPerCandidate = isSpreadStrategy ? Math.floor(donationAmount / selectedCandidatesData.length) : donationAmount;

  const handleDownloadReceipt = () => {
    // This would trigger the "Not implemented yet" dialog
    const event = new CustomEvent('not-implemented', { detail: { feature: 'Download receipt' } });
    window.dispatchEvent(event);
  };

  const handleOpenCampaignSites = () => {
    selectedCandidatesData.forEach((candidate: any) => {
      window.open(candidate.site, '_blank');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
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
                <h1 className="text-3xl font-bold text-gray-900">Confirm Your Donation</h1>
                <p className="text-gray-600">
                  {isSpreadStrategy 
                    ? `Split $${donationAmount} across ${selectedCandidatesData.length} candidates`
                    : `Donate $${donationAmount} to ${selectedCandidatesData[0]?.name}`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {isSpreadStrategy ? (
          // Spread Strategy Layout
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Donation Allocation</h2>
                <div className="space-y-4">
                  {selectedCandidatesData.map((candidate: any) => {
                    const score = computeScore(candidate, preferences);
                    return (
                      <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                            <Badge variant="outline">{candidate.district}</Badge>
                            <ScoreBadge score={score} />
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{candidate.profile}</p>
                          <IssuePills issues={candidate.issues} className="mt-2" />
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">${amountPerCandidate}</div>
                          <div className="text-sm text-gray-600">per candidate</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Impact Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">${donationAmount}</div>
                    <div className="text-sm text-gray-600">Total Donation</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedCandidatesData.length}</div>
                    <div className="text-sm text-gray-600">Candidates Supported</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">${amountPerCandidate}</div>
                    <div className="text-sm text-gray-600">Per Candidate</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        ) : (
          // Single Strategy Layout
          <div className="space-y-6">
            {selectedCandidatesData.map((candidate: any) => {
              const score = computeScore(candidate, preferences);
              return (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
                        <p className="text-gray-600">{candidate.district}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <ScoreBadge score={score} />
                          <Badge variant="outline">{candidate.competitiveness}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">${donationAmount}</div>
                        <div className="text-sm text-gray-600">donation amount</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Polling Trend</h3>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {candidate.polling.us}% vs {candidate.polling.them}%
                          </div>
                          <p className="text-sm text-gray-600">(MoE ±{candidate.polling.moe}%)</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Funding Gap</h3>
                        <FundingBar
                          us={candidate.funding.us}
                          them={candidate.funding.them}
                        />
                        <div className="mt-2 text-sm text-gray-600">
                          <p>Our candidate: ${(candidate.funding.us / 1000000).toFixed(1)}M</p>
                          <p>Opponent: ${(candidate.funding.them / 1000000).toFixed(1)}M</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">District Profile</h3>
                      <p className="text-gray-700 leading-relaxed">{candidate.profile}</p>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Issues</h3>
                      <IssuePills issues={candidate.issues} />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Button
            onClick={handleOpenCampaignSites}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            {isSpreadStrategy ? 'Open Campaign Sites' : 'Open Campaign Site'}
          </Button>
          <Button
            variant="outline"
            onClick={handleDownloadReceipt}
            className="text-lg px-8 py-3"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Receipt
          </Button>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            This is a prototype with synthetic data. Not a real political committee.
          </p>
        </motion.div>
      </div>

      <NotImplemented />
    </div>
  );
}
