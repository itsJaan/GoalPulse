import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import { Colors } from '../../constants/colors'
import { StandingRow, StandingHeader } from '../../components/StandingRow'
import { mockLeagueStandings } from '../../data/mockStandings'
import { useAuthStore } from '../../store/authStore'

const LEAGUES = [
  { id: 'pl', name: 'Premier League', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'laliga', name: 'La Liga', logo: '🇪🇸' },
]

const ZONE_LEGEND = [
  { color: Colors.champion, label: 'Champions League' },
  { color: Colors.europa, label: 'Europa League' },
  { color: Colors.relegation, label: 'Relegation' },
]

export default function StandingsScreen() {
  const [selectedLeague, setSelectedLeague] = useState('pl')
  const { user } = useAuthStore()
  const standings = mockLeagueStandings[selectedLeague] ?? []

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Standings</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.leagueTabs}>
          {LEAGUES.map(league => (
            <TouchableOpacity key={league.id} onPress={() => setSelectedLeague(league.id)} style={[styles.leagueTab, selectedLeague === league.id && styles.leagueTabActive]}>
              <Text style={styles.leagueTabEmoji}>{league.logo}</Text>
              <Text style={[styles.leagueTabText, selectedLeague === league.id && styles.leagueTabTextActive]}>{league.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.table}>
          <StandingHeader />
          {standings.map(entry => (
            <StandingRow key={entry.team.id} entry={entry} isFavorite={user?.favoriteTeamIds.includes(entry.team.id)} />
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg.primary },
  header: { paddingTop: 16, paddingBottom: 4 },
  title: { color: Colors.text.primary, fontSize: 26, fontWeight: '800', paddingHorizontal: 20, marginBottom: 16 },
  leagueTabs: { paddingHorizontal: 20, gap: 8, paddingBottom: 12 },
  leagueTab: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 14, backgroundColor: Colors.bg.card, borderWidth: 1, borderColor: Colors.border },
  leagueTabActive: { backgroundColor: Colors.accent.greenDim, borderColor: Colors.accent.green },
  leagueTabEmoji: { fontSize: 16 },
  leagueTabText: { color: Colors.text.secondary, fontSize: 14, fontWeight: '600' },
  leagueTabTextActive: { color: Colors.accent.green },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 32 },
  table: { backgroundColor: Colors.bg.card, borderRadius: 16, paddingHorizontal: 8, paddingVertical: 4 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, padding: 16, marginTop: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 3 },
  legendText: { color: Colors.text.secondary, fontSize: 12 },
})
