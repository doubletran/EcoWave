import { ScrollView, Text, Heading, Box, HStack } from "native-base";
import { BottomNav } from "../components/PostModal";
import { VStack, Center, Flex, Button } from "native-base";
import { date_format, time_format } from "../config/lib";
import { INPUT_ICONS } from "../config/style";
import Style from "../config/style";
import { Pressable } from "react-native";
import { EventModal } from "../components/ViewEvent";
import { useEffect } from "react";
import { getAll } from "../database/events";
export const EventScreen = ({navigation}) => {



  const mockEvent  = {
    name: "NAME",
    date: new Date(),
    endTime : new Date(),
    startTime: new Date(),
    participants: 10,
    location: "Location",
    description: "This is a Private  cleanup that will be held on April 22, 2024, and will start at . They expect around 6.00 volunteers and it'll be hosted by Blossom Bombs. "
  }
  const {name, description, date,  startTime, endTime, participants, location} = mockEvent
  return (
    <>
      <ScrollView>
        <VStack space={4} alignItems='center'>
          <Box p='5' w='90%' bg='muted.200' rounded='md' shadow={3}>
            <Pressable onPress={()=> navigation.navigate("View Event", {event: mockEvent})}>
              <HStack justifyContent="space-between">
              <Box>
              <Heading>{name}</Heading>
              <Text>{date_format(date)}</Text>
              <Text>
                From {time_format(startTime)} to {time_format(endTime)}
              </Text>
              </Box>
              <Button 
                {...Style.inputBtn}
                leftIcon={INPUT_ICONS.People}
              >
                {participants}
              </Button>
              </HStack>

              <Button
                {...Style.inputBtn}
                leftIcon={INPUT_ICONS.Marker}
                onPress={() => navigation.navigate("Set location")}
              >
                Location
              </Button>
            </Pressable>
          </Box>
        </VStack>
      </ScrollView>
      <BottomNav />
    </>
  );
};
