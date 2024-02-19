import { ScrollView, Text, Heading, Box, HStack, Container } from "native-base";
import { BottomNav } from "../Navigator";
import { VStack, Center, Flex, Button } from "native-base";
import { date_format, time_format } from "../config/lib";
import { INPUT_ICONS } from "../config/style";
import Style from "../config/style";

import { useState, useEffect } from "react";
import ViewProblem from "./ViewProblem";

import { arrayUnion } from "firebase/firestore";

import { update } from "../database/events";
import { Modal } from "native-base";
import { useUser } from "@clerk/clerk-expo";

export const ViewEvent = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();

  const handleRegister = async () => {
    let eventId = route.params.eventId;
    await update(eventId, { participants: arrayUnion(user.id) });
    setShowModal(true);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => <Button onPress={handleRegister}>Register</Button>,
    });
  }, []);

  const {
    name,
    description,
    time: { start, end },
    location,
    address,
    participants,
  } = route.params;

  const problemRef = {
    title: "trash floating on the river",
    description: "",
    create_time: new Date(),
    location: location,
    imageUri: "https://wallpaperaccess.com/full/317501.jpg",
  };

  return (
    <>
      <ScrollView>
        <Box p='5'>
          <Heading>{name}</Heading>
          <HStack justifyContent='space-between'>
            <Box pt="3">
              <Text>{date_format(start)}</Text>
              <Text>
                {time_format(start)} - {time_format(end)}
              </Text>
            </Box>
            <Button {...Style.inputBtn} leftIcon={INPUT_ICONS.People}>
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
          {/* <ViewProblem {...problemRef}/> */}
        </Box>
      </ScrollView>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content w='100%' marginBottom='0' marginTop='auto'>
          <Modal.Header>Test</Modal.Header>
          <Modal.Body>
            <Text>You're registered!</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <BottomNav />
    </>
  );
};
