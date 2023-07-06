import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useSignIn } from '@clerk/clerk-expo'
import { Button, TextInput } from 'react-native-paper'

export default function SignInScreen( props ) {

  const {setInterval} = props

  const { signIn, setActive, isLoaded } = useSignIn()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSignInPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      })
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 600,
          width: '80%',
          marginBottom: 10,
        }}
      >
        Sign in
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ width: '80%' }}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />

        <TextInput
          style={{ width: '80%' }}
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={{ width: '80%', display: 'flex', alignItems: 'flex-end' }}>
        <Button  onPress={onSignInPress } mode="text">Proceed</Button>
      </View>
      <View style={{ width: '80%', display: 'flex', alignItems: 'flex-end' }}>
        <Button  onPress={() => setInterval((value) => !value)} mode="text">Sign up</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    paddingTop: '50%',
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
})
