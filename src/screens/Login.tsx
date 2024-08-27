import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Login() {
    const navigation= useNavigation()
  return (
    <View>
      <Text>Login</Text>
      <Button title='Hello' onPress={()=> navigation?.navigate("Menu")}></Button>
    </View>
  )
}

const styles = StyleSheet.create({})