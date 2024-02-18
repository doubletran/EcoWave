import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAV_ICONS as icons } from "./config/style";

import { Container, Modal, Heading, IconButton } from "native-base";
import { Button, HStack, Box } from "native-base";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from "@react-navigation/native";
import { EventScreen } from "./MainScreens/Event";
import MapScreen from "./MainScreens/Map";
import LocateProblem from "./components/LocateProblem";
import InputProblem from "./components/InputProblem";
import CreateEvent from "./components/CreateEvent";
import { ViewEvent } from "./components/ViewEvent";
import { ProfileScreen } from "./MainScreens/Profile";
import SignInAndUp from "./components/SignInAndUp";
import ReportProblem from "./components/reportProblem";
import { useState, useEffect } from "react";
import { Name } from "./App";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(255, 255, 0 )",
  },
};

export const Header = ({ onSearch }) => {
  const nav = useNavigation();

  return (
    <>
      <HStack w='95%' justifyContent='space-between'>
        {Name({small: true})}
        <HStack>
          <IconButton icon={icons.Search} onPress={onSearch} />
          <IconButton
            icon={icons.Profile}
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

const BackHeader = () => {
  const nav = useNavigation();

  return (
    <>
      <HStack>
        <IconButton
          alignItems='left'
          title='Back'
          icon={icons.Back}
          onPress={() => {
            nav.goBack();
          }}
        />
      </HStack>
    </>
  );
};

const RootStack = createNativeStackNavigator();
export default function  Navigator() {

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
        }}>
          <RootStack.Screen name='Map' component={MapScreen} />
          <RootStack.Screen name='Events' component={EventScreen} />
          <RootStack.Screen name='New Event' component={CreateEvent} />
        </RootStack.Group>

        <RootStack.Group
          screenOptions={{
            headerBackVisible: true,
          }}
        >
          <RootStack.Screen
            name='Profile'
            component={ProfileScreen}
            options={{
              headerTitle: "Profile",
              headerBackVisible: true,
            }}
          />
          <RootStack.Screen
            name='Sign In and Up'
            component={SignInAndUp}
            options={{
              headerTitle: "Sign In/Up",
              headerBackVisible: true,
            }}
          />
          <RootStack.Screen
            name='Set location'
            component={LocateProblem}
            options={({ navigation, route }) => ({
              // Add a placeholder button without the `onPress` to avoid flicker
              title: "Set location",
            })}
          />
          <RootStack.Screen name='Report a problem' component={InputProblem} />
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
        Spot a problem
      </Button>
      <Button variant='outline' title='Event' onPress={onEvent}>
        Create an event
      </Button>
    </>
  );
}

export const BottomNav = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const handleProblem = () => {
    navigation.navigate("Set location", { action: "Report a problem" });
    setShowModal(false);
  };

  const handleEvent = () => {
    navigation.navigate("New Event");
    setShowModal(false);
  };
  return (
    <>
      <HStack
        backgroundColor={theme.colors.background}
        justifyContent='center'
        marginTop='auto'
        marginBottom='0'
      >
        <IconButton
          w='33%'
          title='Map'
          icon={icons.Map}
          onPress={() => {
            navigation.navigate("Map");
          }}
        />
        <IconButton
          roundedTop='md'
          w='25%'
          title='Post'
          icon={icons.Post}
          onPress={() => {
            setShowModal(true);
          }}
        />
        <IconButton
          w='33%'
          title='Event'
          icon={icons.Event}
          onPress={() => {
            navigation.navigate("Events");
          }}
        />
      </HStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
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
