import { ScrollView, Text, Heading, Box, HStack, Container } from "native-base";
import { BottomNav } from "../Navigator";
import { VStack, Center, Flex, Button } from "native-base";
import { firebase_date_format, firebase_time_format } from "../config/lib";
import { INPUT_ICONS } from "../config/style";
import Style from "../config/style";

import { useState, useEffect } from "react";
import ViewProblem from "./ViewProblem";

import { arrayUnion } from "firebase/firestore";

import { get, update } from "../database/events";
import { Modal } from "native-base";
import { useUser } from "@clerk/clerk-expo";

export const ViewEvent = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(false)
  const [showAlreadyRegModal, setShowAlreadyRegModal] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const { user } = useUser()

  const handleRegister = async () => {
    let eventId = route.params.id;
    let evnt = await get(eventId)
    if (evnt.data().participants.includes(user.id)) {
      setShowAlreadyRegModal(true)
      return
    }

    let res = await update(eventId, { participants: arrayUnion(user.id) });
    console.log(res)
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
    time,
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

  // show participants modal is not implemented yet and therefore disabled
  return (
    <>
      <ScrollView>
        <Box p='5'>
          <Heading>{name}</Heading>
          <HStack justifyContent='space-between'>
            <Box pt="3">
              <Text>{firebase_date_format(time.start)}</Text>
              <Text>
                {firebase_time_format(time.start)} - {firebase_time_format(time.end)}
              </Text>
            </Box>
            <Button {...Style.inputBtn} leftIcon={INPUT_ICONS.People} onPress={() => {setShowParticipants(false)}}>
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
      <Modal isOpen={showAlreadyRegModal} onClose={() => setShowAlreadyRegModal(false)}>
        <Modal.Content w='100%' marginBottom='auto' marginTop='auto'>
          <Modal.Body>
            <Text>You're already registered for this event!</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Modal isOpen={showParticipants} onClose={() => setShowParticipants(false)}>
        <Modal.Content w='100%' marginBottom='auto' marginTop='auto'>
          <Modal.Body>
            <Modal.Header>Participants</Modal.Header>
            <VStack>
              {participants.map((participant) => { <Text>{participant}</Text> })}
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <BottomNav />
    </>
  );
};
