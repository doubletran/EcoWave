import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, Image } from "react-native";
import {
  Center,
  Text,
  View,
  Box,
  Button,
  Modal,
  ScrollView,
  HStack,
} from "native-base";
import BottomNav from "../BottomNav";
import { getDoc } from "firebase/firestore";
import { Dimensions } from "react-native";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Header } from "../Navigator";
import React, { createRef, useEffect, useRef, useState } from "react";
import { get, getAll } from "../database/problems";
import { FileSystem } from "expo-file-system";

import Style, { ICONS } from "../config/style";
import MapSearchbox from "../components/MapSearchbox";
import { DEFAULT_REGION, getRegionByCoords } from "../config/lib";
import ViewProblem from "../components/ViewProblem";
import { getEventsByProblem } from "../database/events";
import { ListableEvent } from "./EventsScreen";
import { ImagesDeck } from "../database/ImageUploader";

const MapScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(false);
  const [search, setSearch] = useState(false);
  const [problems, setProblems] = useState([]);
  const [linkedEvents, setLinkedEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const mapRef = useRef();

  const fetchProblems = async () => {
    try {
      const updatedProblems = await getAll();
      setProblems(updatedProblems);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };
  React.useEffect(() => {
    if (selectedProblem) {

      (async () => {

        const events = await getEventsByProblem(selectedProblem.id);
        console.log(events);
        setLinkedEvents(events);
        // setModalVisible(true)
      })();
    }
  }, [selectedProblem]);
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
            handleReturn={(region) => {
              setTimeout(() => {
                mapRef.current.animateToRegion(region, 10);
                setLocation(region);
                setSearch(false);
              }, 1);
            }}
          />
        ),
      });
    }

    fetchProblems();

    const fetchNewProblemData = async () => {
      const anchor = route.params.anchor;
    
      if (anchor) {
        try {
          const problemData = await get(anchor);

          // Focus on the newly created problem's location
          mapRef.current.animateToRegion(
            {
              latitude: problemData.latitude,
              longitude: problemData.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            },
            1000
          );
         setSelectedProblem(problemData)
         setModalVisible(true)
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
  }, [search, route.params?.anchor]);

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

  const ModalContent = ({ id, title, images = [], description, type, flag }) => (
    <>
      <Modal.Content bgColor='white'>
        <Modal.Header>
          <HStack justifyContent='space-between'>
            <Box w="60%">
              {title}
              <Text fontSize='sm'>{description}</Text>
            </Box>
            <Button  position="absolute" right="0" leftIcon={ICONS.Check} >
              Mark as solved
            </Button>
            <Box></Box>
          </HStack>
        </Modal.Header>
        <Modal.Body>
          <ImagesDeck images={images}/>
        <HStack justifyContent='space-around' m='2'>
          <Button variant='ghost' leftIcon={ICONS.Flag}>
            {JSON.stringify(flag)}
          </Button>
          <Button variant='ghost' leftIcon={ICONS.Comment}>
            12
          </Button>
          <Button variant='ghost' leftIcon={ICONS.People}>
            22
          </Button>
          <Button
            variant='ghost'
            bgColor={Style.ViewBox}
            leftIcon={ICONS.Calendar}
          >
            {linkedEvents.length}
          </Button>
        </HStack>
        {/* <Text fontWeight="bold">Linked Events</Text> */}

        <Center>{linkedEvents.map((event) => ListableEvent(event))}</Center>
        </Modal.Body>
  
          <Button 
            {...Style.inputBtn} 
            onPress={() =>{   setModalVisible(false)
              navigation.navigate("SelectEventType", { problemId: id })
            }
            }
            leftIcon={ICONS.Event}
          >
            Create an event to solve this problem
          </Button>

      </Modal.Content>
    </>
  );

  const getMarkers = () => {
    return problems && problems.length > 0
      ? problems.map((problem) => {
          const { id, location } = problem;

          //  if (problem.longitude== null) console.log(problem.id, problem.longitude)
          return (
            <Marker
              key={id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              onPress={() => {
                setSelectedProblem(problem);
                setModalVisible(true);
              }}
            />
          );
        })
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
      >
        {getMarkers()}
      </MapView>

      <BottomNav atProblems={true} />

      <Modal size="full" isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <ModalContent {...selectedProblem} />
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  image: {
    minWidth: 300,
    minHeight: 300,
  },

  map: {
    //flex: 1,
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
