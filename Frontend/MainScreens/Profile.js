import { View, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from "@clerk/clerk-expo";

import { BottomNav } from "../Navigator";


export const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title='Sign Out'
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export function ProfileScreen() {
  const nav = useNavigation();
  const [signIn, setSignIn] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <View>
      <BottomNav/>
     
    </View>
  );
}
