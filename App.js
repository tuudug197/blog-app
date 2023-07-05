import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import Article from './screens/Article'
import Home from './screens/Home'
import SignFlow from './screens/SignFlow'

const CLERK_PUBLISHABLE_KEY =
  'pk_test_c3BsZW5kaWQtY29sbGllLTkuY2xlcmsuYWNjb3VudHMuZGV2JA'
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Article" component={Article} />
          </Stack.Navigator>
        </NavigationContainer>
      </SignedIn>
      <SignedOut>
        <SignFlow />
      </SignedOut>
    </ClerkProvider>
  )
}
