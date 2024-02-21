import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, Image } from "react-native";
import { Center, Text, View, Box } from "native-base";
import { getDoc }from 'firebase/firestore';
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
import ViewProblem from "../components/ViewProblem";
import { Modal, TouchableWithoutFeedback } from "react-native";


const MapScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(false);
  const [search, setSearch] = useState(false);
  const [problems, setProblems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const mapRef =useRef();

  const fetchProblems = async () => {
    try {
      const updatedProblems = await getAll();
      setProblems(updatedProblems);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };
 
  useEffect(() => {
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

    fetchProblems();  

    const fetchNewProblemData = async () => {
      const anchor = route.params?.anchor;

      if (anchor && !selectedProblem) {
        try {
          const problemDoc = await getDoc(anchor);
          const problemData = problemDoc.data();

          // Focus on the newly created problem's location
          mapRef.current.animateToRegion({
            latitude: problemData.latitude,
            longitude: problemData.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }, 1000);
        } catch (error) {
          console.error("Error fetching problem data:", error);
        }
      }
    };

    const initialRegion = route.params?.anchor
    ? undefined // Let it focus on the new problem's location
    : DEFAULT_REGION._j;

    fetchNewProblemData();

    const intervalId = setInterval(fetchProblems, 1000);
    return () => clearInterval(intervalId);
  }, [search, route.params?.anchor, selectedProblem]);

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

  const ModalContent = ({ problem }) => (
    <View style={styles.container}>
      <Text style={styles.title}>{problem.title}</Text>
      <View>
        <WebView style={styles.image} source={{ uri: problem.imageUrl }} />
      </View>
      <Image style={styles.image} source={{ uri: problem.imageUrl }}></Image>
      <Text style={{ color: "blue"}}>{selectedProblem.description}</Text>
    </View>
  );
  

  const getMarkers = () => {
    return problems && problems.length > 0
      ? problems.map((problem) => (
          <Marker
            key={problem.id}
            coordinate={{
              latitude: problem.latitude,
              longitude: problem.longitude,
            }}
            onPress={() => {
              setSelectedProblem(problem);
              setModalVisible(true);
            }}
          />
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <ModalContent problem={selectedProblem} />
      </View>
      </TouchableWithoutFeedback>
      </Modal>

    </>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "white",
    padding: 16,
    width: 300,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "blue",
  },
  image: {
    width: 200,
    height: 200,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },  
  map: {
    //flex: 1,
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
