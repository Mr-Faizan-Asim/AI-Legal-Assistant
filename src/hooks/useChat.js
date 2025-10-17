import { useState, useCallback } from 'react'
import { useChatStore } from '@store/chatStore'
import { chatService } from '@services/chatService'

export const useChat = () => {
  const {
    messages,
    isLoading,
    error,
    addMessage,
    setLoading,
    setError,
    clearError,
    currentConversation,
  } = useChatStore()

  const sendMessage = useCallback(
    async (content) => {
      try {
        clearError()
        setLoading(true)

        const userMessage = {
          id: Date.now().toString(),
          role: 'user',
          content,
          timestamp: new Date().toISOString(),
        }
        addMessage(userMessage)

        const response = await chatService.sendMessage(
          content,
          currentConversation?.id,
          messages
        )

        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.answer,
          sources: response.sources,
          confidence: response.confidence,
          timestamp: new Date().toISOString(),
        }
        addMessage(assistantMessage)

        return assistantMessage
      } catch (err) {
        setError(err.message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [messages, currentConversation, addMessage, setLoading, setError, clearError]
  )

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearError,
  }
}