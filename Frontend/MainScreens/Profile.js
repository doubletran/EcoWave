import { View, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Box, HStack, VStack, Pressable, ScrollView } from "native-base";
import { ICONS, INPUT_ICONS } from "../config/style";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from "@clerk/clerk-expo";

import BottomNav from "../BottomNav";
import Style from "../config/style";
import { Type } from "../config/style";
import { getMyEvent } from "../database/events";
import { ListableEvent } from "./EventsScreen";
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
  const [userEvents, setUserEvents] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    (async () => {
      let result = await getMyEvent(userId);

      setUserEvents(result);
    })();
  }, []);

  return (
    <>
      <ScrollView>
        {/* <SignOut/> */}

        <VStack space={3} alignItems='center'>
          {userEvents.map((evnt) => ListableEvent(evnt))}
        </VStack>
        <Box h={"100%"}>
          {/* This box holds the bottom nav at the bottom of the screen lol*/}
        </Box>
      </ScrollView>
      <BottomNav />
    </>
  );
}
