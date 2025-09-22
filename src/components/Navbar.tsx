import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Scale } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Run Demo', path: '/demo' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Scale className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-600 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-900 to-red-600 bg-clip-text text-transparent">
                ScaleTilt
              </h1>
              <p className="text-xs text-gray-600 -mt-0.5">Political Impact</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-100 to-red-100 rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-4 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}