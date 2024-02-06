import { View, Text, Button } from 'react-native'
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
                <Button title="Sign In instead" onPress={()=>{setSignIn(true)}}/></View>)}
                {signIn && (<View><SignInScreen/>
                <Button title="Sign Up instead" onPress={()=>{setSignIn(false)}}/></View>)}
            </SignedOut>
        </View>
    )
}