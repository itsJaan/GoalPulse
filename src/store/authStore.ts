import { create } from 'zustand'
import { supabase } from '../lib/supabase'
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
  toggleFavoriteTeam: (teamId: string) => Promise<void>
  loadSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,

  loadSession: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (profile) {
      set({
        isAuthenticated: true,
        user: {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          favoriteTeamIds: profile.favorite_team_ids ?? [],
        },
      })
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null })

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error || !data.user) {
      set({ isLoading: false, error: error?.message ?? 'Login failed' })
      return false
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()

    set({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: data.user.id,
        email: data.user.email ?? email,
        name: profile?.name ?? email.split('@')[0],
        favoriteTeamIds: profile?.favorite_team_ids ?? [],
      },
    })
    return true
  },

  register: async (email, name, password) => {
    set({ isLoading: true, error: null })

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error || !data.user) {
      set({ isLoading: false, error: error?.message ?? 'Registration failed' })
      return false
    }

    // Crear perfil en la tabla profiles
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        email,
        name,
        favorite_team_ids: [],
      })

    if (profileError) {
      set({ isLoading: false, error: profileError.message })
      return false
    }

    set({
      isAuthenticated: true,
      isLoading: false,
      user: { id: data.user.id, email, name, favoriteTeamIds: [] },
    })
    return true
  },

  logout: async () => {
    await supabase.auth.signOut()
    set({ isAuthenticated: false, user: null, error: null })
  },

  clearError: () => set({ error: null }),

  toggleFavoriteTeam: async (teamId) => {
    const { user } = get()
    if (!user) return

    const isFav = user.favoriteTeamIds.includes(teamId)
    const newFavorites = isFav
      ? user.favoriteTeamIds.filter(id => id !== teamId)
      : [...user.favoriteTeamIds, teamId]

    // Actualizar en Supabase
    await supabase
      .from('profiles')
      .update({ favorite_team_ids: newFavorites })
      .eq('id', user.id)

    set({ user: { ...user, favoriteTeamIds: newFavorites } })
  },
}))