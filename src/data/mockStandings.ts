import { StandingEntry } from '../constants/types'

export const mockPremierLeagueStandings: StandingEntry[] = [
  {
    position: 1,
    team: { id: 'ars', name: 'Arsenal', shortName: 'ARS', logo: '🔴', color: '#EF0107' },
    played: 36, won: 26, drawn: 5, lost: 5,
    goalsFor: 84, goalsAgainst: 32, goalDiff: 52, points: 83,
    form: ['W', 'W', 'D', 'W', 'W'], zone: 'champion',
  },
  {
    position: 2,
    team: { id: 'mci', name: 'Man City', shortName: 'MCI', logo: '🔵', color: '#6CABDD' },
    played: 36, won: 24, drawn: 7, lost: 5,
    goalsFor: 90, goalsAgainst: 40, goalDiff: 50, points: 79,
    form: ['W', 'W', 'W', 'L', 'W'], zone: 'champion',
  },
  {
    position: 3,
    team: { id: 'liv', name: 'Liverpool', shortName: 'LIV', logo: '🔴', color: '#C8102E' },
    played: 36, won: 23, drawn: 7, lost: 6,
    goalsFor: 80, goalsAgainst: 42, goalDiff: 38, points: 76,
    form: ['L', 'W', 'W', 'W', 'D'], zone: 'champion',
  },
  {
    position: 4,
    team: { id: 'avl', name: 'Aston Villa', shortName: 'AVL', logo: '🟣', color: '#95BFE5' },
    played: 36, won: 21, drawn: 5, lost: 10,
    goalsFor: 74, goalsAgainst: 50, goalDiff: 24, points: 68,
    form: ['W', 'D', 'L', 'W', 'W'], zone: 'europa',
  },
  {
    position: 5,
    team: { id: 'tot', name: 'Tottenham', shortName: 'TOT', logo: '⚪', color: '#132257' },
    played: 36, won: 19, drawn: 6, lost: 11,
    goalsFor: 66, goalsAgainst: 54, goalDiff: 12, points: 63,
    form: ['D', 'W', 'W', 'L', 'W'], zone: 'europa',
  },
  {
    position: 6,
    team: { id: 'che', name: 'Chelsea', shortName: 'CHE', logo: '🔵', color: '#034694' },
    played: 36, won: 17, drawn: 8, lost: 11,
    goalsFor: 70, goalsAgainst: 56, goalDiff: 14, points: 59,
    form: ['W', 'D', 'W', 'D', 'L'],
  },
  {
    position: 7,
    team: { id: 'mnu', name: 'Man United', shortName: 'MNU', logo: '🔴', color: '#DA291C' },
    played: 36, won: 13, drawn: 6, lost: 17,
    goalsFor: 40, goalsAgainst: 57, goalDiff: -17, points: 45,
    form: ['L', 'L', 'W', 'L', 'D'],
  },
  {
    position: 8,
    team: { id: 'bur', name: 'Burnley', shortName: 'BUR', logo: '⚽', color: '#6C1D45' },
    played: 36, won: 6, drawn: 5, lost: 25,
    goalsFor: 32, goalsAgainst: 85, goalDiff: -53, points: 23,
    form: ['L', 'L', 'D', 'L', 'L'], zone: 'relegation',
  },
]

export const mockLaLigaStandings: StandingEntry[] = [
  {
    position: 1,
    team: { id: 'rm', name: 'Real Madrid', shortName: 'RMA', logo: '⚪', color: '#FEBE10' },
    played: 36, won: 28, drawn: 4, lost: 4,
    goalsFor: 92, goalsAgainst: 34, goalDiff: 58, points: 88,
    form: ['W', 'W', 'W', 'W', 'D'], zone: 'champion',
  },
  {
    position: 2,
    team: { id: 'bar', name: 'Barcelona', shortName: 'BAR', logo: '🔴', color: '#A50044' },
    played: 36, won: 24, drawn: 5, lost: 7,
    goalsFor: 79, goalsAgainst: 40, goalDiff: 39, points: 77,
    form: ['W', 'L', 'W', 'W', 'W'], zone: 'champion',
  },
  {
    position: 3,
    team: { id: 'atm', name: 'Atlético', shortName: 'ATM', logo: '🔴', color: '#CB3524' },
    played: 36, won: 21, drawn: 8, lost: 7,
    goalsFor: 67, goalsAgainst: 38, goalDiff: 29, points: 71,
    form: ['W', 'W', 'D', 'W', 'D'], zone: 'champion',
  },
  {
    position: 4,
    team: { id: 'gir', name: 'Girona', shortName: 'GIR', logo: '⚽', color: '#CD1318' },
    played: 36, won: 22, drawn: 4, lost: 10,
    goalsFor: 78, goalsAgainst: 52, goalDiff: 26, points: 70,
    form: ['L', 'W', 'W', 'W', 'D'], zone: 'europa',
  },
  {
    position: 5,
    team: { id: 'ath', name: 'Athletic Club', shortName: 'ATH', logo: '🔴', color: '#EE2523' },
    played: 36, won: 18, drawn: 8, lost: 10,
    goalsFor: 60, goalsAgainst: 42, goalDiff: 18, points: 62,
    form: ['W', 'D', 'W', 'L', 'W'], zone: 'europa',
  },
]

export const mockLeagueStandings: Record<string, StandingEntry[]> = {
  pl: mockPremierLeagueStandings,
  laliga: mockLaLigaStandings,
}
