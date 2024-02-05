import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import {Image, NativeBaseProvider, Center ,Input} from "native-base";
// import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// SOurce: https://github.com/expo/examples/blob/master/with-firebase-storage-upload/App.js
const ImageUploader = (props)=> {


  useEffect(() => {
    // Request permission to access the device's image library
    (async () => {
      if (props.action == "gallery"){
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('camera roll permissions required to make this work!!1!');
        }
        ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [5, 3],
          quality: 1,
    
        })
        .then((result)=>{
          if (!result.canceled){
        
             uploadImageAsync(result.assets[0].uri).then(uploaded=>{
              console.log(uploaded)
              props.setImage(uploaded);
             })
      }})
    }
     else if (props.action == "camera"){
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('camera roll permissions required to make this work!!1!');
      }
      ImagePicker.launchCameraAsync()
      .then((result)=>{

      })
  
    }
     

    })();
  }, []);
  


  return (
  
    <NativeBaseProvider>

      <Input mx="3" placeholder="Input" w="100%" />
      <Center>
      <Image source={{
      uri: "https://wallpaperaccess.com/full/317501.jpg"
    }} alt="Alternate Text" size="xl" />
</Center>
    </NativeBaseProvider>


  )


}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
 // console.log(uri);
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

  const fileRef = ref(getStorage(), "images" );
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}
export default ImageUploader;