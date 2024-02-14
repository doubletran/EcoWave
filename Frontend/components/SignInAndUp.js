import { View, Text, Button, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { ClerkProvider, SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";

import SignUpScreen from './SignUp'
import SignInScreen from './SignIn'

import { SignOut } from './Profile'
import { BottomNav } from './PostModal'

export default function SignInAndUp() {
    const [signIn, setSignIn] = useState(false);
    const { isLoaded, isSignedIn, user } = useUser()
    const nav = useNavigation()

    setTimeout(() => {
        if (isSignedIn)
            nav.goBack()
    })
    
    return (
        <View>
            <SignedIn>
                <Text>You're already signed in!</Text>
            </SignedIn>
            <SignedOut>
            {!signIn && (<View><SignUpScreen/>
            <TouchableOpacity onPress={()=>{setSignIn(true)}}><Text>Sign In instead</Text></TouchableOpacity></View>)}
            {signIn && (<View><SignInScreen/>
            <TouchableOpacity onPress={()=>{setSignIn(false)}}><Text>Sign Up instead</Text></TouchableOpacity></View>)}
            </SignedOut>
        </View>
    )
}