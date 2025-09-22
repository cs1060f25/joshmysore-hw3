import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Target, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import DemoSimulator from '../components/DemoSimulator';

export default function HomePage() {
  const features = [
    {
      icon: Target,
      title: "Smart Matching",
      description: "AI-powered algorithm matches your priorities with high-impact candidates"
    },
    {
      icon: TrendingUp,
      title: "Impact Tracking",
      description: "See exactly how your donation will make a difference"
    },
    {
      icon: CheckCircle,
      title: "Transparent Scoring",
      description: "Understand the methodology behind every recommendation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 pb-8">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-blue-900 via-red-600 to-yellow-600 bg-clip-text text-transparent">
                    Make your political
                  </span>
                  <br />
                  <span className="text-gray-900">dollars count.</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Find the candidates where your donation will have the most impact on the issues you care about most.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/demo">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                    Run the Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold rounded-2xl border-2 hover:bg-gray-50">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Content - Demo Simulator */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <DemoSimulator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How ScaleTilt Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform uses advanced algorithms to match your political priorities with candidates where your donation will have maximum impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-red-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to make an impact?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Try our demo and see how ScaleTilt can help you make smarter political donations.
            </p>
            <Link to="/demo">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Start the Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
