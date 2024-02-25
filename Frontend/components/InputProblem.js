import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Input,
  Image,
  HStack,
  ScrollView,
  Alert,
  Center,
  Pressable,
  Flex,
  FlatList,
} from "native-base";
import { Type } from "../config/style";
import { Header } from "./SelectProblemType";
import { Divider } from "native-base";
import { create } from "../database/problems";
import { ImageUploader } from "../database/ImageUploader";
import { SafeAreaView } from "react-native";
import { ICONS } from "../config/style";
import Style from "../config/style";
import { useAuth } from "@clerk/clerk-expo";
import { useToast } from "native-base";
import { StackActions } from "@react-navigation/native";
const InputProblem = ({
  navigation,
  route: {
    params: { types, longitude, latitude, address },
  },
}) => {
  const [name, setName] = useState("");
  const toast = useToast();

  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState([]);
  const [status, setStatus] = useState("disabled");
  const { userId } = useAuth();
  useEffect(() => {
    console.log(userId);
    console.log("At input" + navigation.getState()?.routes);
    const isFormValid = name && latitude && longitude && imageUri;
    const newStatus = isFormValid ? "enabled" : "disabled";
    setStatus(newStatus);

    navigation.setOptions({
      headerBackVisible: true,
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

    if (!name || !latitude || !longitude || !imageUri) {
      alert("Please fill in all fields before submitting.");
    } else {
      try {
        let images = []
      
        for (let image of imageUri){
          images.push(await ImageUploader.uploadImageAsync(image) )
        }
        create({
              title: name,
              latitude: latitude,
              longitude: longitude,
              description: description,
              images: images,
              userId: userId,
              types: Array.from(types),
            })
          .then((newProblem) => {
            toast.show({
              render: () => <Alert status='success'>SUCCESS</Alert>,
            });
            navigation.navigate("Problems", { anchor: newProblem.id });
          });
      } catch (error) {
        console.error("Error submitting problem:", error);
        alert("Error submitting problem. Please try again.");
        setStatus("disabled");
      }
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
    <Center px="4">
       <ScrollView SafeAreaView width='100%' pb="3" automaticallyAdjustKeyboardInsets>
        <Input
          {...Style.inputBtn}
          fontSize='2xl'
          placeholder='Title'
          value={name}
          size='2xl'
          onChangeText={setName}
        />
        <Center>
          <Box flexDirection='row'>
            <ScrollView horizontal>
              {imageUri &&
                imageUri.map((item) => {
                  return (
                    <Image
                      m='5'
                      style={{ width: 300, height: 300 }}
                      source={{ uri: item }}
                      alt='Selected Image'
                    />
                  );
                })}
              <Button
                justifyContent='center'
                alignItems='center'
                bg='#dcdcdc'
                m='5'
                width='300'
                h='300'
                onPress={pickImage}
              >
                {ICONS.Camera}
              </Button>
            </ScrollView>
          </Box>
        </Center>
       
          <Input
            multiline
            placeholder='Describe a problem (optional)'
            {...Style.inputBtn}
            h='100'
            value={description}
            onChangeText={setDescription}
          />
          <Button
            {...Style.inputBtn}
            leftIcon={ICONS.Marker}
            onPress={() => {
              const push = StackActions.push("Add location", {
                action: "New Problem",
                types: types,
              });
              navigation.dispatch(push);
            }}
          >
            {!address ? `${latitude}, ${longitude}` : address}
          </Button>
          <Button
            leftIcon={ICONS.Grid}
            onPress={() => {
              const push = StackActions.push("SelectProblemType", {
                types: types,
              });
              navigation.dispatch(push);
            }}
            {...Style.inputBtn}
          >
            Select types
            <Flex w='200' direction='row' wrap='wrap' overflow="scroll">
              {Array.from(types).map((item) => (
                <Type name={item} />
              ))}
            </Flex>
          </Button>
        </ScrollView>

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
      
    </Center>
  );
};

export default InputProblem;
