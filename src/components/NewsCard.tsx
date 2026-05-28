import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { NewsArticle } from '../constants/types'
import { Colors } from '../constants/colors'

interface NewsCardProps {
  article: NewsArticle
  variant?: 'featured' | 'compact'
  onPress?: () => void
}

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function NewsCard({ article, variant = 'compact', onPress }: NewsCardProps) {
  if (variant === 'featured') {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.featured}>
        <Image source={{ uri: article.imageUrl }} style={styles.featuredImage} resizeMode="cover" />
        <View style={styles.featuredOverlay} />
        <View style={styles.featuredContent}>
          <View style={styles.leagueBadge}>
            <Text style={styles.leagueBadgeText}>{article.league}</Text>
          </View>
          <Text style={styles.featuredTitle} numberOfLines={2}>{article.title}</Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>{article.source}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>{timeAgo(article.publishedAt)}</Text>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.metaText}>{article.readTimeMin} min read</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.compact}>
      <View style={styles.compactContent}>
        <View style={styles.leaguePill}>
          <Text style={styles.leaguePillText}>{article.league}</Text>
        </View>
        <Text style={styles.compactTitle} numberOfLines={2}>{article.title}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>{article.source}</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{timeAgo(article.publishedAt)}</Text>
        </View>
      </View>
      <Image source={{ uri: article.imageUrl }} style={styles.compactImage} resizeMode="cover" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  featured: { borderRadius: 20, overflow: 'hidden', height: 240, marginBottom: 4 },
  featuredImage: { ...StyleSheet.absoluteFillObject },
  featuredOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.55)' },
  featuredContent: { flex: 1, justifyContent: 'flex-end', padding: 20 },
  leagueBadge: { alignSelf: 'flex-start', backgroundColor: Colors.accent.green, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 10 },
  leagueBadgeText: { color: Colors.text.inverse, fontSize: 11, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' },
  featuredTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', lineHeight: 24, marginBottom: 10 },
  compact: { flexDirection: 'row', backgroundColor: Colors.bg.card, borderRadius: 16, overflow: 'hidden', padding: 14, gap: 12 },
  compactContent: { flex: 1, gap: 6 },
  leaguePill: { alignSelf: 'flex-start', backgroundColor: Colors.accent.greenDim, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  leaguePillText: { color: Colors.accent.green, fontSize: 10, fontWeight: '700', letterSpacing: 0.4, textTransform: 'uppercase' },
  compactTitle: { color: Colors.text.primary, fontSize: 14, fontWeight: '600', lineHeight: 20 },
  compactImage: { width: 90, height: 90, borderRadius: 10 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  metaText: { color: Colors.text.secondary, fontSize: 12 },
  metaDot: { color: Colors.text.tertiary, fontSize: 12 },
})
