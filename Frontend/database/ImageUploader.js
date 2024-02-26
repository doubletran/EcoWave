import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, NativeBaseProvider, Center, Input } from "native-base";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ScrollView, Box, Button } from "native-base";
import { ICONS } from "../config/style";

const pickImage = async (setImageUri) => {

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [5, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      let images = [];

      result.assets.forEach((image) => images.push(image.uri));
      // const selectedImageUri = result.assets[0].uri;
      console.log("Selected image URI:", images);
      setImageUri(images);
    }
  } catch (error) {
    console.error("Error picking image:", error);
  }
};

const uploadImageAsync = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const randomNum = Math.floor(Math.random() * 1000000);
  const imageName = `image_${randomNum}`;

  const fileRef = ref(getStorage(), imageName);
  const result = await uploadBytes(fileRef, blob);

  blob.close();

  return await getDownloadURL(fileRef);
};
const retrieveImage = async (name) => {
  const fileRef = ref(getStorage(), name);
  return await getDownloadURL(fileRef);
};

const ImageUploader = {
  pickImage,
  uploadImageAsync,
};

const ImagesDeck = ({ setImageUri, images = [], addible = false, size=3}) => {
  const dimension = {width: size*100, height: size*100}
  return (
    <Box flexDirection='row' height={300}>
      <ScrollView horizontal>
        {images &&
          images.map((item) => {
            return (
              <Image
              key={item}
                m='5'
                style={dimension}
                source={{ uri: item }}
                alt='Selected Image'
              />
            );
          })}
        {addible && <Button
          justifyContent='center'
          alignItems='center'
          bg='#dcdcdc'
          m='5'
         {...dimension}
          onPress={()=> pickImage(setImageUri)}
        >
          {ICONS.Camera}
        </Button>
}
      </ScrollView>
    </Box>
  );
};

export { ImageUploader, ImagesDeck };
