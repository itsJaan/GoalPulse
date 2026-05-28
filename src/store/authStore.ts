import { create } from 'zustand'
import { User } from '../constants/types'

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, name: string, password: string) => Promise<boolean>
  logout: () => void
  clearError: () => void
  toggleFavoriteTeam: (teamId: string) => void
}

const MOCK_PASSWORD = '123456'

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    await new Promise(resolve => setTimeout(resolve, 1200))
    if (password !== MOCK_PASSWORD) {
      set({ isLoading: false, error: 'Invalid credentials. Hint: password is 123456' })
      return false
    }
    set({
      isAuthenticated: true,
      isLoading: false,
      user: { id: '1', email, name: email.split('@')[0], favoriteTeamIds: ['rm', 'bar'] },
    })
    return true
  },

  register: async (email, name, password) => {
    set({ isLoading: true, error: null })
    await new Promise(resolve => setTimeout(resolve, 1200))
    if (password.length < 6) {
      set({ isLoading: false, error: 'Password must be at least 6 characters.' })
      return false
    }
    set({
      isAuthenticated: true,
      isLoading: false,
      user: { id: '1', email, name, favoriteTeamIds: [] },
    })
    return true
  },

  logout: () => set({ isAuthenticated: false, user: null, error: null }),
  clearError: () => set({ error: null }),

  toggleFavoriteTeam: (teamId) => {
    const { user } = get()
    if (!user) return
    const isFav = user.favoriteTeamIds.includes(teamId)
    set({
      user: {
        ...user,
        favoriteTeamIds: isFav
          ? user.favoriteTeamIds.filter(id => id !== teamId)
          : [...user.favoriteTeamIds, teamId],
      },
    })
  },
}))
