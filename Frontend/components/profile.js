import { View, Text, Button, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { ClerkProvider, SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";

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
    const { isLoaded, isSignedIn, user } = useUser();

    return (
        <View>
            <SignedIn>
                <Text>This is your account.</Text>
                <Text>First Name: {user.firstName}</Text>
                <Text>Last Name: {user.lastName}</Text>
                <SignOut/>
            </SignedIn>
            <SignedOut>
                <SignInAndUp/>
            </SignedOut>
        </View>
    )
}