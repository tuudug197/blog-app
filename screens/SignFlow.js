import { useState } from 'react'
import SignUpScreen from './SignUpScreen'
import SignInScreen from './SignInScreen'

export default function SignFlow() {
  const [interval, setInterval] = useState(true)
  return <>{interval ? <SignUpScreen /> : <SignInScreen />}</>
}
