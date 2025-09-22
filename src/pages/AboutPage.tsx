import { motion } from 'framer-motion';
import { Target, Users, Lightbulb } from 'lucide-react';
import { Card } from '../components/ui/card';

export default function AboutPage() {
  const goals = [
    {
      icon: Target,
      title: "Maximize Impact",
      description: "Help donors identify where their money will have the greatest political impact based on data-driven analysis."
    },
    {
      icon: Users,
      title: "Democratize Access",
      description: "Make sophisticated political analysis accessible to everyday citizens, not just political insiders."
    },
    {
      icon: Lightbulb,
      title: "Increase Transparency",
      description: "Provide clear, understandable explanations of how political donations translate to real-world impact."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 pb-8">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">ScaleTilt</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're building the future of political engagement through data-driven donation strategies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-12 bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Political donations are often made with good intentions but little strategic thinking. 
                  Most donors give based on personal connections, emotional appeals, or broad ideological 
                  alignment rather than where their money will have the most impact.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This leads to inefficient allocation of resources, with some candidates receiving 
                  massive funding while others in equally important races struggle to compete. 
                  The result? Missed opportunities to influence policy and elections where it matters most.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We need to think more strategically about political giving. It's not just about 
                  supporting candidates we like—it's about supporting candidates where our support 
                  will make the biggest difference.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Solution</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ScaleTilt uses advanced algorithms to analyze political races and match your priorities 
              with candidates where your donation will have maximum impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tell us your priorities</h4>
                    <p className="text-gray-600">Select the issues that matter most to you and your preferred impact approach.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">We analyze the data</h4>
                    <p className="text-gray-600">Our algorithm evaluates competitiveness, funding gaps, and issue alignment.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Get your matches</h4>
                    <p className="text-gray-600">Receive ranked recommendations with clear explanations of impact potential.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-red-600 rounded-3xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Our Algorithm Considers</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Race competitiveness and polling data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Funding gaps between candidates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Time remaining until election</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Issue alignment with your priorities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Historical voting patterns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Goals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're building ScaleTilt to create a more effective and transparent political giving ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <goal.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{goal.title}</h3>
                  <p className="text-gray-600">{goal.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to make a difference?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Try our demo and see how ScaleTilt can help you make smarter political donations.
            </p>
            <a
              href="/demo"
              className="inline-block bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Try the Demo
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
