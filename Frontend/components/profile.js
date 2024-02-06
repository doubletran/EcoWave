import { View, Text, Button, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

import SignInAndUp from './SignInAndUp';

export function ProfileScreen() {
    const [signIn, setSignIn] = useState(false);

    return (
        <View>
            <SignedIn>
                <Text>This is your account.</Text>
            </SignedIn>
            <SignedOut>
                <SignInAndUp/>
            </SignedOut>
        </View>
    )
}