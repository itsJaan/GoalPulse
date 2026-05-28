import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StandingEntry } from '../constants/types'
import { Colors } from '../constants/colors'

const FORM_COLORS = {
  W: { bg: Colors.accent.greenDim, text: Colors.accent.green },
  D: { bg: '#FFFFFF15', text: Colors.text.secondary },
  L: { bg: '#FF444420', text: Colors.accent.red },
}

const ZONE_COLORS = {
  champion: Colors.champion,
  europa: Colors.europa,
  conference: Colors.accent.orange,
  relegation: Colors.relegation,
}

export function StandingRow({ entry, isFavorite }: { entry: StandingEntry; isFavorite?: boolean }) {
  return (
    <View style={[styles.row, isFavorite && styles.rowHighlight]}>
      {entry.zone && <View style={[styles.zoneBar, { backgroundColor: ZONE_COLORS[entry.zone] }]} />}
      <Text style={[styles.position, isFavorite && styles.positionHighlight]}>{entry.position}</Text>
      <View style={styles.teamBlock}>
        <Text style={styles.logo}>{entry.team.logo}</Text>
        <Text style={[styles.teamName, isFavorite && styles.teamNameHighlight]} numberOfLines={1}>{entry.team.shortName}</Text>
      </View>
      <Text style={styles.stat}>{entry.played}</Text>
      <Text style={styles.stat}>{entry.won}</Text>
      <Text style={styles.stat}>{entry.drawn}</Text>
      <Text style={styles.stat}>{entry.lost}</Text>
      <Text style={[styles.stat, styles.gd]}>{entry.goalDiff > 0 ? `+${entry.goalDiff}` : entry.goalDiff}</Text>
      <Text style={[styles.stat, styles.points, isFavorite && styles.pointsHighlight]}>{entry.points}</Text>
      <View style={styles.form}>
        {entry.form.slice(-5).map((r, i) => (
          <View key={i} style={[styles.formDot, { backgroundColor: FORM_COLORS[r].bg }]}>
            <Text style={[styles.formText, { color: FORM_COLORS[r].text }]}>{r}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export function StandingHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerPos}>#</Text>
      <View style={styles.teamBlock}><Text style={styles.headerLabel}>Team</Text></View>
      <Text style={styles.headerStat}>P</Text>
      <Text style={styles.headerStat}>W</Text>
      <Text style={styles.headerStat}>D</Text>
      <Text style={styles.headerStat}>L</Text>
      <Text style={styles.headerStat}>GD</Text>
      <Text style={styles.headerStat}>Pts</Text>
      <Text style={styles.headerForm}>Form</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: Colors.border, position: 'relative' },
  rowHighlight: { backgroundColor: Colors.accent.greenDim, borderRadius: 10, borderBottomWidth: 0, marginVertical: 2, paddingHorizontal: 8 },
  zoneBar: { position: 'absolute', left: 0, top: 6, bottom: 6, width: 3, borderRadius: 2 },
  position: { width: 24, color: Colors.text.secondary, fontSize: 13, fontWeight: '600', textAlign: 'center', marginLeft: 8 },
  positionHighlight: { color: Colors.accent.green },
  teamBlock: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, marginLeft: 6 },
  logo: { fontSize: 16 },
  teamName: { color: Colors.text.primary, fontSize: 13, fontWeight: '600', flex: 1 },
  teamNameHighlight: { color: Colors.accent.green },
  stat: { width: 28, color: Colors.text.secondary, fontSize: 12, textAlign: 'center' },
  gd: { width: 32 },
  points: { width: 28, color: Colors.text.primary, fontWeight: '700', fontSize: 13 },
  pointsHighlight: { color: Colors.accent.green },
  form: { flexDirection: 'row', gap: 3, width: 90, justifyContent: 'flex-end' },
  formDot: { width: 16, height: 16, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  formText: { fontSize: 9, fontWeight: '800' },
  header: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: Colors.border },
  headerPos: { width: 24, color: Colors.text.tertiary, fontSize: 11, textAlign: 'center', marginLeft: 8 },
  headerLabel: { color: Colors.text.tertiary, fontSize: 11, marginLeft: 6 },
  headerStat: { width: 28, color: Colors.text.tertiary, fontSize: 11, textAlign: 'center' },
  headerForm: { width: 90, color: Colors.text.tertiary, fontSize: 11, textAlign: 'right' },
})
