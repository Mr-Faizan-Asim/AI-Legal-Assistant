import React from 'react'
import { useNavigate } from 'react-router-dom'
import ChatInterface from '../components/ChatInterface'
import Sidebar from '../components/Sidebar'
import { ArrowLeft } from 'lucide-react'

const Chat = () => {
  const navigate = useNavigate()

  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200">
        <Sidebar />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white/80 backdrop-blur-md">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigate('/')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">UK Legal Assistant</h1>
                <p className="text-sm text-gray-500">Online - Ready to help</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 overflow-hidden">
          <ChatInterface />
        </div>
      </div>
    </div>
  )
}

export default Chat