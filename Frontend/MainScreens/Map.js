import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
import {Center, Text, Input} from 'native-base'; 
import { BottomNav } from "../components/PostModal"
import { Dimensions } from "react-native";
import {PROVIDER_GOOGLE} from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Header } from "../Navigator";
import {createRef, useEffect, useRef, useState} from "react";
import { DEFAULT } from "../config/lib";
export const MapSearchbox = ({onReturn})=>{
  const ref = useRef()
  useEffect(() => {
    setTimeout(()=>{
      ref.current.focus() //setTimeout to wait for ref to be assigned before call focus
    }, 10)
  }, []);
  return (
    <>
        <GooglePlacesAutocomplete
        ref={ref}
      placeholder='Search'
      fetchDetails={true}
      autoFocus={true}
      onPress={onReturn}
      query={{
        key: 'AIzaSyC2M542GAMZIBZsWxkiVaW6Vc3yAr7JEOs',
        language: 'en',
      }}
    />
    </>
  )

}

const MapScreen=({navigation})=>{
  const [location, setLocation ]= useState(DEFAULT.location)
  const [search, setSearch] = useState(false)
  const mapRef = createRef()
  useEffect(()=>{
    if (!search){
      navigation.setOptions({
        headerShown: true,
        headerTitle: ()=> <Header onSearch={()=> setSearch(true)}/>
      })

    }
    else {
      navigation.setOptions({
        headerTitle: ()=> <MapSearchbox 
        onReturn={(data, details) =>{

  
         const latitude= details.geometry.location.lat;
         const longitude = details.geometry.location.lng;
       mapRef.current.animateToRegion({
          latitude: latitude
          , longitude: longitude,
               latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
         }, 1000)
         setLocation(details.geometry.location)
         setSearch(false);
        }}
         />
      })
    }

  }, [search])
  // useEffect(()=>{
  //   navigation.setOptions({
  //     headerTitle: ()=> MapSearchbox
  //   })
  // })
  const handleMapPress = (event) => {
    // Extract latitude and longitude from the pressed location
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude: latitude, longitude: longitude});
    console.log(location);
  };
  return (
  <>
     <MapView
     ref={mapRef}
        style={styles.map}
        provider = {PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={()=>{
          setSearch(false)
        }}
      > 
      </MapView>
      <BottomNav/>

 
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
export default MapScreen