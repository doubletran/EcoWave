
// import { PostModalScreen } from './PostModalScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAV_ICONS as icons} from './config/style';

import {  IconButton } from 'native-base';
import { Button, HStack, Text } from 'native-base';
import { NavigationContainer, DefaultTheme, useNavigation} from '@react-navigation/native';
import {EventScreen} from './MainScreens/Event';
import MapScreen from './MainScreens/Map'
import LocateProblem from './components/LocateProblem';
import InputProblem from './components/InputProblem';
import CreateEvent from './components/CreateEvent';
import { ViewEvent } from './components/ViewEvent';
import { ProfileScreen } from './components/Profile';
import SignInAndUp from './components/SignInAndUp'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(255, 255, 255)'
  },
};


 export const Header=({onSearch})=>{
  const nav = useNavigation()

  return(

  <>
<HStack >
  <Text>Ecowave</Text>
  <IconButton icon={icons.Search} onPress={onSearch}/>
  <IconButton alignItems="right" w="33%" title="Map" icon={icons.Profile} onPress={()=>{nav.navigate("Profile")}}/>
       {/* <Center h="40" w="33%" bg="primary.300" rounded="md" shadow={3} /> */}
   
    </HStack>
  
  </>
  )
}

const RootStack = createNativeStackNavigator();
export default function Navigator() {
  return (
    <NavigationContainer theme={theme}>
    <RootStack.Navigator  screenOptions={{ headerTitle: (props) => <Header/>,
    headerBackVisible:false }}>
      <RootStack.Group>
        <RootStack.Screen name="Map" component={MapScreen} />
        <RootStack.Screen name="Events" component={EventScreen} />
        <RootStack.Screen name="Profile" component={ProfileScreen} />
        <RootStack.Screen name="New Event" component={CreateEvent}/>
        <RootStack.Screen name="Sign In and Up" component={SignInAndUp}/>
      </RootStack.Group>

      <RootStack.Group  screenOptions={{ 
    headerBackVisible:true }}>
      <RootStack.Screen name="Set location" 
        component={LocateProblem}
         options={({ navigation, route }) => ({
          // Add a placeholder button without the `onPress` to avoid flicker
          title: "Set location"
        })} />
        <RootStack.Screen name="Report a problem"
        component={InputProblem}/>
        <RootStack.Screen  name="View an event" component={ViewEvent}
      />
      </RootStack.Group>
    </RootStack.Navigator>

    </NavigationContainer>
  );
}
export function HeaderRight( title, disabled,handler){
  return   <Button title={title} isDisabled={disabled} icon={icons.Next}
  onPress={handler}/>
}