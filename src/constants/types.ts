export interface User {
  id: string
  email: string
  name: string
  favoriteTeamIds: string[]
}

export interface NewsArticle {
  id: string
  title: string
  summary: string
  imageUrl: string
  source: string
  league: string
  leagueId: string
  publishedAt: string
  readTimeMin: number
  url: string
}

export interface Team {
  id: string
  name: string
  shortName: string
  logo: string
  color: string
}

export interface Match {
  id: string
  league: string
  leagueId: string
  leagueLogo: string
  homeTeam: Team
  awayTeam: Team
  homeScore: number | null
  awayScore: number | null
  status: 'SCHEDULED' | 'LIVE' | 'HT' | 'FT' | 'POSTPONED'
  minute?: number
  matchDate: string
  venue?: string
}

export interface StandingEntry {
  position: number
  team: Team
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDiff: number
  points: number
  form: ('W' | 'D' | 'L')[]
  zone?: 'champion' | 'europa' | 'conference' | 'relegation'
}

// React Navigation types
export type AuthStackParamList = {
  Login: undefined
  Register: undefined
}

export type MainTabParamList = {
  News: undefined
  Scores: undefined
  Standings: undefined
  Favorites: undefined
}
