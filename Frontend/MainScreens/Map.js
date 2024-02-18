import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, Image } from "react-native";
import { Center, Text, View } from "native-base";

import { Dimensions } from "react-native";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Header, BottomNav } from "../Navigator";
import { createRef, useEffect, useRef, useState } from "react";
import { getAll } from "../database/problems";
import { FileSystem } from "expo-file-system";
import WebView from "react-native-webview";
import { NAV_ICONS } from "../config/style";
import MapSearchbox from "../components/MapSearchbox";
import { DEFAULT_REGION, getRegionByCoords } from "../config/lib";
const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(false);
  const [search, setSearch] = useState(false);
  const [problems, setProblems] = useState([]);
  const mapRef =useRef();
 
  useEffect(() => {
    console.log(location)
    if (!search) {
      navigation.setOptions({
        headerShown: true,
        headerTitle: () => <Header onSearch={() => setSearch(true)} />,
      });
    } else {
      navigation.setOptions({
        headerTitle: () => (
          <MapSearchbox
          handleReturn={(region)=>{
            setTimeout(()=>{
          
              mapRef.current.animateToRegion(region, 10)
              setLocation(region)
              setSearch(false)
            }, 1)

          }}
        />
        ),
      });
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
  }, [search]);

  const handleMapPress = (event) => {
    // Extract latitude and longitude from the pressed location
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude: latitude, longitude: longitude });
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
            icon={NAV_ICONS.Dot}
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.title}>{problem.title}</Text>
                <View>
                  <WebView
                    style={styles.image}
                    source={{ uri: problem.imageUrl }}
                  />
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
        provider={PROVIDER_GOOGLE}
        initialRegion={DEFAULT_REGION._j}
        onPress={() => {
          setSearch(false);
        }}
        onMap
      >
        {getMarkers()}
      </MapView>

      <BottomNav />
    </>
  );
};
const styles = StyleSheet.create({
  calloutContainer: {
    borderRadius: 100,
    backgroundColor: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
  map: {
    //flex: 1,
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
