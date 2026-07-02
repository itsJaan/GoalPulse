import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from '../constants/colors'

interface TeamLogoProps {
  uri: string
  size?: number
  fallback?: string
}

const TeamLogo = ({ uri, size = 36, fallback = '?' }: TeamLogoProps) => {
  const [hasError, setHasError] = useState(false)

  const resolvedUri = uri?.endsWith('.svg') ? uri.replace('.svg', '.png') : uri
  const showFallback = !resolvedUri || !resolvedUri.startsWith('http') || hasError

  if (showFallback) {
    return (
      <View style={[
        styles.placeholder,
        { width: size, height: size, borderRadius: size / 2 },
      ]}>
        <Text style={styles.fallbackText}>{fallback?.slice(0, 3)}</Text>
      </View>
    )
  }

  return (
    <FastImage
      source={{ uri: resolvedUri, priority: FastImage.priority.normal }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      resizeMode={FastImage.resizeMode.contain}
      onError={() => setHasError(true)}
    />
  )
}

export default TeamLogo

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: Colors.bg.elevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  fallbackText: {
    color: Colors.text.secondary,
    fontSize: 10,
    fontWeight: '800',
  },
})