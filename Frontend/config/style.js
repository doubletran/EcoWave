
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

export const NAV_ICONS={

  Map: <Ionicons name="globe-outline" size={30} color="blue"/>,
  Post: <Ionicons name="add" size={40} color="blue"/>,
  Event: <Ionicons name="calendar" size={30} color="blue"/>,
  Updates: <Ionicons name="notifications-outline" size={24} color="blue"  />,
  Profile: <Ionicons name="person-outline" size={24}  color="blue" />,
  Marker: <Ionicons name="location-sharp" size={24} color="blue"/>,

  Search: <Ionicons name="search" size={24} color="blue"/>,
  Dot: <Octicons name="dot-fill" size={24} color="red" />
}
export const INPUT_ICONS= {
  Event: <Ionicons name="calendar" size={24} color="black"/>,
  Marker: <FontAwesome name="map-marker" size={24} color="black" />,
  Flag: <Ionicons name="flag" size={24} color="black" />,
  Calendar: <Ionicons name="calendar" size={24} color="black"/>,
  Pencil: <Ionicons name="pencil" size={24} color="black" />,
  Email: <MaterialIcons name="alternate-email" size={24} color="black" />,
  Camera: <Ionicons name="camera-outline" m="auto" size={50} color="white" />,
  Close: <Ionicons name="close-circle-sharp" size={24} color="black" />,
  People: <Ionicons name="people-outline" size={24} color="black" />,
  Next:<MaterialIcons name="navigate-next" size={24} color="grey" />,
  Clear: <MaterialIcons name="clear" size={20} color="black" />,
  Back: <MaterialIcons name="arrow-back" size={24} color="black" />,
  Time: <Ionicons name="time" size={24} color="black" />
}

export const ICONS = {
  
}


 const Style={
  ViewBox: "cyan.200",
  inputBtn:{
 
    justifyContent: "space-between",
    color: "#080808",
    variant: "ghost",
    _text: {
      fontSize:"17",
      color: "grey"
    },
    width: "100%",
    minHeight: 16
  },
 
}
export default Style