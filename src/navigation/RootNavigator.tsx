import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAuthStore } from '../store/authStore'
import AuthStack from './AuthStack'
import MainTabs from './MainTabs'

export default function RootNavigator() {
  const { isAuthenticated } = useAuthStore()
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  )
}
