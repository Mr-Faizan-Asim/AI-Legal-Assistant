// src/components/LawLookupAgentModal.jsx
import React, { useState } from 'react';
import { Search, X, Loader, AlertCircle, FileText } from 'lucide-react';

const LawLookupAgentModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Use Hugging Face Inference API (free, no auth, CORS-enabled)
      const response = await fetch(
        'https://api-inference.huggingface.co/models/google/flan-t5-large',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: `What is the UK ${query}? Provide a concise summary including year, purpose, and key points.`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('AI model is loading or unavailable. Try again in 10 seconds.');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const answer = data?.[0]?.generated_text || data.generated_text || 'No answer generated.';

      // Format result
      setResults({
        title: `UK ${query}`,
        summary: answer.trim(),
        url: null // No official link since it's AI-generated
      });
    } catch (err) {
      console.error('AI Search Error:', err);
      setError(err.message || 'Failed to get AI response. The model may be loading.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            AI Law Lookup Agent
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Ask about any UK law (e.g., <span className="font-medium">"Human Rights Act"</span>, <span className="font-medium">"GDPR UK"</span>, <span className="font-medium">"Consumer Rights"</span>)
          </p>

          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., What is the Equality Act 2010?"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                autoFocus
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              </button>
            </div>
          </form>

          {error && (
            <div className="flex items-start gap-2 text-red-600 bg-red-50 p-4 rounded-lg mb-4">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {results && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{results.title}</h3>
              <div className="space-y-2 text-gray-700">
                <p>{results.summary}</p>
                <p className="text-sm text-gray-500 italic mt-3">
                  ⚠️ This is an AI-generated summary. For legal advice, consult a solicitor or check{' '}
                  <a 
                    href="https://www.legislation.gov.uk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    legislation.gov.uk
                  </a>
                </p>
              </div>
            </div>
          )}

          {!results && !error && !loading && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>Ask about any UK law — AI will summarize it for you</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LawLookupAgentModal;