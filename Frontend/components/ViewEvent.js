import { ScrollView, Text, Heading, Box, HStack, Container } from "native-base";
import { BottomNav } from "../components/PostModal";
import { VStack, Center, Flex, Button } from "native-base";
import { firebase_date_format, time_format } from "../config/lib";
import { INPUT_ICONS } from "../config/style";
import Style from "../config/style";
import { Pressable } from "react-native";
import { useEffect } from "react";
import ViewProblem from "./ViewProblem";

import { arrayUnion } from 'firebase/firestore';

import { update } from "../database/events";

import { useUser } from "@clerk/clerk-expo";

export const ViewEvent = ({navigation, route}) => {
  const { user } = useUser()
  const handleRegister = async () => {
    let eventId = route.params.eventId
    return await update(eventId, { participants: arrayUnion(user.id)})
  }

  useEffect(()=>{
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <Button 
        onPress={handleRegister}
         >Register</Button>
      )
    })
  }, [])

 const {name, description, date,  start_time, end_time, participants, location} = route.params.event

 const problemRef = {
  title: "trash floating on the river",
  description: "",
  create_time : new Date(),
  location: location,
  imageUri : "https://wallpaperaccess.com/full/317501.jpg"
 }

  return (
    <>
      <ScrollView>
          <Box p='5' >
              <HStack justifyContent="space-between">
              <Box>
              <Heading>{name}</Heading>
              <Text>{firebase_date_format(date)}</Text>
              <Text>
                From {time_format(start_time)} to {time_format(end_time)}
              </Text>
              </Box>
              <Button 
                {...Style.inputBtn}
                leftIcon={INPUT_ICONS.People}
              >
                {participants.length}
              </Button>
              </HStack>

              <Button
                {...Style.inputBtn}
                leftIcon={INPUT_ICONS.Marker}
                onPress={() => navigation.navigate("Set location")}
              >
                Location: {location.latitude}
              </Button>
              <Text>{description}</Text>
           <ViewProblem {...problemRef}/>

          </Box>
      </ScrollView>
      <BottomNav />
    </>
  );
};
