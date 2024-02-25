import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ICONS, PRESSABLE_ICONS, PressableStyle } from "./config/style";

import {
  Container,
  Modal,
  Center,
  Heading,
  IconButton,
  Text,
} from "native-base";
import { Button, HStack, Box } from "native-base";
import {

  useNavigation,
} from "@react-navigation/native";
import { theme } from "./Navigator";
import { useState} from "react";

function EventOrProblem({ onProblem, onEvent }) {
  return (
    <>
      <Button variant='outline' onPress={onProblem}>
        Report a problem
      </Button>
      <Button variant='outline' title='Event' onPress={onEvent}>
        Create an event
      </Button>
    </>
  );
}

export const Tab = ({ active, name, navigate }) => {
  return (
    <>
      <Button variant='ghost' onPress={() => navigate(name)}>
        <Center>
          {active ? PRESSABLE_ICONS[name].focus : PRESSABLE_ICONS[name].blur}
          <Text fontWeight='bold'>{name}</Text>
        </Center>
      </Button>
    </>
  );
};


 const BottomNav = ({ atProblems, atEvents }) => {
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);

  const handleProblem = () => {
    navigation.navigate("SelectProblemType");
    setShowModal(false);
  };

  const handleEvent = () => {
    navigation.navigate("SelectEventType");
    setShowModal(false);
  };
  const navigateTab = (name) => {
    navigation.navigate(name);
  };
  return (
    <>
      <Box marginTop='auto' marginBottom='0' shadow='9'>
        <HStack
          shadow='9'
          backgroundColor={theme.colors.background}
          justifyContent='space-evenly'
        >
          <Tab active={atProblems} name='Problems' navigate={navigateTab} />
          <IconButton
            borderRadius='full'
            bgColor='primary.300'
            w='20'
            title='Post'
            icon={ICONS.Post}
            onPress={() => {
              setShowModal(true);
            }}
          />
          <Tab active={atEvents} name='Events' navigate={navigateTab} />
        </HStack>
      </Box>
      <Modal size='full' isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content w='100%' marginBottom='0' marginTop='auto'>
          <Modal.Header>Choose an action</Modal.Header>
          <Modal.Body>
            <EventOrProblem onProblem={handleProblem} onEvent={handleEvent} />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
export default BottomNav;