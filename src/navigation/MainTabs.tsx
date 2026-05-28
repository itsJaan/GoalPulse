import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainTabParamList } from '../constants/types'
import { Colors } from '../constants/colors'
import NewsScreen from '../screens/tabs/NewsScreen'
import ScoresScreen from '../screens/tabs/ScoresScreen'
import StandingsScreen from '../screens/tabs/StandingsScreen'
import FavoritesScreen from '../screens/tabs/FavoritesScreen'

const Tab = createBottomTabNavigator<MainTabParamList>()

function TabIcon({ icon, label, focused }: { icon: string; label: string; focused: boolean }) {
  return (
    <View style={styles.tabItem}>
      <Text style={[styles.icon, focused && styles.iconFocused]}>{icon}</Text>
      <Text style={[styles.label, focused && styles.labelFocused]}>{label}</Text>
    </View>
  )
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon icon="📰" label="News" focused={focused} /> }}
      />
      <Tab.Screen
        name="Scores"
        component={ScoresScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon icon="⚽" label="Scores" focused={focused} /> }}
      />
      <Tab.Screen
        name="Standings"
        component={StandingsScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon icon="📊" label="Table" focused={focused} /> }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon icon="⭐" label="Favs" focused={focused} /> }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: { backgroundColor: Colors.bg.card, borderTopColor: Colors.border, borderTopWidth: 1, height: 72, paddingBottom: 8 },
  tabItem: { alignItems: 'center', gap: 4, paddingTop: 6 },
  icon: { fontSize: 22, opacity: 0.4 },
  iconFocused: { opacity: 1 },
  label: { color: Colors.text.tertiary, fontSize: 10, fontWeight: '600' },
  labelFocused: { color: Colors.accent.green },
})
