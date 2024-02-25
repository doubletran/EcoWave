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
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";
import { EventScreen } from "./MainScreens/EventsScreen";
import MapScreen from "./MainScreens/ProblemsScreen";
import Locate from "./components/Locate";
import InputProblem from "./components/InputProblem";
import CreateEvent from "./components/CreateEvent";
import { ViewEvent } from "./components/ViewEvent";
import { ProfileScreen } from "./MainScreens/Profile";

import { useState} from "react";
import { Name } from "./App";
import SelectProblemType from "./components/SelectProblemType";
import SelectEventTypeScreen from "./components/SelectEventType";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#e6ffff",
  },
};

export const Header = ({ onSearch }) => {
  const nav = useNavigation();

  return (
    <>
      <HStack w='95%' justifyContent='space-between'>
        {Name({ small: true })}
        <HStack>
          <IconButton icon={ICONS.Search} onPress={onSearch} />
          <IconButton
            icon={ICONS.Profile}
            onPress={() => {
              nav.navigate("Profile");
            }}
          />
        </HStack>
        {/* <Center h="40" w="33%" bg="primary.300" rounded="md" shadow={3} /> */}
      </HStack>
    </>
  );
};

const RootStack = createNativeStackNavigator();
export default function Navigator() {
  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <RootStack.Group
          screenOptions={{
            headerTitle: (props) => <Header />,
            headerBackVisible: false,
          }}
        >
          <RootStack.Screen name='Problems' component={MapScreen} />
          <RootStack.Screen name='Events' component={EventScreen} />
          <RootStack.Screen
            name='Profile'
            component={ProfileScreen}
            options={{
              headerTitle: "Profile",
              headerBackVisible: true,
            }}
          />
        </RootStack.Group>

        <RootStack.Group>
          <RootStack.Screen name='Add location' component={Locate} />
          <RootStack.Screen
            name='SelectProblemType'
            component={SelectProblemType}
          ></RootStack.Screen>
          <RootStack.Screen
            name='SelectEventType'
            component={SelectEventTypeScreen}
          ></RootStack.Screen>
          <RootStack.Screen name='New Event' component={CreateEvent} />
          <RootStack.Screen name='New Problem' component={InputProblem} />
          <RootStack.Screen
            name='View an event'
            component={ViewEvent}
            options={{
              headerTitle: "View an Event",
              headerBackVisible: true,
            }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export function HeaderRight(title, disabled, handler) {
  return (
    <Button
      title={title}
      isDisabled={disabled}
      icon={icons.Next}
      onPress={handler}
    />
  );
}

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
export const BottomNav = ({ atProblems, atEvents }) => {
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
