
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PostModalScreen } from './PostModalScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { nav } from '../config/icons';

import { Center, IconButton } from 'native-base';
import { Button, HStack ,Text} from 'native-base';
import { useNavigation } from '@react-navigation/native';


export const BottomNav=()=>{
  const navigation=useNavigation();
  return (
<HStack marginTop="auto" marginBottom="0">
  <IconButton w="33%" title="Map" icon={nav.Map}
 onPress={()=>{
  navigation.navigate("Map")
}}/>
  <IconButton w="33%" title="Post" icon={nav.Post}
  onPress={()=>{
    navigation.navigate("Post")
  }}/>
  <IconButton w="33%" title="Event" icon={nav.Event}
 onPress={()=>{
  navigation.navigate("Events")
}}/>
       {/* <Center h="40" w="33%" bg="primary.300" rounded="md" shadow={3} /> */}
   
    </HStack>
  //    <Center><Button
  //   variant="outline"
  //   onPress={() => {
  //     navigation.navigate("MyModal")
  //   }}
  // >
  //   Spot a problem
  // </Button>
  // <Button
  //   variant="outline"
  //   onPress={() => {
  //   }}
  // >
  //   Create an event
  // </Button>
  // </Center>
    
  )
}
const MapScreen=({navigation})=>{
  return (
  <>
  <Text>Map</Text>

 
</>
  )
}
// screenOptions={({ route }) => ({
//   tabBarIcon: ({ focused, color, size }) => {
//     let iconName;
//     if (route.name === 'Map') {
//       iconName = focused
//         ? 'ios-information-circle'
//         : 'ios-information-circle-outline';
//     } else if (route.name === 'Settings') {
//       iconName = focused ? 'ios-list' : 'ios-list-outline';
//     }
//     // You can return any component that you like here!
//     return <Ionicons name={iconName} size={size} color={color} />;
//   },
//   tabBarActiveTintColor: 'tomato',
//   tabBarInactiveTintColor: 'gray',
// })}
const EventScreen=()=>{
  return(<>
  <Text>Event </Text>
  </>)
}
 const Header=()=>{
  return(

  <>
<HStack >

  <IconButton alignItems="left" w="33%" title="Map" icon={nav.Updates}/>
  <IconButton alignItems="right" w="33%" title="Map" icon={nav.Profile}/>
       {/* <Center h="40" w="33%" bg="primary.300" rounded="md" shadow={3} /> */}
   
    </HStack>
  
  </>
  )
}
// export const BottomNav = ()=>{

//   return (

//         <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             return nav[route.name];
          
//             // You can return any component that you like here!
//           },
//           tabBarActiveTintColor: 'tomato',
//           tabBarInactiveTintColor: 'gray',
//         })}
//       >
//     <Tab.Screen name="Map" component={MapScreen}/>
//     <Tab.Group screenOptions={{presentation:'modal'}}>
//   <Tab.Screen name="Post" component={PostModalScreen} />
//   </Tab.Group>
//   <Tab.Screen name="Event" component={EventScreen}/>
//   {/* <Tab.Screen name="Home" component={HomeScreen}/> */}
//  </Tab.Navigator>
//   )
// }

const RootStack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <RootStack.Navigator  screenOptions={{ headerTitle: (props) => <Header/>,
    headerBackVisible:false }}>
      <RootStack.Group>
        <RootStack.Screen name="Map" component={MapScreen} />
        <RootStack.Screen name="Events" component={EventScreen} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'transparentModal' }}>
        <RootStack.Screen name="Post" component={PostModalScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}