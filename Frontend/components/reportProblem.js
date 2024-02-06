// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Button, Image, StyleSheet, Dimensions } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import { create } from '../database/problems';

// import { Box, IconButton, Input } from 'native-base';
// import { ICONS } from '../config/style';
// const ReportProblem = ({ userId }) => {
// import { MdCameraAlt } from "react-icons/md";
// import MapView, { Marker } from 'react-native-maps';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ImageUploader from '../database/ImageUploader';
// import { Center, Modal, FormControl , Input, Button, Icon, MoonIcon, Flex} from 'native-base';
// import * as nb from 'native-base';
// import { icons } from '../config/theme';
// import { GrCamera } from 'react-icons/gr';
// import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
// const Form =({navigation, route})=>{
//   const image = route.params.image;
//   const [name, setName] = useState('');
//   const [location, setLocation] = useState(null);
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     // Request permission to access the device's image library
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         alert('camera roll permissions required to make this work!!1!');
//       }

//     const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
//     if (locationStatus !== 'granted') {
//       alert('Location permissions required to display the map!');
//     }
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

//   const handleMapPress = (event) => {
//     // Extract latitude and longitude from the pressed location
//     const { latitude, longitude } = event.nativeEvent.coordinate;

//     setLocation({ latitude: latitude, longitude: longitude});
//     console.log(location);
//   };

//   const submitReport = async () => {
//     // Use Firebase to store the problem report data
//     // Include userId, name, location, description, image URL, and timestemp when the problem was created
//     if (!name || !location.latitude  || !location.longitude || !description || !image) {
//       alert('Please fill in all fields before submitting.');
//     } try {
  
//       await create({
//         title: name,
//         latitude: location.latitude,
//         longitude: location.longitude,
//         description: description,
//       });
//       alert('Problem submitted successfully!');
//     } catch (error){
//       console.error('Error submitting problem:', error);
//       alert('Error submitting problem. Please try again.');
//     }

//     setName('');
//     setLocation(null);
//     setDescription('');
//     setImage(null);
//   };
//   return(
//     <View style={styles.container}>
      
//       <MapView
//         style={styles.map}
//         onPress={handleMapPress}
//         provider = {PROVIDER_GOOGLE}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       > 
//         {location && <Marker coordinate={location} />}
//       </MapView>

//       <TextInput
//         placeholder="Problem name"
//         value={name}
//         onChangeText={setName}
//       />
//         <TextInput
//         placeholder="Location"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         placeholder=""
//         value={description}
//         onChangeText={setDescription}
//       />
//       {/* <Button title="Pick Image" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={styles.image} />}
//       <Button title="Submit Report" onPress={submitReport} /> */}
//     </View>
//   )
// }
// // const ImageUploaderScreen=({navigation, route})=>{

// //   return(
// //     <>    
// //     <Button title="Skip" onPress={()=> navigation.navigate("display-form")}   />
// //     <Button title="Next" onPress={()=>navigation.navigate("display-form", {image: image})}/>
 
// //     </>
// //   )
// // }
// const ImageUploaderScreen = ({navigation})=>{
//   const [showModal, setShowModal] = useState(true);
//   const [action, setAction]= useState(false);
// return (
//   <>
//   {action &&
//      <ImageUploader action={action}/> }

//     <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
//       <Modal.Content maxWidth="400px">
    
//         <Modal.Header>Choose an action</Modal.Header>
//         <Modal.Body>
//         <nb.Stack mb="2.5" mt="1.5" direction={{
//         base: "row",
//         md: "row"
//       }} space={2} 
//       alignItems={{
//         base: "center",
//         md: "flex-start"}}>

//         <Button variant="outline" onPress={() => {
//               setShowModal(false);
//              setAction("camera")
//             }}>
//               Launch Camera
//                  {icons.camera}

//             </Button>
//                     <Button variant="outline" title="Camera" onPress={() => 
//                     {setAction('gallery');
//               setShowModal(false);
       
//             }}>
//               Launch Gallery
//                  {icons.gallery}
//             </Button>
//             </nb.Stack>
//         </Modal.Body>
//         <Modal.Footer>

//         </Modal.Footer>
//       </Modal.Content>
//     </Modal>

//     </>
// )
// }


// const Stack = createNativeStackNavigator();
// export default function ReportProblem()  {
//   return (
//     <>
   
//     <Stack.Navigator initialRouteName='choose-action'>
//       {/* <Stack.Screen name="choose-action" component={ImageUploaderScreen}/> */}
//           <Stack.Screen name="display-form" component={Form}/>
//           {/* <Stack.Screen name="view-problem" component={Problem}/> */}
//     </Stack.Navigator>
//     </>
//   )
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginVertical: 10,
//   },
//   map: {
//     //flex: 1,
//     ...StyleSheet.absoluteFillObject,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height
//   },
// });

