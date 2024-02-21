import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Input,
  Image,
  ScrollView,
  Alert,
  Center,
  Pressable
} from "native-base";
import { Divider } from "native-base";
import { create } from "../database/problems";
import { ImageUploader } from "../database/ImageUploader";
import { SafeAreaView } from "react-native";
import { INPUT_ICONS } from "../config/style";
import Style from "../config/style";
import { useAuth } from "@clerk/clerk-expo";
import { useToast } from 'native-base';
const InputProblem = ({ navigation, route:{params: location}}) => {
  const [name, setName] = useState("");
  const toast = useToast()
  const { latitude, longitude, address } = location;
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [status, setStatus] = useState("disabled");
  const {userId}  = useAuth()
  useEffect(() => {
    console.log(userId)
    const isFormValid =
      name && latitude && longitude && description && imageUri;
    const newStatus = isFormValid ? "enabled" : "disabled";
    setStatus(newStatus);

    navigation.setOptions({
      
      headerBackVisible:true,
      headerRight: () => (
        <Button
          isDisabled={status === "disabled"}
          isLoading={status === "loading"}
          isLoadingText='Submitting'
          onPress={submitReport}
        >
          Submit
        </Button>
      ),
    });
  }, [name, latitude, longitude, description, imageUri, status]);

  const submitReport = async () => {
    setStatus("loading");

    if (!name || !latitude || !longitude || !description || !imageUri) {
      alert("Please fill in all fields before submitting.");
    } else {
      try {
        const imageUrl = imageUri
          ? await ImageUploader.uploadImageAsync(imageUri)
          : null;

        const newProblem = await create({
          title: name,
          latitude: latitude,
          longitude: longitude,
          description: description,
          imageUrl: imageUrl,
          userId: userId
          
        });

        toast.show({
          render: ()=>
          <Alert status="success">SUCCESS
          </Alert> 

          

        })
        navigation.navigate("Map", {anchor: newProblem })
        

      } catch (error) {
        console.error("Error submitting problem:", error);
        alert("Error submitting problem. Please try again.");
        setStatus("disabled");
      }

      setName("");
      setDescription("");
      setImageUri(null);
    }
  };

  const pickImage = async () => {
    try {
      await ImageUploader.pickImage(setImageUri);
      console.log("ImageUri", imageUri);
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets>
      <Center bgColor="yellow.100">
        <Box safeArea  w='90%'>
          <Input
            placeholder='Title'
            value={name}
            variant='underlined'
            size='2xl'
            onChangeText={setName}
          />
          <Center>
            <Box p='10' w='400' h='400'>
              <Pressable
                justifyContent='center'
                alignItems='center'
                bg='#dcdcdc'
                w='100%'
                h='100%'
                onPress={pickImage}
              >
                {imageUri ? (
                  <Image
                    key={imageUri}
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: imageUri }}
                    alt='Selected Image'
                  />
                ) : (
                  INPUT_ICONS.Camera
                )}
              </Pressable>
            </Box>
          </Center>
          <Input
            placeholder='Describe a problem...'
            h='100'
            value={description}
            onChangeText={setDescription}
          />
          <Button {...Style.inputBtn}  leftIcon={INPUT_ICONS.Calendar}>
            Create an event
          </Button>
          <Divider thickness='2' />
          <Button
            {...Style.inputBtn}
            leftIcon={INPUT_ICONS.Marker}
            onPress={() =>
              navigation.navigate("Set location", {
                action: "Report a problem",
              })
            }
          >
           {!address? `${latitude}, ${longitude}`: address}
          </Button>

          {/* <SafeAreaView>
            <GooglePlacesAutocomplete
              placeholder='Pickup'
              minLength={2}
              onFail={(err) => console.error(err)}
              fetchDetails={true}
              listViewDisplayed='auto'
              onPress={(data, details = true) => {
                console.log("data: ", data, details);
              }}
              query={{
                key: apiKey,
                language: "en",
              }}
            />
          </SafeAreaView> */}
        </Box>
      </Center>
    </ScrollView>
  );
};

export default InputProblem;
