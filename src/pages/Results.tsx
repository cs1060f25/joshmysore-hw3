import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '../lib/store';
import { computeScore } from '../lib/scoring';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogTrigger } from '../components/ui/dialog';
import { ArrowLeft, Info } from 'lucide-react';
import CandidateCard from '../components/CandidateCard';
import ScoringDialog from '../components/ScoringDialog';

export default function Results() {
  const navigate = useNavigate();
  const { preferences, setSelectedCandidates } = useAppStore();
  const [showScoring, setShowScoring] = useState(false);

  const { data: candidates = [], isLoading } = useQuery({
    queryKey: ['candidates'],
    queryFn: async () => {
      const response = await fetch('/data/candidates.json');
      return response.json();
    }
  });

  const scoredCandidates = useMemo(() => {
    return candidates
      .map((candidate: any) => ({
        ...candidate,
        score: computeScore(candidate, preferences)
      }))
      .sort((a: any, b: any) => b.score - a.score);
  }, [candidates, preferences]);

  const handleDonate = (candidateId: string) => {
    if (preferences.strategy === 'single') {
      setSelectedCandidates([candidateId]);
      navigate('/confirm');
    } else {
      // For spread strategy, select top 3
      const topCandidates = scoredCandidates.slice(0, 3).map((c: any) => c.id);
      setSelectedCandidates(topCandidates);
      navigate('/confirm');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Wizard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Your Matches</h1>
                <p className="text-gray-600">
                  {scoredCandidates.length} candidates ranked by impact potential
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog open={showScoring} onOpenChange={setShowScoring}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Info className="w-4 h-4 mr-2" />
                    How scoring works
                  </Button>
                </DialogTrigger>
                <ScoringDialog />
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Preferences</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Issues</h4>
                  <div className="flex flex-wrap gap-2">
                    {preferences.issues.map(issue => (
                      <Badge key={issue} variant="secondary" className="text-xs">
                        {issue}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Impact Focus</h4>
                  <Badge variant="outline" className="text-xs">
                    {preferences.impact === 'close' ? 'Close races' : 
                     preferences.impact === 'track' ? 'Track record' : 
                     preferences.impact === 'infra' ? 'Long-term infrastructure' : 'Not selected'}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Strategy</h4>
                  <Badge variant="default" className="text-xs">
                    {preferences.strategy === 'single' ? 'Single high-impact' : 'Spread across several'}
                  </Badge>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-6"
                onClick={() => navigate('/')}
              >
                Edit Preferences
              </Button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {scoredCandidates.length === 0 ? (
              <Card className="p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-600 mb-4">
                  Try selecting some issues in your preferences to see candidate matches.
                </p>
                <Button onClick={() => navigate('/')}>
                  Start Over
                </Button>
              </Card>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {scoredCandidates.map((candidate: any) => (
                  <motion.div key={candidate.id} variants={itemVariants}>
                    <CandidateCard
                      candidate={candidate}
                      onDonate={() => handleDonate(candidate.id)}
                      onViewDetails={() => navigate(`/candidate/${candidate.id}`)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
