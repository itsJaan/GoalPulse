import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import { Colors } from '../../constants/colors'
import { useAuthStore } from '../../store/authStore'
import { NewsCard } from '../../components/NewsCard'
import { mockNews, mockLeagues } from '../../data/mockNews'

export default function NewsScreen() {
  const { user } = useAuthStore()
  const [selectedLeague, setSelectedLeague] = useState('all')

  const filtered = selectedLeague === 'all' ? mockNews : mockNews.filter(a => a.leagueId === selectedLeague)
  const featured = filtered[0]
  const rest = filtered.slice(1)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  const firstName = user?.name?.split(' ')[0] ?? 'there'

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}, {firstName} 👋</Text>
            <Text style={styles.subtitle}>Here's what's happening in football</Text>
          </View>
          <TouchableOpacity style={styles.searchBtn}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {mockLeagues.map(league => (
            <TouchableOpacity key={league.id} onPress={() => setSelectedLeague(league.id)} style={[styles.filterChip, selectedLeague === league.id && styles.filterChipActive]}>
              <Text style={styles.filterEmoji}>{league.logo}</Text>
              <Text style={[styles.filterLabel, selectedLeague === league.id && styles.filterLabelActive]}>{league.shortName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {featured && (
          <View style={styles.section}>
            <NewsCard article={featured} variant="featured" onPress={() => {}} />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest news</Text>
          <View style={styles.list}>
            {rest.map(article => <NewsCard key={article.id} article={article} variant="compact" onPress={() => {}} />)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg.primary },
  scroll: { flex: 1 },
  content: { paddingBottom: 32 },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 },
  greeting: { color: Colors.text.primary, fontSize: 22, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: Colors.text.secondary, fontSize: 13 },
  searchBtn: { width: 44, height: 44, backgroundColor: Colors.bg.card, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  searchIcon: { fontSize: 18 },
  filters: { paddingHorizontal: 20, gap: 10, marginBottom: 20 },
  filterChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.bg.card, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: Colors.border },
  filterChipActive: { backgroundColor: Colors.accent.greenDim, borderColor: Colors.accent.green },
  filterEmoji: { fontSize: 14 },
  filterLabel: { color: Colors.text.secondary, fontSize: 13, fontWeight: '600' },
  filterLabelActive: { color: Colors.accent.green },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { color: Colors.text.primary, fontSize: 18, fontWeight: '700', marginBottom: 14 },
  list: { gap: 12 },
})
