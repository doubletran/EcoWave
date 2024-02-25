import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Button, HStack, Image, Spacer, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import images from "./images";
const path = "./assets/";
const SYMBOL_SIZE = "xl";

export const ICONS = {
  Event: <Ionicons name='calendar' size={24} color='black' />,
  Marker: <FontAwesome name='map-marker' size={24} color='black' />,
  Flag: <Ionicons name='flag' size={24} color='black' />,
  Calendar: <Ionicons name='calendar' size={24} color='black' />,
  Pencil: <Ionicons name='pencil' size={24} color='black' />,
  Email: <MaterialIcons name='alternate-email' size={24} color='black' />,
  Camera: <Ionicons name='camera-outline' m='auto' size={50} color='white' />,
  Close: <Ionicons name='close-circle-sharp' size={24} color='black' />,
  People: <Ionicons name='people-outline' size={24} color='black' />,
  Next: <MaterialIcons name='navigate-next' size={24} color='grey' />,
  Clear: <MaterialIcons name='clear' size={20} color='black' />,
  Back: <MaterialIcons name='arrow-back' size={24} color='black' />,
  Time: <Ionicons name='time' size={24} color='black' />,
  Grid: <Ionicons name='grid' size={24} color='black' />,
  Map: <Ionicons name='globe-outline' size={30} color='blue' />,
  Post: <Ionicons name='add' size={40} color='blue' />,
  Event: <Ionicons name='calendar' size={30} color='blue' />,
  Updates: <Ionicons name='notifications-outline' size={24} color='blue' />,
  Profile: <Ionicons name='person-outline' size={24} color='blue' />,
  Marker: <Ionicons name='location-sharp' size={24} color='blue' />,
  Back: <MaterialIcons name='arrow-back' size={24} color='black' />,
  Trash: <Ionicons name='trash-outline' size={24} color='black' />,
  Search: <Ionicons name='search' size={24} color='blue' />,
  Calendar: <Ionicons name='calendar-outline' size={24} color='black' />,
  Comment: <Ionicons name='chatbox-ellipses-outline' size={24} color='black' />,
  Check: <Ionicons name='checkmark-done' size={24} color='cyan' />,
  Inc: <Ionicons name='add' size={24} color='black' />,
  Dec: <Ionicons name='remove' size={24} color='blue' />,
  Me: <MaterialCommunityIcons name="calendar-account" size={24} color="black" />
};

export const Type = ( {name, size = "xs"}) => {
  // console.log("image" + require(`${path}cleanup.png`))
  return (
    <>
      <HStack bgColor='cyan.300' {...Style.Float1}>
      <Image
      size={size}
      alt={name}
      source={images[name]}
    /> 
        <Text ml="1" fontWeight="bold">{name}</Text>
      </HStack>
    </>
  );
};
export const PressableStyle = {
  focus: {
    bgColor: "cyan.400",
  },
  blur: {
    bgColor: "primary.100",
  },
};
export const PRESSABLE_ICONS = {
  Events: {
    blur: <Ionicons name='calendar-outline' size={24} color='blue' />,
    focus: <Ionicons name='calendar' size={24} color='blue' />,
  },
  Problems: {
    blur: (
      <MaterialCommunityIcons
        name='map-marker-alert-outline'
        size={24}
        color='blue'
      />
    ),
    focus: (
      <MaterialCommunityIcons name='map-marker-alert' size={24} color='blue' />
    ),
  },
  Flag: {
    blur: <Ionicons name='flag-outline' size={20} color='red' />,
    focus: <Ionicons name='flag-sharp' size={20} color='red' />,
  },
};



export const PROBLEM_SYMBOL = {
  "Illegal dumping": (
    <Image
      size={SYMBOL_SIZE}
      alt='illegal dumping'
      source={require("./assets/illegal-dumping.png")}
    />
  ),
  "Invasive species": (
    <Image
      size={SYMBOL_SIZE}
      alt='invasive species'
      source={require("./assets/invasive-species-web.webp")}
    />
  ),
  Litter: (
    <Image
      size={SYMBOL_SIZE}
      alt='Litter'
      source={require("./assets/litter.png")}
    />
  ),
  Degradation: (
    <Image
      size={SYMBOL_SIZE}
      alt='Degradation'
      source={require("./assets/erosion.png")}
    />
  ),
};
export const EVENT_SYMBOL = {
  Protest: (
    <Image
      size={SYMBOL_SIZE}
      alt='protest'
      source={require(`${path}protest.png`)}
    />
  ),
  Cleanup: (
    <Image
      size={SYMBOL_SIZE}
      alt='cleanup'
      source={require(`${path}cleanup.png`)}
    />
  ),
  Fundraising: (
    <Image
      size={SYMBOL_SIZE}
      alt='fundraising'
      source={require(`${path}fundraising.png`)}
    />
  ),
  Lecture: (
    <Image
      size={SYMBOL_SIZE}
      alt='Lecture'
      source={require(`${path}lecture.png`)}
    />
  ),
  Planting: (
    <Image
      size={SYMBOL_SIZE}
      alt='planting'
      source={require("./assets/planting.png")}
    />
  ),
  "Site maintenance": (
    <Image
      size={SYMBOL_SIZE}
      alt='Site maintenance'
      source={require(`${path}maintenance.png`)}
    />
  ),
  "Invasive species removal": (
    <Image
      size={SYMBOL_SIZE}
      alt='Invasive species removal'
      source={require("./assets/invasive-removal.png")}
    />
  ),
};

const Style = {
  ViewBox: "muted.100",
  Float1: {
    padding: 2,
    borderRadius: 15,
    margin: 1,
  },

  inputBtn: {
    
    justifyContent: "space-between",
    color: "#080808",
    padding: 2,
    borderRadius: 20,
    margin: 1,
    bg: "#faffff",
    variant: "ghost",
    fontSize: "lg",
    fontSize: "lg",
    color: "grey",
    _text: {
      fontSize: "lg",
      color: "grey",
    },
    width: "100%",
    minHeight: 16,
  },
};
export default Style;
