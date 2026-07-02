import { useQuery } from '@tanstack/react-query'
import { getMatchesByDate, getStandings } from '../services/matchService'



function getDateOffset(offset: number): string {

  const now = new Date()
  const utc = now.getTime() + now.getTimezoneOffset() * 60000
  const honduras = new Date(utc + (-6 * 3600000))
  honduras.setDate(honduras.getDate() + offset)
  const year = honduras.getFullYear()
  const month = String(honduras.getMonth() + 1).padStart(2, '0')
  const day = String(honduras.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
export function useMatches(dateOffset: number = 0) {
  const date = getDateOffset(dateOffset)
  return useQuery({
    queryKey: ['matches', date],
    queryFn: () => getMatchesByDate(date),
    staleTime: 1000 * 30,
  })
}

export const useStandings = (competitionId: string) =>
  useQuery({
    queryKey: ['standings', competitionId],
    queryFn: () => getStandings(competitionId),
    staleTime: 1000 * 60 * 60,
    enabled: !!competitionId,
  })