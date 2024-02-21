import { View, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Box } from "native-base";

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

  let DisplayMyEvents = () => {
    //import { query, where } from "firebase/firestore";  
    const q = query(citiesRef, where("regions", "array-contains", "west_coast"));
    return (
      <View>
        {}
      </View>
    )
  }

  return (
    <View>
      <DisplayMyEvents/>
      <SignOut/>
      <Box h={'100%'}>
      {/* This box holds the bottom nav at the bottom of the screen lol*/}
      </Box>
      <BottomNav/>
    </View>
  );
}
