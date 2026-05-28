import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Colors } from '../../constants/colors'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../../components/ui/Button'
import { AuthStackParamList } from '../../constants/types'

type Props = { navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'> }

export default function RegisterScreen({ navigation }: Props) {
  const { register, isLoading, error, clearError } = useAuthStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    const success = await register(email, name, password)
    if (!success && error) {
      Alert.alert('Error', error)
      clearError()
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>⚽</Text>
          <Text style={styles.appName}>GoalPulse</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Create account</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor={Colors.text.tertiary} autoCapitalize="words" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="you@example.com" placeholderTextColor={Colors.text.tertiary} keyboardType="email-address" autoCapitalize="none" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Min. 6 characters" placeholderTextColor={Colors.text.tertiary} secureTextEntry />
          </View>

          <Button title="Create Account" onPress={handleRegister} loading={isLoading} style={styles.btn} />

          <TouchableOpacity style={styles.link} onPress={() => navigation.goBack()}>
            <Text style={styles.linkText}>Already have an account? <Text style={styles.linkHighlight}>Sign in</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg.primary },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 },
  header: { alignItems: 'center', marginBottom: 36 },
  logo: { fontSize: 52, marginBottom: 10 },
  appName: { color: Colors.text.primary, fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  form: { backgroundColor: Colors.bg.card, borderRadius: 24, padding: 24 },
  formTitle: { color: Colors.text.primary, fontSize: 22, fontWeight: '700', marginBottom: 24 },
  inputGroup: { gap: 8, marginBottom: 16 },
  label: { color: Colors.text.secondary, fontSize: 13, fontWeight: '600' },
  input: { backgroundColor: Colors.bg.input, borderRadius: 12, borderWidth: 1, borderColor: Colors.border, color: Colors.text.primary, fontSize: 15, paddingHorizontal: 16, paddingVertical: 14 },
  btn: { marginTop: 8 },
  link: { alignItems: 'center', marginTop: 16, paddingVertical: 4 },
  linkText: { color: Colors.text.secondary, fontSize: 14 },
  linkHighlight: { color: Colors.accent.green, fontWeight: '600' },
})
