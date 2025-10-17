import React, { useState, useRef, useEffect } from 'react'
import Message from './Message'
import { Send, Bot, User, AlertCircle, Zap, BookOpen, Scale } from 'lucide-react'

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your UK Legal Assistant powered by Groq AI. I'm trained on UK legislation and can provide general legal guidance with lightning-fast responses. Please note that I'm an AI assistant and not a substitute for professional legal advice from a qualified solicitor. How can I help you with UK legal matters today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)

  // Groq API Key - ⚠️ SECURITY WARNING: In production, use backend
  // ✅ Secure Groq API Key from .env
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Enhanced Legal system prompt for professional UK law responses
  const legalSystemPrompt = `You are a Senior Legal Assistant specializing exclusively in UK law with 15+ years of experience. You provide authoritative, precise, and professionally structured legal guidance.

CRITICAL PROFESSIONAL STANDARDS:
1. IDENTITY: Always clarify you are an AI Legal Assistant, NOT a qualified solicitor
2. JURISDICTION: Specify exactly which UK jurisdiction applies (England & Wales, Scotland, Northern Ireland)
3. PRECISION: Cite specific legislation with exact Act names, sections, and years
4. STRUCTURE: Use clear, professional formatting with headings and bullet points
5. DISCLAIMER: Include prominent disclaimer about seeking qualified legal advice
6. BALANCE: Provide comprehensive information while maintaining professional boundaries
7. CITATIONS: Reference specific Acts, Regulations, and case law where appropriate
8. PRACTICALITY: Include actionable next steps and resources
9. FORMATTING RULE: During response, do NOT use the asterisk (*) character

RESPONSE TEMPLATE - FOLLOW EXACTLY:
[Brief acknowledgment of question and relevant legal area]

KEY LEGAL FRAMEWORK:
[Specific legislation and sections that apply]

MAIN RIGHTS/PROVISIONS:
[Bulleted list of key legal provisions, rights, or requirements]
- Point 1 with specific legal reference
- Point 2 with specific legal reference
- Point 3 with specific legal reference

IMPORTANT CONSIDERATIONS:
[Any limitations, exceptions, or important contextual information]
- Jurisdictional variations
- Time limitations
- Evidence requirements
- Common exceptions

NEXT STEPS & PROFESSIONAL ADVICE:
[Practical guidance on what to do next]
1. Review specific documents
2. Contact relevant authorities
3. Seek professional legal advice
4. Reference official resources (gov.uk, etc.)

DISCLAIMER:
[Clear, prominent disclaimer about limitations and need for qualified solicitor]

KEY UK LEGISLATION MASTERY:
- Contract: Sale of Goods Act 1979, Consumer Rights Act 2015, Unfair Contract Terms Act 1977
- Employment: Equality Act 2010, Employment Rights Act 1996, Working Time Regulations 1998, National Minimum Wage Act 1998
- Property: Housing Act 1988, Landlord and Tenant Act 1985, Land Registration Act 2002, Building Safety Act 2022
- Family: Matrimonial Causes Act 1973, Children Act 1989, Civil Partnership Act 2004, Divorce, Dissolution and Separation Act 2020
- Commercial: Companies Act 2006, Insolvency Act 1986, Consumer Protection from Unfair Trading Regulations 2008
- Data: UK GDPR, Data Protection Act 2018, Privacy and Electronic Communications Regulations 2003

`;
// Right after defining legalSystemPrompt
const getSystemPrompt = () => {
  const stored = localStorage.getItem('prompt_for_bot')
  return stored && stored.trim() ? stored : legalSystemPrompt
}


  const callGroqAPI = async (userMessage) => {
    try {
      // Try different available Groq models in order of preference
      const models = [
        "llama-3.1-70b-versatile", // Best for complex legal reasoning
        "llama-3.1-8b-instant",  // Fast and capable
        "mixtral-8x7b-32768",   // Alternative model
      ];

      let lastError = null;

      for (const model of models) {
        try {
          console.log(`Trying model: ${model}`);
          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
              model: model,
              messages: [
                { role: "system", content: getSystemPrompt() },

                ...messages.slice(1).map(msg => ({
                  role: msg.isUser ? "user" : "assistant",
                  content: msg.text
                })),
                {
                  role: "user",
                  content: userMessage
                }
              ],
              temperature: 0.2, // Lower temperature for more consistent, factual responses
              max_tokens: 2500,
              stream: false
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Model ${model}: ${errorData.error?.message || `HTTP ${response.status}`}`);
          }

          const data = await response.json();
          console.log(`Success with model: ${model}`);
          return data.choices[0].message.content;
        } catch (error) {
          console.warn(`Model ${model} failed:`, error.message);
          lastError = error;
          // Continue to next model
        }
      }

      // If all models fail, throw the last error
      throw lastError || new Error('All models failed');

    } catch (error) {
      console.error('Groq API Error:', error);
      throw error;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setError('')

    try {
      const aiResponse = await callGroqAPI(inputMessage);
      
      const botMessage = {
        id: messages.length + 2,
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error calling Groq API:', error);
      setError(`API Error: ${error.message}. Please try again.`);
      
      const errorMessage = {
        id: messages.length + 2,
        text: "I apologize, but I'm experiencing technical difficulties accessing legal resources. Please try again in a moment or consult the official UK government websites (gov.uk) for immediate legal information. You can also try rephrasing your question.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const suggestedQuestions = [
    "What are my rights as a tenant under the Housing Act 1988?",
    "How do I start a limited company under the Companies Act 2006?",
    "What is the process for getting a divorce under the Matrimonial Causes Act 1973?",
    "What are the minimum employment rights under the Employment Rights Act 1996?",
    "How does the Consumer Rights Act 2015 protect online shoppers?",
    "What are protected characteristics under the Equality Act 2010?",
    "What are the requirements for a valid will in England and Wales?",
    "What constitutes unfair dismissal under UK employment law?"
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-green-500" />
              <Scale className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-xs text-green-600">Researching UK legislation...</span>
          </div>
        )}
        
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}
        
        {messages.length === 1 && (
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">Powered by Groq - Lightning Fast Legal Research</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-blue-600 mb-4">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">UK Legislation Expert</span>
            </div>
            <p className="text-sm text-gray-500 text-center">Try asking about UK legal matters:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="text-left p-4 text-sm text-gray-700 bg-white hover:bg-blue-50 rounded-lg border border-gray-200 transition-all hover:border-blue-300 hover:shadow-sm group"
                >
                  <div className="flex items-start space-x-2">
                    <Scale className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="group-hover:text-blue-700 transition-colors">{question}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white/80 backdrop-blur-md">
        <form onSubmit={handleSendMessage} className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about specific UK laws, rights, or legal procedures..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
        
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <Zap className="w-3 h-3 text-green-500" />
            <span>Powered by Groq AI</span>
          </div>
          <div className="flex items-center space-x-2">
            <Scale className="w-3 h-3 text-blue-500" />
            <span>UK Legal Expert</span>
          </div>
          <div className="text-right">
            <strong>Disclaimer:</strong> General legal information only
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface