import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Colors } from '../../constants/colors'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../../components/ui/Button'
import { AuthStackParamList } from '../../constants/types'

type Props = { navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'> }

export default function LoginScreen({ navigation }: Props) {
  const { login, isLoading, error, clearError } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const success = await login(email, password)
    if (!success && error) {
      Alert.alert('Login failed', error)
      clearError()
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>⚽</Text>
          <Text style={styles.appName}>GoalPulse</Text>
          <Text style={styles.tagline}>Live scores & football news</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Sign in</Text>
          <Text style={styles.formHint}>Use password: 123456 to log in</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="you@example.com" placeholderTextColor={Colors.text.tertiary} keyboardType="email-address" autoCapitalize="none" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="••••••••" placeholderTextColor={Colors.text.tertiary} secureTextEntry />
          </View>

          <Button title="Sign In" onPress={handleLogin} loading={isLoading} style={styles.btn} />

          <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkHighlight}>Create one</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg.primary },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 },
  header: { alignItems: 'center', marginBottom: 48 },
  logo: { fontSize: 64, marginBottom: 12 },
  appName: { color: Colors.text.primary, fontSize: 32, fontWeight: '800', letterSpacing: -0.5, marginBottom: 6 },
  tagline: { color: Colors.text.secondary, fontSize: 15 },
  form: { backgroundColor: Colors.bg.card, borderRadius: 24, padding: 24, gap: 4 },
  formTitle: { color: Colors.text.primary, fontSize: 22, fontWeight: '700', marginBottom: 4 },
  formHint: { color: Colors.accent.green, fontSize: 12, marginBottom: 20 },
  inputGroup: { gap: 8, marginBottom: 16 },
  label: { color: Colors.text.secondary, fontSize: 13, fontWeight: '600' },
  input: { backgroundColor: Colors.bg.input, borderRadius: 12, borderWidth: 1, borderColor: Colors.border, color: Colors.text.primary, fontSize: 15, paddingHorizontal: 16, paddingVertical: 14 },
  btn: { marginTop: 8 },
  link: { alignItems: 'center', marginTop: 16, paddingVertical: 4 },
  linkText: { color: Colors.text.secondary, fontSize: 14 },
  linkHighlight: { color: Colors.accent.green, fontWeight: '600' },
})
