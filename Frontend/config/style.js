
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


export const NAV_ICONS={

  Map: <Ionicons name="globe-outline" size={30} color="black"/>,
  Post: <Ionicons name="add" size={30} color="black"/>,
  Event: <Ionicons name="calendar" size={30} color="black"/>,
  Updates: <Ionicons name="notifications-outline" size={24} color="black"  />,
  Profile: <Ionicons name="person-outline" size={24}  color="black" />,
  Marker: <Ionicons name="location-sharp" size={24} color="black"/>,
  Next: <Ionicons name="arrow-forward" size={24} color="black"/>
}
export const INPUT_ICONS= {
  Event: <Ionicons name="calendar" size={24} color="black"/>,
  Marker: <FontAwesome name="map-marker" size={24} color="black" />,
  Flag: <Ionicons name="flag" size={24} color="red" />,
  Calendar: <Ionicons name="calendar" size={24} color="black"/>,
  Pencil: <Ionicons name="pencil" size={24} color="black" />,
  Email: <MaterialIcons name="alternate-email" size={24} color="black" />,
  Camera: <Ionicons name="camera-outline" m="auto" size={50} color="white" />,
  Close: <Ionicons name="close-circle-sharp" size={24} color="black" />,
  People: <Ionicons name="people-outline" size={24} color="black" />
  

}
export const ICONS = {
  
}

 const Style={
  inputBtn:{
    justifyContent: "left",
    color: "#080808",
    variant: "ghost",
    _text: {
      fontSize:"17",
      color:  "#080808",
    },
    h: "16"
  },
 
}
export default Style