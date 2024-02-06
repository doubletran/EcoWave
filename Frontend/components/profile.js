import { View, Text, Button, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

import SignUpScreen from './SignUp'
import SignInScreen from './SignIn'

export function ProfileScreen() {
    const [signIn, setSignIn] = useState(false);

    return (
        <View>
            <SignedIn>
                <Text>This is your account.</Text>
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