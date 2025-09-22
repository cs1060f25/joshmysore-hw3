import { DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export default function ScoringDialog() {
  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>How Scoring Works</DialogTitle>
      </DialogHeader>
      <div className="py-4 space-y-6">
        <div>
          <p className="text-gray-600 mb-4">
            Our scoring algorithm evaluates candidates based on four key factors to determine 
            where your donation will have the most impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Competitiveness</h3>
              <Badge variant="outline">35%</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              How close the race is expected to be
            </p>
            <div className="text-xs text-gray-500">
              • Tossup: 1.0<br/>
              • Lean: 0.6<br/>
              • Safe: 0.2
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Funding Gap</h3>
              <Badge variant="outline">35%</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              How much our candidate is being outspent
            </p>
            <div className="text-xs text-gray-500">
              Higher gap = higher score
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Time Decay</h3>
              <Badge variant="outline">15%</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              How close the election is
            </p>
            <div className="text-xs text-gray-500">
              Closer elections score higher
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Issue Match</h3>
              <Badge variant="outline">15%</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              How well candidate aligns with your issues
            </p>
            <div className="text-xs text-gray-500">
              Based on your selected priorities
            </div>
          </Card>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Example Calculation</h4>
          <p className="text-sm text-blue-800">
            A tossup race (1.0) with high funding gap (0.8) and good issue match (0.7) 
            would score: (1.0 × 0.35) + (0.8 × 0.35) + (0.5 × 0.15) + (0.7 × 0.15) = 0.78
          </p>
        </div>
      </div>
    </DialogContent>
  );
}
