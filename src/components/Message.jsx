import React from 'react'
import { Bot, User, Copy, Check } from 'lucide-react'

const Message = ({ message }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`flex space-x-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      {!message.isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
      
      <div className={`max-w-[70%] ${message.isUser ? 'order-first' : ''}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          message.isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-900 rounded-bl-none'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        </div>
        
        <div className={`flex items-center space-x-2 mt-1 text-xs ${
          message.isUser ? 'justify-end' : 'justify-start'
        }`}>
          <span className="text-gray-500">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {!message.isUser && (
            <button
              onClick={handleCopy}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>
      
      {message.isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Message