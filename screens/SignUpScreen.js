import * as React from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Button } from 'react-native-paper';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // send the email.
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      // change the UI to our pending section.
      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      await setActive({ session: completeSignUp.createdSessionId })
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <>
      {!pendingVerification && (
        <View style={styles.container}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 600,
                width: "80%", 
                marginBottom: 10
              }}
            >Sign Up</Text>
            <View style={ styles.inputContainer}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder="Email..."
                value={emailAddress}
                onChangeText={(email) => setEmailAddress(email)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password..."
                secureTextEntry={true}
                value={password}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <View style={{ width: "80%", display: "flex",  alignItems: "flex-end"}}>
              <Button mode='text' >Proceed</Button>
            </View>
        </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    paddingTop: "50%"
  },
  input: {
    borderRadius: 5,
    backgroundColor: 'rgb(249, 250, 250)',
    borderWidth: 1,
    borderColor: 'rgb(181, 189, 196)',
    fontSize: 16,
    height: 40,
    lineHeight: 24,
    paddingVertical: 7,
    paddingHorizontal: 8,
    color: 'rgb(8, 9, 10)',
    shadowColor: 'transparent',
    width: "80%"
  }, 
  inputContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12
  }
})
