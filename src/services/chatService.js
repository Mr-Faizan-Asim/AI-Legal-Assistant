import api from './api'

export const chatService = {
  sendMessage: async (message, conversationId = null, conversationHistory = []) => {
    try {
      const response = await api.post('/api/chat', {
        question: message,
        conversation_id: conversationId,
        conversation_history: conversationHistory,
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to send message')
    }
  },

  getConversationHistory: async (conversationId) => {
    const response = await api.get(`/api/conversations/${conversationId}`)
    return response.data
  },

  getAllConversations: async () => {
    const response = await api.get('/api/conversations')
    return response.data
  },

  deleteConversation: async (conversationId) => {
    await api.delete(`/api/conversations/${conversationId}`)
  },

  searchDocuments: async (query, filters = {}) => {
    const response = await api.get('/api/search', {
      params: { query, ...filters },
    })
    return response.data
  },

  getDocument: async (documentId) => {
    const response = await api.get(`/api/documents/${documentId}`)
    return response.data
  },

  getCategories: async () => {
    const response = await api.get('/api/categories')
    return response.data
  },

  getDocumentsByCategory: async (category, page = 1, limit = 20) => {
    const response = await api.get(`/api/categories/${category}/documents`, {
      params: { page, limit },
    })
    return response.data
  },
}