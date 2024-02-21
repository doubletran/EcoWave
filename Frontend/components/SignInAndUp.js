import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { ClerkProvider, SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";

import SignUpScreen from "./SignUp";
import SignInScreen from "./SignIn";
import { Center, HStack } from "native-base";
import { Name } from "../App";

export default function SignInAndUp({navigation}) {
  const [signIn, setSignIn] = useState(true);
  // useEffect(()=>{
  //   navigation.setOptions({
  //     headerShown: false
  //   })
  // })

  return (
    
    <Center backgroundColor="yellow.200"  h="100%" w="100%">
      <SignedOut>
        <Name />

        {!signIn ? (
          <SignUpScreen handleSignin={() => setSignIn(true)} />
        ) : (
          <SignInScreen handleSignup={() => setSignIn(false)} />
        )}
      </SignedOut>
    </Center>
  );
}


