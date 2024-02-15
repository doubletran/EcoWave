import { ScrollView, Text, Heading, Box, HStack, List } from "native-base";
import { BottomNav } from "../Navigator";
import { VStack, Center, Flex, Button } from "native-base";
import { firebase_date_format, time_format } from "../config/lib";
import { INPUT_ICONS } from "../config/style";
import Style from "../config/style";
import { Pressable } from "react-native";
import { EventModal } from "../components/ViewEvent";
import { useState, useEffect } from "react";
import { getAll } from "../database/events";

export const EventScreen = ({navigation}) => {
  const [events, setEvents] = useState([])

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
      setEvents(data)
    }
    getData();
  }, []);

  let RenderListableEvents = () => {
    let render_arr = []
    events.forEach((evnt) => {
      render_arr.push(ListableEvent(evnt.data(), evnt.id))
    })
    return render_arr
  }

  let ListableEvent = (event, eventId) => {
    const {name, description, date,  start_time, end_time, location, participants} = event

    // hash algorithm from stack overflow, non-secure
    let str = name + description
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return (
      <Pressable key={hash} onPress={()=> navigation.navigate("View an event", {event: event, eventId: eventId})}>
        <HStack justifyContent="space-between">
          <Box>
            <Heading>{name}</Heading>
            <Text>{firebase_date_format(date)}</Text>
            <Text>
              From {time_format(start_time)} to {time_format(end_time)}
            </Text>
          </Box>
          <Button {...Style.inputBtn} leftIcon={INPUT_ICONS.People}>
            {participants.length}
          </Button>
        </HStack>

        <Button {...Style.inputBtn} leftIcon={INPUT_ICONS.Marker} onPress={() => navigation.navigate("Set location")}>
          {location.latitude} {location.longitude}
        </Button>
      </Pressable>
    )
  }

  return (
    <>
      <ScrollView>
        <VStack space={4} alignItems='center'>
          <Box p='5' w='90%' bg='muted.200' rounded='md' shadow={3}>
            <RenderListableEvents/>
          </Box>
        </VStack>
      </ScrollView>
      <BottomNav />
    </>
  );
};
