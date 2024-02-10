import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, NativeBaseProvider, Center, Input } from "native-base";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const pickImage = async (setImageUri) => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const selectedImageUri = result.assets[0].uri;
      console.log('Selected image URI:', selectedImageUri);
      setImageUri(selectedImageUri);
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

  const fileRef = ref(getStorage(), "images");
  const result = await uploadBytes(fileRef, blob);

  blob.close();

  return await getDownloadURL(fileRef);
};

const ImageUploader = {
  pickImage,
  uploadImageAsync,
};

const ImageUploaderComponent = () => {
  const [imageUri, setImageUri] = useState(null);

  return (
    <NativeBaseProvider>
      <Input mx="3" placeholder="Input" w="100%" />
      <Center>
        <Image source={{ uri: imageUri }} alt="Alternate Text" size="xl" />
      </Center>
    </NativeBaseProvider>
  );
};

export { ImageUploader, ImageUploaderComponent };
