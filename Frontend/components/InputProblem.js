import React, { useState, useEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { create } from '../database/problems';
import { HeaderRightNext } from '../Navigator';
import { Box,Button, Input } from 'native-base';
import ImageUploader from '../database/ImageUploader';

 const InputProblem= ({ navigation, route}) => {
  const [status, setStatus] = React.useState('disabled')
  React.useEffect(()=>{
    navigation.setOptions({
      headerShown: true,
      headerTitle: true,

    })
  })
  React.useEffect(()=>{
    navigation.setOptions({
      headerRight: () => (
        <Button isDisabled={status=="disabled"} isLoading={status=="loading"} isLoadingText="Submitting">
       Submit
      </Button>
      )

    })
  }, [status])
  const [name, setName] = useState('');
  const { latitude, longitude } =route.params;
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const submitReport = async () => {
    setStatus("loading")
    // Use Firebase to store the problem report data
    // Include userId, name, location, description, image URL, and timestemp when the problem was created
    if (!name || !location.latitude  || !location.longitude || !description || !image) {
      alert('Please fill in all fields before submitting.');
    } try {
  
      await create({
        title: name,
        latitude: latitude,
        longitude: longitude,
        description: description,
      });
      alert('Problem submitted successfully!');
      setStatus(true)
    } catch (error){
      console.error('Error submitting problem:', error);
      alert('Error submitting problem. Please try again.');
    }

    setName('');
    setDescription('');
    setImage(null);
  };

  return (
    <>
    <Box>
    <Input 
     placeholder="Title"
     value={name}
     variant="underlined"
     size="2xl"
     onChangeText={setName}/>
     <Input placeholder='Describe a problem...'
     size="md"
     variant="unstyled"
        value={description}
        onChangeText={setDescription}
      />

  </Box>
  <Button onPress={ImageUploader} >Pick Image</Button>

  </>
  );
}
export default InputProblem;