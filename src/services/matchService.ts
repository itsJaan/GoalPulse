import { footballApi } from '../lib/football'

export const COMPETITION_IDS = {
  ucl: 'CL',
  pl: 'PL',
  laliga: 'PD',
  bl: 'BL1',
  sa: 'SA',
  wc: 'WC',
}

export async function getMatchesByDate(date: string) {
  const { data } = await footballApi.get('/matches', {
    params: { date },
  })
  return data.matches ?? []
}

export const getStandings = async (competitionId: string) => {
  const season = competitionId === 'WC' ? 2026 : 2025
  const { data } = await footballApi.get(`/competitions/${competitionId}/standings`, {
    params: { season },
  })
  console.log('Standings season:', season, 'competition:', competitionId)
  console.log('First entry:', JSON.stringify(data.standings?.[0]?.table?.[0]))
  return data.standings?.[0]?.table ?? []
}


export async function getMatchesByCompetition(competitionId: string) {
  const { data } = await footballApi.get(`/competitions/${competitionId}/matches`, {
    params: { status: 'LIVE,IN_PLAY,PAUSED,FINISHED,SCHEDULED', limit: 10 },
  })
  return data.matches ?? []
}