import { View, Text, Button, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";

import SignInAndUp from './SignInAndUp';

const SignOut = () => {
    const { isLoaded,signOut } = useAuth();
    if (!isLoaded) {
      return null;
    }
    return (
      <View>
        <Button
          title="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </View>
    );
  };

export function ProfileScreen() {
    const [signIn, setSignIn] = useState(false);

    return (
        <View>
            <SignedIn>
                <Text>This is your account.</Text>
                <SignOut/>
            </SignedIn>
            <SignedOut>
                <SignInAndUp/>
            </SignedOut>
        </View>
    )
}