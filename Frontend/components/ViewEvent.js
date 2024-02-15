import { ScrollView, Text, Heading, Box, HStack, Container } from "native-base";
import { BottomNav } from "../components/PostModal";
import { VStack, Center, Flex, Button } from "native-base";
import { date_format, time_format } from "../config/lib";
import { INPUT_ICONS } from "../config/style";
import Style from "../config/style";
import { Pressable } from "react-native";
import { useEffect } from "react";
import ViewProblem from "./ViewProblem";
export const ViewEvent = ({navigation, route}) => {
  const handleRegister = ()=>{
    
  }
  useEffect(()=>{
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <Button 
        onPress ={handleRegister}
         >Register</Button>
      )
    })
  }, [])

 const {name, description, date,  startTime, endTime, participants, location} = route.params.event
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
              <Text>{description}</Text>
           <ViewProblem {...problemRef}/>

          </Box>
      </ScrollView>
      <BottomNav />
    </>
  );
};
