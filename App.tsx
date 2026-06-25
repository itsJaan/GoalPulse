import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import RootNavigator from './src/navigation/RootNavigator'
import { useAuthStore } from './src/store/authStore'

export default function App() {
  const { loadSession } = useAuthStore()

  useEffect(() => {
    loadSession()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#080808" />
      <RootNavigator />
    </>
  )
}