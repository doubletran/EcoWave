import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
import {Center} from 'native-base'; 
import { BottomNav } from "../components/PostModal"
import { Dimensions } from "react-native";
import {PROVIDER_GOOGLE} from 'react-native-maps'

const MapScreen=({navigation}) => {
  const handleMapPress = (event) => {
    // Extract latitude and longitude from the pressed location
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setLocation({ latitude: latitude, longitude: longitude});
    console.log(location);
  };
  return (
  <>
     <MapView
        style={styles.map}
        provider = {PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onMap
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