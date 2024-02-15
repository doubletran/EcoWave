// import { PostModalScreen } from './PostModalScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAV_ICONS as icons } from "./config/style";

import { Container, Heading, IconButton } from "native-base";
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
import { ProfileScreen } from "./components/Profile";
import SignInAndUp from "./components/SignInAndUp";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(255, 45, 85)",
    background: "rgb(255, 255, 255)",
  },
};

export const Header = ({ onSearch }) => {
  const nav = useNavigation();

  return (
    <>
      <HStack w='95%' justifyContent='space-between'>
        <Heading>ecoWave</Heading>
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
export default function Navigator() {
  
  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator
        screenOptions={{
          headerTitle: (props) => <Header />,
          headerBackVisible: false,
        }}
      >
        <RootStack.Group>
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
          <RootStack.Screen name='View an event' component={ViewEvent} options={{
            headerTitle: "View an Event",
            headerBackVisible: true,
          }}/>
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
