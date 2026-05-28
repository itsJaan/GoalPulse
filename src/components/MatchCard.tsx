import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { Match } from '../constants/types'
import { Colors } from '../constants/colors'

function formatTime(isoDate: string): string {
  return new Date(isoDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function LiveDot() {
  const opacity = useRef(new Animated.Value(1)).current
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.2, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start()
  }, [])
  return <Animated.View style={[styles.liveDot, { opacity }]} />
}

export function MatchCard({ match, onPress }: { match: Match; onPress?: () => void }) {
  const isLive = match.status === 'LIVE'
  const isHT = match.status === 'HT'
  const isFT = match.status === 'FT'
  const isScheduled = match.status === 'SCHEDULED'

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.card}>
      <View style={styles.statusRow}>
        {isLive && (
          <View style={styles.liveBadge}>
            <LiveDot />
            <Text style={styles.liveBadgeText}>{match.minute}'</Text>
          </View>
        )}
        {isHT && <View style={[styles.liveBadge, styles.htBadge]}><Text style={styles.htBadgeText}>HT</Text></View>}
        {isFT && <Text style={styles.ftText}>Full Time</Text>}
        {isScheduled && <Text style={styles.scheduledText}>{formatTime(match.matchDate)}</Text>}
      </View>

      <View style={styles.matchRow}>
        <View style={styles.teamBlock}>
          <Text style={styles.teamLogo}>{match.homeTeam.logo}</Text>
          <Text style={styles.teamName} numberOfLines={1}>{match.homeTeam.shortName}</Text>
        </View>
        <View style={styles.scoreBlock}>
          {isScheduled
            ? <Text style={styles.vs}>vs</Text>
            : <Text style={[styles.score, isLive && styles.scoreActive]}>{match.homeScore} – {match.awayScore}</Text>
          }
        </View>
        <View style={[styles.teamBlock, styles.teamRight]}>
          <Text style={styles.teamLogo}>{match.awayTeam.logo}</Text>
          <Text style={styles.teamName} numberOfLines={1}>{match.awayTeam.shortName}</Text>
        </View>
      </View>

      {match.venue && <Text style={styles.venue} numberOfLines={1}>{match.venue}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: { backgroundColor: Colors.bg.card, borderRadius: 16, padding: 16, gap: 10 },
  statusRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', minHeight: 22 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.accent.greenDim, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  liveDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: Colors.accent.green },
  liveBadgeText: { color: Colors.accent.green, fontSize: 12, fontWeight: '700' },
  htBadge: { backgroundColor: Colors.accent.orangeDim },
  htBadgeText: { color: Colors.accent.orange, fontSize: 12, fontWeight: '700' },
  ftText: { color: Colors.text.tertiary, fontSize: 12, fontWeight: '500' },
  scheduledText: { color: Colors.text.secondary, fontSize: 13, fontWeight: '600' },
  matchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  teamBlock: { flex: 1, alignItems: 'flex-start', gap: 4 },
  teamRight: { alignItems: 'flex-end' },
  teamLogo: { fontSize: 28 },
  teamName: { color: Colors.text.primary, fontSize: 13, fontWeight: '700', letterSpacing: 0.5 },
  scoreBlock: { flex: 1, alignItems: 'center' },
  score: { color: Colors.text.primary, fontSize: 24, fontWeight: '800', letterSpacing: 1 },
  scoreActive: { color: Colors.accent.green },
  vs: { color: Colors.text.tertiary, fontSize: 16, fontWeight: '600' },
  venue: { color: Colors.text.tertiary, fontSize: 11, textAlign: 'center' },
})
