import { ScrollView, Text, Heading, Box, HStack, List } from "native-base";
import { BottomNav } from "../Navigator";
import { VStack, Center, Flex, Button } from "native-base";
import { firebase_date_format, firebase_time_format } from "../config/lib";
import { INPUT_ICONS } from "../config/style";
import Style from "../config/style";
import { Pressable } from "react-native";
import { EventModal } from "../components/ViewEvent";
import { useState, useEffect } from "react";
import { getAll } from "../database/events";
import { useAuth } from "@clerk/clerk-expo";

export const EventScreen = ({navigation}) => {
  const [events, setEvents] = useState([])
  const {userId} = useAuth()
  // events = [{
  //   name: "NAME",
  //   date: new Date(),
  //   endTime : new Date(),
  //   startTime: new Date(),
  //   participants: [userId],
  //   location: "Location",
  //   description: "This is a Private  cleanup that will be held on April 22, 2024, and will start at . They expect around 6.00 volunteers and it'll be hosted by Blossom Bombs. "
  // }, {
  //   name: "NAME2",
  //   date: new Date(),
  //   endTime : new Date(),
  //   startTime: new Date(),
  //   participants: [userId],
  //   location: "LOCATION2",
  //   description: "This is a Private  cleanup that will be held on April 22, 2024, and will start at . They expect around 6.00 volunteers and it'll be hosted by Blossom Bombs. "
  // }]

  useEffect(() => {
    const getData = async () => {
      let data = await getAll()
      //console.log(data)
      setEvents(data)
    }
    getData();
  }, []);

  // let RenderListableEvents = () => {
  //   let render_arr = []
  //   events.forEach((event) => {
  //     render_arr.push(ListableEvent(event, event.id))
  //   })
  //   return render_arr
  // }

  let ListableEvent = (event) => {
    const {name, description, time, location, address, participants} = event
    // console.log(name, location, time)
    // hash algorithm from stack overflow, non-secure
    let str = name + description
     let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return (
      <Box p="3" bgColor={Style.ViewBox} w="95%" rounded="xl" shadow="3">
      <Pressable key={hash} onPress={()=> navigation.navigate("View an event", {...event})}>
      <Text fontWeight="bold" fontSize="md">{name}</Text>
        <HStack justifyContent="space-between">

          <Box mt="5">
            <Text>{firebase_date_format(time.start)}</Text>
            <Text>
              {firebase_time_format(time.start)} - {firebase_time_format(time.end)}
            </Text>
          </Box>
          <Button {...Style.inputBtn} leftIcon={INPUT_ICONS.People}>
            {participants.length}
          </Button>
        </HStack>
        <Button {...Style.inputBtn} leftIcon={INPUT_ICONS.Marker} onPress={() => navigation.navigate("Set location")}>
         { `${location.latitude}, ${location.longitude}`}
      </Button>
      </Pressable>
      </Box>
    )
  }

  return (
    <>
      <ScrollView>
        <VStack space={3} alignItems='center'>
          {events.map((event) => ListableEvent(event))}
        </VStack>
      </ScrollView>
      <BottomNav />
    </>
  );
};
