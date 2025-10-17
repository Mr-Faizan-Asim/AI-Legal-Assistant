import { useState, useCallback } from 'react'
import { chatService } from '@services/chatService'

export const useSearch = () => {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (query, filters = {}) => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await chatService.searchDocuments(query, filters)
      setResults(data.results || [])
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setResults([])
    setError(null)
  }, [])

  return {
    results,
    isLoading,
    error,
    search,
    clearResults,
  }
}