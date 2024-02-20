import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { NAV_ICONS } from "../config/style";
import React from "react";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { HeaderRightNext } from "../Navigator";
import { Button, Box, HStack } from "native-base";
import { useRef } from "react";
import MapSearchbox from "./MapSearchbox";
import { DEFAULT_REGION } from "../config/lib";
import { MAP_API_KEY } from "../App";

const queryEstAddressByCoords = async ({ latitude, longitude }) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAP_API_KEY}`;
  console.log("fetching " + url);
  let response = await fetch(url);

  if (response.status == 200) {
    response = await response.json();
    console.log("GET response: " + response)
    const { formatted_address, geometry } = response.results[0];
    console.log(formatted_address)
    return formatted_address;
  }
  return ''
};
const Locate = ({ navigation, route }) => {
  const COORD_ENABLED = route.params.action != "New Event"
  const [address, setAddress] = React.useState('')
  const [location, setLocation] = React.useState(DEFAULT_REGION._j);
  const mapRef = useRef();

  React.useEffect(() => {
        //If event, manually fetch address
    if (location && !COORD_ENABLED) {
      queryEstAddressByCoords(location)
      .then((res)=> setAddress(res))
    }
    
  }, [])
  React.useEffect(() => {
    console.log(address)
    console.log(location)
    navigation.setOptions({
      headerTitle: () => (
        <MapSearchbox
          goBack={() => navigation.goBack()}
          address={address}
          coords={location}
          handleReturn={(region) => {
            mapRef.current.animateToRegion(region, 100);
            console.log(region)
            setLocation(region);
          }}
        />
      ),

      headerRight: () => (
        <Button
          marginTop='0'
          isDisabled={!location}
          onPress={() => {
            console.log("Navigate" + JSON.stringify(location));
            navigation.navigate(route.params.action, Object.assign({address: address}, location));
          }}
        >
          Next
        </Button>
      ),
      headerBackVisible: true,
    });
  }, [location, address]);

  const handleMapPress = (event) => {
    // Extract latitude and longitude from the pressed location
    if (COORD_ENABLED)
    {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setLocation({ latitude: latitude, longitude: longitude });
    }

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
        provider={PROVIDER_GOOGLE}
        initialRegion={DEFAULT_REGION._j}
      >
        {location && <Marker coordinate={location} />}
      </MapView>
    </>
  );
};
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
export default Locate;
