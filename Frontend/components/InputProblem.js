import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Input,
  Image,
  ScrollView,
  Alert,
  Center,
  Pressable,
  Flex
} from "native-base";
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
  const [imageUri, setImageUri] = useState(null);
  const [status, setStatus] = useState("disabled");
  const { userId } = useAuth();
  useEffect(() => {
    console.log(userId);
    console.log("At input" + navigation.getState()?.routes)
    const isFormValid =
      name && latitude && longitude && imageUri ;
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
          userId: userId,
          types: Array.from (types)
        });

        toast.show({
          render: () => <Alert status='success'>SUCCESS</Alert>,
        });
        navigation.navigate("Map", { anchor: newProblem });
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
      <Center px='4'>
        <Input
          {...Style.inputBtn}
          fontSize='2xl'
          placeholder='Title'
          value={name}

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
                ICONS.Camera
              )}
            </Pressable>
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
          onPress={() =>{
            const push = StackActions.push("Add location", {action: "New Problem", types: types});
            navigation.dispatch(push)
            }
          }
        >
          {!address ? `${latitude}, ${longitude}` : address}
        </Button>
        <Button
          leftIcon={ICONS.Grid}
          onPress={() => {
            const push = StackActions.push("SelectProblemType", {types: types});
            navigation.dispatch(push)
          }}
          {...Style.inputBtn}
        >
          Select types
          <Flex w='100%' direction='row' wrap='wrap'>
            {Array.from(types).map((item) => (
              <>
                <Box bgColor='cyan.400' {...Style.Float1}>
                  {item}
                </Box>
              </>
            ))}
          </Flex>
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
      </Center>
    </ScrollView>
  );
};

export default InputProblem;
