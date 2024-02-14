import ReportProblem from "./reportProblem";
import { useState, u, useEffect } from "react";
import { Modal, Button,HStack, IconButton } from "native-base";
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { NAV_ICONS as icons} from '../config/style';

function EventOrProblem  ({onProblem, onEvent})  {
  return (
    <>
      <Button
        variant="outline"
        onPress={onProblem}>
        Spot a problem
      </Button>
      <Button
        variant="outline"
        title="Event"
        onPress={onEvent}>
        Create an event
      </Button>
    </>
  );
};

export const BottomNav = () => {
  const navigation=useNavigation();
  const [showModal, setShowModal] = useState(false);

  const handleProblem = ()=>{
    navigation.navigate("Set location", {action: "Report a problem"})
    setShowModal(false);
  }

  const handleEvent = ()=>{
    navigation.navigate("New Event")
    setShowModal(false);
  }
  return (
    <>
    <HStack marginTop="auto" marginBottom="0">
  
  <IconButton w="33%" title="Map" icon={icons.Map}
 onPress={()=>{
  navigation.navigate("Map")
}}/>
  <IconButton  w="33%" title="Post" icon={icons.Post}
  onPress={()=>{
  setShowModal(true)
  }}/>
  <IconButton w="33%" title="Event" icon={icons.Event}
 onPress={()=>{
  navigation.navigate("Events")
}}/>

    </HStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content marginBottom="0" marginTop="auto">
          <Modal.Header>Choose an action</Modal.Header>
          <Modal.Body>
        <EventOrProblem onProblem={handleProblem} onEvent={handleEvent}/>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};