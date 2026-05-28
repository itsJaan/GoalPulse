import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import { Colors } from '../../constants/colors'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../../components/ui/Button'
import { NewsCard } from '../../components/NewsCard'
import { mockNews } from '../../data/mockNews'

const ALL_TEAMS = [
  { id: 'rm', name: 'Real Madrid', logo: '⚪', league: 'La Liga' },
  { id: 'bar', name: 'Barcelona', logo: '🔴', league: 'La Liga' },
  { id: 'mci', name: 'Man City', logo: '🔵', league: 'Premier League' },
  { id: 'ars', name: 'Arsenal', logo: '🔴', league: 'Premier League' },
  { id: 'liv', name: 'Liverpool', logo: '🔴', league: 'Premier League' },
  { id: 'bay', name: 'Bayern Munich', logo: '🔴', league: 'Bundesliga' },
  { id: 'dor', name: 'Dortmund', logo: '🟡', league: 'Bundesliga' },
  { id: 'int', name: 'Inter Milan', logo: '🔵', league: 'Serie A' },
  { id: 'atm', name: 'Atlético Madrid', logo: '🔴', league: 'La Liga' },
]

export default function FavoritesScreen() {
  const { user, logout, toggleFavoriteTeam } = useAuthStore()

  const favoriteTeams = ALL_TEAMS.filter(t => user?.favoriteTeamIds.includes(t.id))
  const suggestedTeams = ALL_TEAMS.filter(t => !user?.favoriteTeamIds.includes(t.id)).slice(0, 4)

  const handleLogout = () => {
    Alert.alert('Sign out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: logout },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase() ?? '?'}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ My teams</Text>
          {favoriteTeams.length === 0
            ? <View style={styles.empty}><Text style={styles.emptyText}>No favorite teams yet. Add some below!</Text></View>
            : <View style={styles.teamGrid}>
                {favoriteTeams.map(team => (
                  <TouchableOpacity key={team.id} style={[styles.teamChip, styles.teamChipActive]} onPress={() => toggleFavoriteTeam(team.id)}>
                    <Text style={styles.teamLogo}>{team.logo}</Text>
                    <View>
                      <Text style={styles.teamName}>{team.name}</Text>
                      <Text style={styles.teamLeague}>{team.league}</Text>
                    </View>
                    <Text style={styles.checkIcon}>✓</Text>
                  </TouchableOpacity>
                ))}
              </View>
          }
        </View>

        {suggestedTeams.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>➕ Add teams to follow</Text>
            <View style={styles.teamGrid}>
              {suggestedTeams.map(team => (
                <TouchableOpacity key={team.id} style={styles.teamChip} onPress={() => toggleFavoriteTeam(team.id)}>
                  <Text style={styles.teamLogo}>{team.logo}</Text>
                  <View>
                    <Text style={styles.teamName}>{team.name}</Text>
                    <Text style={styles.teamLeague}>{team.league}</Text>
                  </View>
                  <Text style={styles.addIcon}>+</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {favoriteTeams.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📰 News for your teams</Text>
            <View style={styles.newsList}>
              {mockNews.slice(0, 2).map(article => <NewsCard key={article.id} article={article} variant="compact" onPress={() => {}} />)}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Button title="Sign Out" onPress={handleLogout} variant="secondary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg.primary },
  scroll: { flex: 1 },
  content: { paddingTop: 16, paddingBottom: 32, gap: 8 },
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.bg.card, marginHorizontal: 20, borderRadius: 20, padding: 16, gap: 14, marginBottom: 8 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.accent.green, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: Colors.text.inverse, fontSize: 22, fontWeight: '800' },
  profileInfo: { flex: 1 },
  profileName: { color: Colors.text.primary, fontSize: 17, fontWeight: '700', textTransform: 'capitalize' },
  profileEmail: { color: Colors.text.secondary, fontSize: 13, marginTop: 2 },
  section: { paddingHorizontal: 20, marginTop: 16, gap: 12 },
  sectionTitle: { color: Colors.text.primary, fontSize: 17, fontWeight: '700' },
  empty: { backgroundColor: Colors.bg.card, borderRadius: 14, padding: 20, alignItems: 'center' },
  emptyText: { color: Colors.text.secondary, fontSize: 14, textAlign: 'center' },
  teamGrid: { gap: 10 },
  teamChip: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.bg.card, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: Colors.border },
  teamChipActive: { borderColor: Colors.accent.green, backgroundColor: Colors.accent.greenDim },
  teamLogo: { fontSize: 28 },
  teamName: { color: Colors.text.primary, fontSize: 14, fontWeight: '700' },
  teamLeague: { color: Colors.text.secondary, fontSize: 11, marginTop: 2 },
  checkIcon: { marginLeft: 'auto', color: Colors.accent.green, fontSize: 18, fontWeight: '800' },
  addIcon: { marginLeft: 'auto', color: Colors.text.secondary, fontSize: 22, fontWeight: '300' },
  newsList: { gap: 12 },
})
