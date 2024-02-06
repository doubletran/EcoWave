
// import { PostModalScreen } from './PostModalScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAV_ICONS as icons} from './config/style';

import { Center, IconButton } from 'native-base';
import { Button, HStack ,Text} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { PostModal } from './components/PostModal';
import EventScreen from './MainScreens/Event';
import MapScreen from './MainScreens/Map'
import LocateProblem from './components/LocateProblem';
import InputProblem from './components/InputProblem';
import CreateEvent from './components/events';
export const BottomNav=()=>{
  const navigation=useNavigation();
  return (
<HStack marginTop="auto" marginBottom="0">
  <IconButton w="33%" title="Map" icon={icons.Map}
 onPress={()=>{
  navigation.navigate("Map")
}}/>
  <IconButton w="33%" title="Post" icon={icons.Post}
  onPress={()=>{
    navigation.navigate("Post")
  }}/>
  <IconButton w="33%" title="Event" icon={icons.Event}
 onPress={()=>{
  navigation.navigate("Events")
}}/>
       {/* <Center h="40" w="33%" bg="primary.300" rounded="md" shadow={3} /> */}
   
    </HStack>
  //    <Center><Button
 
    
  )
}

 const Header=()=>{
  return(

  <>
<HStack >

  <IconButton alignItems="left" w="33%" title="Map" icon={icons.Updates}/>
  <IconButton alignItems="right" w="33%" title="Map" icon={icons.Profile}/>
       {/* <Center h="40" w="33%" bg="primary.300" rounded="md" shadow={3} /> */}
   
    </HStack>
  
  </>
  )
}

const RootStack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <RootStack.Navigator  screenOptions={{ headerTitle: (props) => <Header/>,
    headerBackVisible:false }}>
      <RootStack.Group>
        <RootStack.Screen name="Map" component={MapScreen} />
        <RootStack.Screen name="Events" component={EventScreen} />
        {/* <RootStack.Screen name="AddProblem" component={ReportStack}/> */}
        <RootStack.Screen name="AddEvent" component={CreateEvent}/>
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'transparentModal' }}>
        <RootStack.Screen name="Post" component={PostModal} />
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

      </RootStack.Group>
    </RootStack.Navigator>
  );
}
export function HeaderRightNext(disabled,handler){
  return   <IconButton isDisabled={disabled} icon={icons.Next}
  onPress={handler}/>
}