import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { NAV_ICONS } from "../config/style";
import React from "react";
import {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import { HeaderRightNext } from "../Navigator";
import { Button } from "native-base";

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

import SignInAndUp from './SignInAndUp';

const LocateProblem=({navigation})=>{
  const [location, setLocation] = React.useState(false);
  React.useEffect(()=>{
    navigation.setOptions({
      headerShown: true,
      headerTitle: true,
      headerRight: () => (
        <Button  isDisabled={!location}
        onPress ={()=>{
          navigation.navigate("Report a problem", {latitude: location.latitude, longitude: location.longitude})
        }}
         >Next</Button>
      )
    })
  }, [location])
  const handleMapPress = (event) => {
    // Extract latitude and longitude from the pressed location
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude: latitude, longitude: longitude});
    console.log(location);
    navigation.setOptions({
     title: `${latitude}, ${longitude}`,
     })
 
  };
  return (
  <>
  <SignedIn>
         <MapView
        style={styles.map}
        onPress={handleMapPress}
        provider = {PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      > 
        {location && <Marker coordinate={location} />}
      </MapView>
      </SignedIn>
      <SignedOut>
        <SignInAndUp/>
      </SignedOut>
</>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  map: {
    //flex: 1,
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});
export default LocateProblem