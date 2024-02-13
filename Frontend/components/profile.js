import { View, Text, Button, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { ClerkProvider, SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";

import SignInAndUp from './SignInAndUp';

export const SignOut = () => {
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
    const nav = useNavigation()
    const [signIn, setSignIn] = useState(false)
    const { isLoaded, isSignedIn, user } = useUser()

    return (
        <View>
            <SignedIn>
                <Text>This is your account.</Text>
                {user !== undefined || user != null && (<Text>{user.firstName} {user.lastName}</Text>)}
                <SignOut/>
            </SignedIn>
            <SignedOut>
				<TouchableOpacity onPress={()=>{nav.navigate("Sign In and Up")}}><Text>Go to Sign Up/Sign In</Text></TouchableOpacity>
            </SignedOut>
        </View>
    )
}