import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, Image} from "react-native";
import {Center, Text, View  } from 'native-base'; 
import { BottomNav } from "../components/PostModal"
import { Dimensions } from "react-native";
import {PROVIDER_GOOGLE} from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Header } from "../Navigator";
import {createRef, useEffect, useRef, useState} from "react";
import { DEFAULT } from "../config/lib";
import { getAll } from "../database/problems"
import { FileSystem } from 'expo-file-system';
import {Svg, Image as ImageSvg} from 'react-native-svg';
import WebView from "react-native-webview";


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
  const [problems, setProblems] = useState([]);

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
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }, 1000)
        setLocation(details.geometry.location)
        setSearch(false);
        }}
         />
      })
    }

    const fetchProblems = async () => {
      try {
        const updatedProblems = await getAll();
        setProblems(updatedProblems);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();

    const intervalId = setInterval(fetchProblems, 1000);
    return () => clearInterval(intervalId);

  }, [search])

  const handleMapPress = (event) => {
    // Extract latitude and longitude from the pressed location
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude: latitude, longitude: longitude});
    console.log(location);
  };

  const downloadImage = async (url, fileName) => {
    const fileUri = FileSystem.documentDirectory + fileName;
    const { exists } = await FileSystem.getInfoAsync(fileUri);
    if (!exists) {
      await FileSystem.downloadAsync(url, fileUri);
    }
    return fileUri;
  };

  const getMarkers = () => {
    return problems && problems.length > 0
      ? problems.map((problem) => (
        <Marker
          key={problem.id}
          title={problem.title}
          coordinate={{
            latitude: problem.latitude,
            longitude: problem.longitude,
          }}
          description={problem.description}
        > 
          <Callout>
            <View style={styles.calloutContainer}>
            <Text style={styles.title}>{problem.title}</Text>
            <View>
      <WebView style={ styles.image } source={{ uri: problem.imageUrl }} />
        </View>
              <Text>{problem.description}</Text>
              </View>
          </Callout>
        </Marker>
      ))
      : null; 
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
        onMap
      > 

        {getMarkers()}
      </MapView>
      <BottomNav/> 
  </>
  )
}
const styles = StyleSheet.create({
  calloutContainer: {
    borderRadius: 100,
    backgroundColor: 'white', 
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,  
  },
  image: {
    width: 100,
    height: 100,
  },
  map: {
    //flex: 1,
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});

export default MapScreen