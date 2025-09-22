import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { RotateCcw, Play } from 'lucide-react';

interface DemoSimulatorProps {
  className?: string;
}

export default function DemoSimulator({ className = '' }: DemoSimulatorProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showReplay, setShowReplay] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    stances: [] as string[],
    campaignType: '',
    impact: ''
  });
  const prefersReducedMotion = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion.current) {
      startDemo();
    }
  }, []);

  const startDemo = () => {
    setCurrentPage(0);
    setFormData({ name: '', age: '', stances: [], campaignType: '', impact: '' });
    setShowReplay(false);
    scrollToTop();
    runTimeline();
  };

  const runTimeline = async () => {
    if (prefersReducedMotion.current) return;

    // Page 1: Form filling
    setCurrentPage(1);
    await delay(1000);
    await typeText('Jordan', (text) => setFormData(prev => ({ ...prev, name: text })));
    
    await delay(500);
    await typeText('21', (text) => setFormData(prev => ({ ...prev, age: text })));
    
    await delay(500);
    setFormData(prev => ({ ...prev, stances: ['Climate', 'Economic justice'] }));
    scrollToBottom();
    
    await delay(500);
    setFormData(prev => ({ ...prev, campaignType: 'Federal' }));
    scrollToBottom();
    
    await delay(500);
    setFormData(prev => ({ ...prev, impact: 'Close races' }));
    scrollToBottom();
    
    // Page 2: Results and confirmation
    await delay(2000);
    setCurrentPage(2);
    scrollToTop();
    
    await delay(3000);
    setShowReplay(true);
    scrollToBottom();
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const typeText = async (text: string, setter: (text: string) => void) => {
    for (let i = 0; i <= text.length; i++) {
      setter(text.slice(0, i));
      await delay(100);
    }
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      setTimeout(() => {
        scrollContainerRef.current!.scrollTop = scrollContainerRef.current!.scrollHeight;
      }, 100);
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      setTimeout(() => {
        scrollContainerRef.current!.scrollTop = 0;
      }, 100);
    }
  };

  const candidates = [
    { name: 'Alicia Rivera', district: 'Ohio 12th', score: 0.85, issues: ['Climate', 'Healthcare'] },
    { name: 'Marcus Delgado', district: 'Arizona 7th', score: 0.78, issues: ['Immigration', 'Economy'] },
    { name: 'Erin Shah', district: 'Michigan 3rd', score: 0.72, issues: ['Climate', 'Education'] }
  ];

  if (prefersReducedMotion.current) {
    return (
      <div className={`bg-gradient-to-br from-blue-600 to-red-600 rounded-3xl p-8 shadow-2xl ${className}`}>
        <div className="bg-white rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interactive Demo</h3>
          <p className="text-gray-600 mb-4">Experience the full ScaleTilt donation flow</p>
          <Button onClick={startDemo} className="bg-gradient-to-r from-blue-600 to-red-600 text-white">
            <Play className="w-4 h-4 mr-2" />
            Start Demo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Demo Frame - Fixed size */}
      <div className="bg-gradient-to-br from-blue-600 to-red-600 rounded-3xl p-8 shadow-2xl w-[28rem] h-[32rem]">
        <div className="bg-white rounded-2xl p-6 space-y-4 h-full overflow-y-auto scroll-smooth" ref={scrollContainerRef}>
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex-1 bg-gray-200 rounded-full h-2 ml-4">
              <motion.div 
                className="bg-gradient-to-r from-blue-600 to-red-600 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentPage / 2) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* Page 1: Form */}
            {currentPage === 1 && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3"
              >
                <h3 className="text-base font-semibold text-gray-900">Complete Your Profile</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      readOnly
                      className="w-full px-3 py-2 border rounded-lg ring-2 ring-blue-500"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="text"
                      value={formData.age}
                      readOnly
                      className="w-full px-3 py-2 border rounded-lg ring-2 ring-blue-500"
                      placeholder="Enter your age"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Political Stances</label>
                    <div className="grid grid-cols-2 gap-1">
                      {['Climate', 'Healthcare', 'Immigration', 'Economic justice'].map((stance) => (
                        <motion.div
                          key={stance}
                          className={`p-1.5 border rounded text-xs cursor-pointer transition-all ${
                            formData.stances.includes(stance) 
                              ? 'bg-blue-50 border-blue-500 text-blue-700' 
                              : 'border-gray-200'
                          }`}
                          animate={{
                            scale: formData.stances.includes(stance) ? 1.05 : 1,
                            backgroundColor: formData.stances.includes(stance) ? '#dbeafe' : '#ffffff'
                          }}
                        >
                          {stance}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
                    <div className="grid grid-cols-3 gap-1">
                      {['Local', 'State', 'Federal'].map((type) => (
                        <motion.div
                          key={type}
                          className={`p-1.5 border rounded text-xs cursor-pointer text-center transition-all ${
                            formData.campaignType === type 
                              ? 'bg-blue-50 border-blue-500 text-blue-700' 
                              : 'border-gray-200'
                          }`}
                          animate={{
                            scale: formData.campaignType === type ? 1.05 : 1,
                            backgroundColor: formData.campaignType === type ? '#dbeafe' : '#ffffff'
                          }}
                        >
                          {type}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Political Impact</label>
                    <div className="space-y-1">
                      {['Close races', 'Track record', 'Long-term infrastructure'].map((impact) => (
                        <motion.div
                          key={impact}
                          className={`p-2 border rounded cursor-pointer transition-all text-xs ${
                            formData.impact === impact 
                              ? 'bg-blue-50 border-blue-500 text-blue-700' 
                              : 'border-gray-200'
                          }`}
                          animate={{
                            scale: formData.impact === impact ? 1.02 : 1,
                            backgroundColor: formData.impact === impact ? '#dbeafe' : '#ffffff'
                          }}
                        >
                          {impact}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Page 2: Results */}
            {currentPage === 2 && (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3"
              >
                <h3 className="text-base font-semibold text-gray-900">Your Matches</h3>
                <div className="space-y-2">
                  {candidates.map((candidate, index) => (
                    <motion.div
                      key={candidate.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">{candidate.name}</h4>
                            <p className="text-xs text-gray-600">{candidate.district}</p>
                            <div className="flex gap-1 mt-1">
                              {candidate.issues.map(issue => (
                                <span key={issue} className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">{issue}</span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              {Math.round(candidate.score * 100)}%
                            </span>
                            <div className="text-xs bg-blue-600 text-white px-2 py-1 rounded mt-1">
                              Donate $50
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-3"
                >
                  <h3 className="text-sm font-semibold text-green-900 mb-1">Donation Confirmed!</h3>
                  <p className="text-green-700 text-xs">$50 donated to Alicia Rivera for Ohio's 12th District</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Replay Button */}
          <AnimatePresence>
            {showReplay && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <Button 
                  onClick={startDemo}
                  className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Replay Demo
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}