import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { NAV_ICONS } from "../config/style";
import React from "react";
import {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import { HeaderRightNext } from "../Navigator";
import { Button, Box, HStack } from "native-base";
import { useRef } from "react";
import MapSearchbox from "./MapSearchbox";
import { DEFAULT_REGION } from "../config/lib";
import { MAP_API_KEY } from "../App";
const LocateProblem=({navigation, route})=>{
  const [location, setLocation] = React.useState(DEFAULT_REGION._j);
  const [showCoord, setShowCoord] = React.useState(`${location.latitude}, ${location.longitude}`)
  const mapRef =useRef();
  React.useEffect(()=>{
    //If event, manually fetch address 
    if (showCoord && route.params.action == "New Event"){
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${MAP_API_KEY}`
      console.log("fetching" + url)
      fetch(url)
      .then((res)=> {
        res.json()
      })
      .then((res)=>{
        console.log(res)
        console.log(JSON.stringify(res.results))
        // console.log(results[0]);
        // const {formatted_address, geometry} = results[0]
        // setLocation({address:formatted_address, latitude: geometry.locatioo.lat, longitude: geometry.location.lng})})
      })
      .catch(error=>{
        console.log(error)
      })

    }

    navigation.setOptions({

      headerTitle: () => (
    
       <MapSearchbox
       goBack={()=> navigation.goBack()}
        placeholder={showCoord}
          handleReturn={(region)=>{
    
            mapRef.current.animateToRegion(region, 100)
            setLocation(region)
            setShowCoord(false)
          }}
    />
        ),
     
   

      headerRight: () => (
        <Button marginTop="0" isDisabled={!location}
        onPress ={()=>{
          console.log("Navigate"  + JSON.stringify(location))
          navigation.navigate(route.params.action, {...location})
        }}
         >Next</Button>
      ),
      headerBackVisible: true
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