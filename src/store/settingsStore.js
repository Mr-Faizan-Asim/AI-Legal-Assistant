import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSettingsStore = create(
  persist(
    (set) => ({
      theme: 'light',
      fontSize: 'medium',
      showSources: true,
      enableNotifications: true,
      language: 'en',

      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
      setLanguage: (language) => set({ language }),
      toggleSources: () => set((state) => ({ showSources: !state.showSources })),
      toggleNotifications: () =>
        set((state) => ({ enableNotifications: !state.enableNotifications })),
    }),
    {
      name: 'settings-storage',
    }
  )
)