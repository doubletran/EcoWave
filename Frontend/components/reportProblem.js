import React, { useState, useEffect, Component } from 'react';
import { View, TextInput,  Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MdCameraAlt } from "react-icons/md";
import MapView, { Marker } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageUploader from '../database/ImageUploader';
import { Center, Modal, FormControl , Input, Button, Icon, MoonIcon, Flex} from 'native-base';
import * as nb from 'native-base';
import { icons } from '../config/theme';
import { GrCamera } from 'react-icons/gr';
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
const Form =({navigation, route})=>{
  const image = route.params.image;
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const submitReport = () => {
    // Use Firebase to store the problem report data
    // Include userId, name, location, description, image URL, and timestemp when the problem was created
    db.create({
      title: title,
      descriptiont:description,
      longitude: 0,
      latitude: 1
    })
  };
  return(
    <View style={styles.container}>
      <ImagePicker/>
      <TextInput
        placeholder="Title"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      {/* <Button title="Pick Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Submit Report" onPress={submitReport} /> */}
    </View>
  )
}
// const ImageUploaderScreen=({navigation, route})=>{

//   return(
//     <>    
//     <Button title="Skip" onPress={()=> navigation.navigate("display-form")}   />
//     <Button title="Next" onPress={()=>navigation.navigate("display-form", {image: image})}/>
 
//     </>
//   )
// }
const ImageUploaderScreen = ({navigation})=>{
  const [showModal, setShowModal] = useState(true);
  const [action, setAction]= useState(false);
return (
  <>
  {action &&
     <ImageUploader action={action}/> }

    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
    
        <Modal.Header>Choose an action</Modal.Header>
        <Modal.Body>
        <nb.Stack mb="2.5" mt="1.5" direction={{
        base: "row",
        md: "row"
      }} space={2} 
      alignItems={{
        base: "center",
        md: "flex-start"}}>

        <Button variant="outline" onPress={() => {
              setShowModal(false);
             setAction("camera")
            }}>
              Launch Camera
                 {icons.camera}

            </Button>
                    <Button variant="outline" title="Camera" onPress={() => 
                    {setAction('gallery');
              setShowModal(false);
       
            }}>
              Launch Gallery
                 {icons.gallery}
            </Button>
            </nb.Stack>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal.Content>
    </Modal>

    </>
)
}


const Stack = createNativeStackNavigator();
export default function ReportProblem()  {
  return (
    <>
   
    <Stack.Navigator initialRouteName='choose-action'>
      {/* <Stack.Screen name="choose-action" component={ImageUploaderScreen}/> */}
          <Stack.Screen name="display-form" component={Form}/>
          {/* <Stack.Screen name="view-problem" component={Problem}/> */}
    </Stack.Navigator>
    </>
  )
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
});

