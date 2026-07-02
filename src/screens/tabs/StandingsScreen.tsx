import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import { Colors } from '../../constants/colors'
import { StandingRow, StandingHeader } from '../../components/StandingRow'
import { useAuthStore } from '../../store/authStore'
import { useStandings } from '../../hooks/useMatches'
import { StandingEntry } from '../../constants/types'
import { useQueryClient } from '@tanstack/react-query'

const LEAGUES = [
  { id: 'PL', name: 'Premier League', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'PD', name: 'La Liga', logo: '🇪🇸' },
  { id: 'BL1', name: 'Bundesliga', logo: '🇩🇪' },
  { id: 'SA', name: 'Serie A', logo: '🇮🇹' },
  { id: 'CL', name: 'Champions League', logo: '🏆' },
]

const ZONE_LEGEND = [
  { color: Colors.champion, label: 'Champions League' },
  { color: Colors.europa, label: 'Europa League' },
  { color: Colors.relegation, label: 'Relegation' },
]

const mapApiStanding = (entry: any, position: number): StandingEntry => ({
  position: entry.position ?? position + 1,
  team: {
    id: String(entry.team?.id),
    name: entry.team?.name ?? '',
    shortName: entry.team?.shortName ?? entry.team?.tla ?? '',
    logo: entry.team?.crest ?? '',
    color: '#FFFFFF',
  },
  played: entry.playedGames ?? 0,
  won: entry.won ?? 0,
  drawn: entry.draw ?? 0,
  lost: entry.lost ?? 0,
  goalsFor: entry.goalsFor ?? 0,
  goalsAgainst: entry.goalsAgainst ?? 0,
  goalDiff: entry.goalDifference ?? 0, 
  points: entry.points ?? 0,
  form: (entry.form ?? '').split(',').filter(Boolean).map((r: string) => {
    if (r === 'W') return 'W'
    if (r === 'L') return 'L'
    return 'D'
  }),
  zone: mapZone(entry.position),
})

function mapZone(position: number): StandingEntry['zone'] {
  if (position <= 4) return 'champion'
  if (position <= 6) return 'europa'
  if (position >= 18) return 'relegation'
  return undefined
}

export default function StandingsScreen() {
  const [selectedLeague, setSelectedLeague] = useState('PL')
  const { user } = useAuthStore()
  const { data: apiStandings, isLoading, isError } = useStandings(selectedLeague)

  const standings: StandingEntry[] = (apiStandings ?? []).map(mapApiStanding)
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['standings'] })
  }, [queryClient])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Standings</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.leagueTabs}>
          {LEAGUES.map(league => (
            <TouchableOpacity
              key={league.id}
              onPress={() => setSelectedLeague(league.id)}
              style={[styles.leagueTab, selectedLeague === league.id && styles.leagueTabActive]}
            >
              <Text style={styles.leagueTabEmoji}>{league.logo}</Text>
              <Text style={[styles.leagueTabText, selectedLeague === league.id && styles.leagueTabTextActive]}>
                {league.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator color={Colors.accent.green} size="large" />
          <Text style={styles.loadingText}>Loading standings...</Text>
        </View>
      )}

      {isError && (
        <View style={styles.center}>
          <Text style={styles.errorText}>Failed to load standings.</Text>
        </View>
      )}

      {!isLoading && !isError && (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.table}>
            <StandingHeader />
            {standings.map((entry) => (
              <StandingRow
                key={entry.team.id}
                entry={entry}
                isFavorite={user?.favoriteTeamIds.includes(entry.team.id)}
              />
            ))}
          </View>
          <View style={styles.legend}>
            {ZONE_LEGEND.map(zone => (
              <View key={zone.label} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: zone.color }]} />
                <Text style={styles.legendText}>{zone.label}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 4,
  },
  title: {
    color: Colors.text.primary,
    fontSize: 26,
    fontWeight: '800',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  leagueTabs: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 12,
  },
  leagueTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  leagueTabActive: {
    backgroundColor: Colors.accent.greenDim,
    borderColor: Colors.accent.green,
  },
  leagueTabEmoji: {
    fontSize: 16,
  },
  leagueTabText: {
    color: Colors.text.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  leagueTabTextActive: {
    color: Colors.accent.green,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  table: {
    backgroundColor: Colors.bg.card,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    padding: 16,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  legendText: {
    color: Colors.text.secondary,
    fontSize: 12,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  loadingText: {
    color: Colors.text.secondary,
    fontSize: 14,
  },
  errorText: {
    color: Colors.accent.red,
    fontSize: 14,
  },
})