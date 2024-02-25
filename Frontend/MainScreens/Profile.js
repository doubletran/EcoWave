import { View, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Box, HStack, VStack, Pressable } from "native-base";
import { ICONS, INPUT_ICONS } from "../config/style";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from "@clerk/clerk-expo";

import { BottomNav } from "../Navigator";
import { query, collection, where, getDocs } from 'firebase/firestore'
import { firebase_date_format, firebase_time_format } from '../config/lib'
import Style from "../config/style";
import { Type } from "../config/style";

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
  const [userEvents, setUserEvents] = useState([])
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    let loadUserEvents = async () => {
      let temp = []
      const q = query(collection(firebase, "events"), where("participants", "array-contains", user.id));
      let queryResult = await getDocs(q)
      queryResult.forEach((doc) => {
        temp.push(doc.data())
      })
      setUserEvents(temp)
      console.log(userEvents)
    }
    loadUserEvents()
  }, [])

  let ListableEvent = (event) => {
    const { name, description, time, location, address, participants, types } = event;
    // console.log(name, location, time)
    // hash algorithm from stack overflow, non-secure
    let str = name + description;
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
      let chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }

    return (
      <Box p='3' bgColor={Style.ViewBox} w='95%' rounded='xl' shadow='3'>
        <Pressable
          key={hash}
          onPress={() => navigation.navigate("View an event", { ...event })}
        >
          <Text fontWeight='bold' fontSize='md'>
            {name}
          </Text>
          <HStack justifyContent='space-between'>
            <Box mt='1'>
              <Text>{firebase_date_format(time.start)}</Text>
              <Text>
                {firebase_time_format(time.start)} -{" "}
                {firebase_time_format(time.end)}
              </Text>
            </Box>
            <Text>23 spots remaining </Text>

            {/* <Button {...Style.inputBtn} leftIcon={INPUT_ICONS.People}>
            {participants.length}
          </Button> */}
          </HStack>
          <Button
            variant='ghost'
            leftIcon={ICONS.Marker}
            onPress={() => nav.navigate("Add location")}
          >
            {`${address}`}
          </Button>
          <HStack>{types?.map((item) => <Type name={item}/>)}</HStack>
        </Pressable>
      </Box>
    );
  };

  return (
    <View>
      <SignOut/>
      <VStack space={3} alignItems='center'>
        {userEvents.map((evnt) => { ListableEvent(evnt) })}
      </VStack>
      <Box h={'100%'}>
      {/* This box holds the bottom nav at the bottom of the screen lol*/}
      </Box>
      <BottomNav/>
    </View>
  );
}
