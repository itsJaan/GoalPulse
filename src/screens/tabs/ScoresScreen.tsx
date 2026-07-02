/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, ActivityIndicator,
} from 'react-native'
import { Colors } from '../../constants/colors'
import { MatchCard } from '../../components/MatchCard'
import { mockLeagues } from '../../data/mockNews'
import { useMatches } from '../../hooks/useMatches'
import { Match } from '../../constants/types'

const DATE_TABS = ['Yesterday', 'Today', 'Tomorrow']
const DATE_OFFSETS = [-1, 0, 1]

function mapStatus(status: string): Match['status'] {
  switch (status) {
    case 'IN_PLAY':
    case 'LIVE':     return 'LIVE'
    case 'PAUSED':   return 'HT'
    case 'FINISHED': return 'FT'
    case 'POSTPONED':return 'POSTPONED'
    default:         return 'SCHEDULED'
  }
}

function mapCompetitionId(code: string): string {
  const map: Record<string, string> = {
    CL: 'ucl', PL: 'pl', PD: 'laliga',
    BL1: 'bl', SA: 'sa', WC: 'wc',
  }
  return map[code] ?? 'other'
}

function mapApiMatchToMatch(m: any): Match {
  return {
    id: String(m.id),
    league: m.competition?.name ?? '',
    leagueId: mapCompetitionId(m.competition?.code ?? ''),
    leagueLogo: m.competition?.emblem ?? '',
    homeTeam: {
      id: String(m.homeTeam?.id),
      name: m.homeTeam?.name ?? '',
      shortName: m.homeTeam?.shortName ?? m.homeTeam?.tla ?? '',
      logo: m.homeTeam?.crest ?? '',
      color: '#FFFFFF',
    },
    awayTeam: {
      id: String(m.awayTeam?.id),
      name: m.awayTeam?.name ?? '',
      shortName: m.awayTeam?.shortName ?? m.awayTeam?.tla ?? '',
      logo: m.awayTeam?.crest ?? '',
      color: '#FFFFFF',
    },
    homeScore: m.score?.fullTime?.home ?? m.score?.halfTime?.home ?? null,
    awayScore: m.score?.fullTime?.away ?? m.score?.halfTime?.away ?? null,
    status: mapStatus(m.status),
    minute: m.minute ?? undefined,
    matchDate: m.utcDate,
    venue: m.venue ?? undefined,
  }
}

function groupByLeague(matches: Match[]) {
  return matches.reduce<Record<string, Match[]>>((acc, m) => {
    if (!acc[m.league]) acc[m.league] = []
    acc[m.league].push(m)
    return acc
  }, {})
}

export default function ScoresScreen() {
  const [dateTab, setDateTab] = useState(1)
  const [selectedLeague, setSelectedLeague] = useState('all')

  const { data: apiMatches, isLoading, isError } = useMatches(DATE_OFFSETS[dateTab])

  const allMatches: Match[] = (apiMatches ?? []).map(mapApiMatchToMatch)

  const filtered = selectedLeague === 'all'
    ? allMatches
    : allMatches.filter(m => m.leagueId === selectedLeague)

  const grouped = groupByLeague(filtered)
  const liveCount = allMatches.filter(m => m.status === 'LIVE').length

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Scores</Text>
          {liveCount > 0 && (
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.livePillText}>{liveCount} LIVE</Text>
            </View>
          )}
        </View>
        <View style={styles.dateTabs}>
          {DATE_TABS.map((tab, i) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setDateTab(i)}
              style={[styles.dateTab, dateTab === i && styles.dateTabActive]}
            >
              <Text style={[styles.dateTabText, dateTab === i && styles.dateTabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{ maxHeight: 56 }}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filters}
          >
          <TouchableOpacity
            onPress={() => setSelectedLeague('all')}
            style={[styles.filterChip, selectedLeague === 'all' && styles.filterChipActive]}
          >
            <Text style={[styles.filterLabel, selectedLeague === 'all' && styles.filterLabelActive]}>
              All
            </Text>
          </TouchableOpacity>
          {mockLeagues.filter(l => l.id !== 'all').map(league => (
            <TouchableOpacity
              key={league.id}
              onPress={() => setSelectedLeague(league.id)}
              style={[styles.filterChip, selectedLeague === league.id && styles.filterChipActive]}
            >
              <Text style={styles.filterEmoji}>{league.logo}</Text>
              <Text style={[styles.filterLabel, selectedLeague === league.id && styles.filterLabelActive]}>
                {league.shortName}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator color={Colors.accent.green} size="large" />
          <Text style={styles.loadingText}>Loading matches...</Text>
        </View>
      )}

      {isError && (
        <View style={styles.center}>
          <Text style={styles.errorText}>Failed to load matches.</Text>
        </View>
      )}

      {!isLoading && !isError && (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(grouped).map(([leagueName, matches]) => (
            <View key={leagueName} style={styles.leagueGroup}>
              <View style={styles.leagueHeader}>
                <Text style={styles.leagueName}>{leagueName}</Text>
              </View>
              <View style={styles.matchList}>
                {matches.map(match => (
                  <MatchCard key={match.id} match={match} onPress={() => {}} />
                ))}
              </View>
            </View>
          ))}

          {filtered.length === 0 && (
            <View style={styles.center}>
              <Text style={styles.emptyIcon}>📅</Text>
              <Text style={styles.emptyText}>No matches for this day</Text>
            </View>
          )}
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  title: {
    color: Colors.text.primary,
    fontSize: 26,
    fontWeight: '800',
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.accent.greenDim,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent.green,
  },
  livePillText: {
    color: Colors.accent.green,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  dateTabs: {
    flexDirection: 'row',
    backgroundColor: Colors.bg.card,
    borderRadius: 12,
    padding: 4,
  },
  dateTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 9,
    alignItems: 'center',
  },
  dateTabActive: {
    backgroundColor: Colors.bg.elevated,
  },
  dateTabText: {
    color: Colors.text.secondary,
    fontSize: 13,
    fontWeight: '600',
  },
  dateTabTextActive: {
    color: Colors.text.primary,
  },
  filters: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 12,
    height: 56,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.bg.card,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    borderColor: Colors.accent.green,
    backgroundColor: Colors.accent.greenDim,
  },
  filterEmoji: {
    fontSize: 12,
  },
  filterLabel: {
    color: Colors.text.secondary,
    fontSize: 12,
    fontWeight: '600',
  },
  filterLabelActive: {
    color: Colors.accent.green,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 24,
  },
  leagueGroup: {
    gap: 10,
  },
  leagueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  leagueName: {
    color: Colors.text.secondary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  matchList: {
    gap: 10,
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
  emptyIcon: {
    fontSize: 48,
  },
  emptyText: {
    color: Colors.text.secondary,
    fontSize: 15,
  },
});