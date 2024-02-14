import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { ClerkProvider, SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";

import SignUpScreen from './SignUp'
import SignInScreen from './SignIn'
import { HStack } from 'native-base';

export default function SignInAndUp() {
    const [signIn, setSignIn] = useState(false);
    const { isLoaded, isSignedIn, user } = useUser()

    return (
        <View style={styles.container}>
            <SignedOut>
                
            {!signIn && (<View><SignUpScreen/>
            <TouchableOpacity onPress={()=>{setSignIn(true)}}><Text>Sign In instead</Text></TouchableOpacity></View>)}
            {signIn && (<View><SignInScreen/>
            <TouchableOpacity onPress={()=>{setSignIn(false)}}><Text>Sign Up instead</Text></TouchableOpacity></View>)}
            </SignedOut>
        </View>
    )
}

// temporary styling
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });