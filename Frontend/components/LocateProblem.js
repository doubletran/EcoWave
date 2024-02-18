import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { NAV_ICONS } from "../config/style";
import React from "react";
import {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import { HeaderRightNext } from "../Navigator";
import { Button, Center } from "native-base";
import { useRef } from "react";
import MapSearchbox from "./MapSearchbox";
import { DEFAULT_REGION } from "../config/lib";
const LocateProblem=({navigation, route})=>{
  const [location, setLocation] = React.useState(DEFAULT_REGION._j);
  const [showCoord, setShowCoord] = React.useState(`${location.latitude}, ${location.longitude}`)
  const mapRef =useRef();
  React.useEffect(()=>{

    navigation.setOptions({
      headerBackVisible: true,
      headerShown: true,
      headerTitle: () => (
        <MapSearchbox
        placeholder={showCoord}
          handleReturn={(region)=>{
    
            mapRef.current.animateToRegion(region, 100)
            setLocation(region)
            setShowCoord(false)
          }}
        />),
      headerRight: () => (
        <Button marginTop="0" isDisabled={!location}
        onPress ={()=>{
          console.log("Navigate"  + JSON.stringify(location))
          navigation.navigate(route.params.action, {...location})
        }}
         >Next</Button>
      )
    })
  
  
  }, [location])
  
  const handleMapPress = (event) => {
    // Extract latitude and longitude from the pressed location
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude: latitude, longitude: longitude});
    setShowCoord(`${location.latitude}, ${location.longitude}`)
    // navigation.setOptions({
    //  title: `${latitude}, ${longitude}`,
    //  })
 
  };
  return (
  <>

         <MapView
         ref={mapRef}
        style={styles.map}
        onPress={handleMapPress}
        provider = {PROVIDER_GOOGLE}
        initialRegion={DEFAULT_REGION._j}
      > 
        {location && <Marker coordinate={location} />}
      </MapView>

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