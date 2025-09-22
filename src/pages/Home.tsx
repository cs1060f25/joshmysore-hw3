import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppStore } from '../lib/store';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { ArrowRight, CheckCircle, RotateCcw } from 'lucide-react';

const ISSUES = [
  { id: 'climate', label: 'Climate & Environment' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'immigration', label: 'Immigration' },
  { id: 'economy', label: 'Economy' },
  { id: 'crime', label: 'Crime & Safety' },
  { id: 'education', label: 'Education' }
];

const IMPACT_OPTIONS = [
  { id: 'close', label: 'Support candidates in close races', description: 'Focus on competitive races where every vote counts' },
  { id: 'track', label: 'Support candidates with track records', description: 'Support candidates with proven records on your issues' },
  { id: 'infra', label: 'Build long-term movement infrastructure', description: 'Invest in building lasting political infrastructure' }
];

const STRATEGY_OPTIONS = [
  { id: 'single', label: 'Single high-impact donation', description: 'Focus all resources on one candidate' },
  { id: 'spread', label: 'Spread across several', description: 'Distribute donations across multiple candidates' }
];

export default function Home() {
  const navigate = useNavigate();
  const { 
    preferences, 
    currentStep, 
    setCurrentStep, 
    toggleIssue, 
    setImpact, 
    setStrategy, 
    reset 
  } = useAppStore();

  // Reset store on page load to ensure fresh start
  useEffect(() => {
    reset();
  }, [reset]);

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      navigate('/results');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 0) return preferences.issues.length >= 1;
    if (currentStep === 1) return preferences.impact !== undefined;
    if (currentStep === 2) return preferences.strategy !== undefined;
    return false;
  };

  const handleStartOver = () => {
    reset();
    setCurrentStep(0);
  };

  const handleImpactChange = (value: string) => {
    setImpact(value as "close" | "track" | "infra");
  };

  const handleStrategyChange = (value: string) => {
    setStrategy(value as "single" | "spread");
  };

  const stepVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      {/* Header */}
      <div className="text-center py-16 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-gray-900 mb-6"
        >
          ScaleTilt Demo
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
        >
          Find the candidates where your donation will have the most impact on the issues you care about.
        </motion.p>
        
        {/* Start Over Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <Button
            variant="outline"
            onClick={handleStartOver}
            className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-900 font-semibold px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
        </motion.div>
      </div>

      {/* Wizard */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <Card className="p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[0, 1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step + 1}
                </div>
                {step < 2 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="issues"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What issues matter most to you?</h2>
                  <p className="text-gray-600 mb-6">Select all that apply to find candidates aligned with your priorities.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ISSUES.map((issue) => (
                      <div key={issue.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={issue.id}
                          checked={preferences.issues.includes(issue.id)}
                          onCheckedChange={() => toggleIssue(issue.id)}
                        />
                        <Label htmlFor={issue.id} className="text-lg cursor-pointer">
                          {issue.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="impact"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What kind of impact do you want?</h2>
                  <p className="text-gray-600 mb-6">Choose your preferred approach to political giving.</p>
                  <RadioGroup value={preferences.impact} onValueChange={handleImpactChange}>
                    <div className="space-y-4">
                      {IMPACT_OPTIONS.map((option) => (
                        <div key={option.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <div className="flex-1">
                            <Label htmlFor={option.id} className="text-lg font-medium cursor-pointer">
                              {option.label}
                            </Label>
                            <p className="text-gray-600 mt-1">{option.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="strategy"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">What's your donation strategy?</h2>
                  <p className="text-gray-600 mb-6">Choose how you'd like to distribute your political donations.</p>
                  <RadioGroup value={preferences.strategy} onValueChange={handleStrategyChange}>
                    <div className="space-y-4">
                      {STRATEGY_OPTIONS.map((option) => (
                        <div key={option.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <div className="flex-1">
                            <Label htmlFor={option.id} className="text-lg font-medium cursor-pointer">
                              {option.label}
                            </Label>
                            <p className="text-gray-600 mt-1">{option.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentStep === 2 ? 'See Matches' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
