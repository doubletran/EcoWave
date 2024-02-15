import { ScrollView, Text, Heading, Box, HStack, List } from "native-base";
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
  const [events, setEvents] = useState("")
  let RenderListableEvents = () => {
    let render_arr = []
    for (let i = 0; i < events.length; i++) {
      render_arr.push((<ListableEvent {...events[i]}/>))
    }
  }

  let ListableEvent = (event) => {
    const {name, description, date,  startTime, endTime, participants, location} = event
    return (
      <Pressable onPress={()=> navigation.navigate("View Event", {event: mockEvent})}>
        <HStack justifyContent="space-between">
          <Box>
            <Heading>{name}</Heading>
            <Text>{date_format(date)}</Text>
            <Text>
              From {time_format(startTime)} to {time_format(endTime)}
            </Text>
          </Box>
          <Button {...Style.inputBtn} leftIcon={INPUT_ICONS.People}>
            {participants}
          </Button>
        </HStack>

        <Button {...Style.inputBtn} leftIcon={INPUT_ICONS.Marker} onPress={() => navigation.navigate("Set location")}>
          Location
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
