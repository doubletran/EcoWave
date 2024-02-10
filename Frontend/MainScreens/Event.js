import { ScrollView, Text, Heading, Box, HStack } from "native-base";
import { BottomNav } from "../components/PostModal";
import { VStack, Center, Flex, Button } from "native-base";
import { date_format, time_format } from "../config/lib";
import { INPUT_ICONS } from "../config/style";
import Style from "../config/style";
import { Pressable } from "react-native";
export const EventScreen = () => {
  const date = new Date();
  const startTime = new Date();
  const endTime = new Date();
  const participants = 10;
  const location = "location";
  const description = "";
  return (
    <>
      <ScrollView>
        <VStack space={4} alignItems='center'>
          <Box p='5' w='90%' bg='muted.200' rounded='md' shadow={3}>
            <Pressable>
              <HStack justifyContent="space-between">
              <Box>
              <Heading>Name</Heading>
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
