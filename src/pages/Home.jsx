import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, BookOpen, MessageCircle, Shield } from 'lucide-react';
import LawLookupAgent from '../components/LawLookupAgent';

const Home = () => {
  const navigate = useNavigate();
  const [isLawModalOpen, setIsLawModalOpen] = useState(false);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Comprehensive UK Laws',
      description: 'Access to complete UK legal database with real-time updates'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'AI Legal Assistant',
      description: 'Get instant answers to your legal questions from our AI expert'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Confidential',
      description: 'Your conversations are private and securely encrypted'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Scale className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">UK Legal Assistant</span>
            </div>
            <button 
              onClick={() => navigate('/chat')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Chat
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Your AI-Powered
              <span className="text-blue-600 block">Legal Assistant</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get instant answers to your UK legal questions. Our AI assistant is trained on comprehensive 
              UK legislation and case law to provide accurate legal guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/chat')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
              >
                Start Legal Consultation
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-lg font-semibold">
                Learn More
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={index === 0 ? () => setIsLawModalOpen(true) : undefined}
                className={`
                  bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow
                  ${index === 0 ? 'cursor-pointer hover:bg-white/80' : ''}
                `}
              >
                <div className="text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 text-center text-gray-500 text-sm max-w-2xl mx-auto">
            <p>
              Disclaimer: This AI legal assistant provides general information and should not be considered 
              as legal advice. For specific legal matters, please consult with a qualified solicitor.
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Law Lookup Modal - Placed at the root level */}
      <LawLookupAgent
        isOpen={isLawModalOpen}
        onClose={() => setIsLawModalOpen(false)}
      />
    </div>
  );
};

export default Home;