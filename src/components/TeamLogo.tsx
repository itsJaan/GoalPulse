import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from '../constants/colors'
import { TLA_TO_ISO } from '../constants/variables'

interface TeamLogoProps {
  uri: string
  size?: number
  fallback?: string
  tla?: string
}


const isNumberId = (uri: string) => {
  const filename = uri.split('/').pop()?.replace('.svg', '').replace('.png', '')
  return !isNaN(Number(filename))
}

const TeamLogo = ({ uri, size = 36, fallback = '?', tla }: TeamLogoProps) => {
  const [hasError, setHasError] = useState(false)
  const [flagError, setFlagError] = useState(false)

  const isoCode = tla ? TLA_TO_ISO[tla] : null

  if (isoCode && !flagError) {
    return (
      <FastImage
        source={{
          uri: `https://flagcdn.com/w40/${isoCode}.png`,
          priority: FastImage.priority.normal,
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: size,
          height: size * 0.67,
          borderRadius: 4,
        }}
        resizeMode={FastImage.resizeMode.cover}
        onError={() => setFlagError(true)}
      />
    )
  }

  const resolvedUri = isNumberId(uri)
    ? uri.replace('.svg', '.png')
    : uri

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