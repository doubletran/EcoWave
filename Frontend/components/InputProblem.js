import React, { useState, useEffect } from 'react';
import { Button, Box, Input, Image } from 'native-base';
import { create } from '../database/problems';
import { ImageUploader } from '../database/ImageUploader';
import { View } from 'react-native';

const InputProblem = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const { latitude, longitude } = route.params;
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [status, setStatus] = useState('disabled');

  useEffect(() => {
  const isFormValid = name && latitude && longitude && description && imageUri;
  const newStatus = isFormValid ? 'enabled' : 'disabled';
  setStatus(newStatus);

    navigation.setOptions({
      headerRight: () => (
        <Button
          isDisabled={status === 'disabled'}
          isLoading={status === 'loading'}
          isLoadingText="Submitting"
          onPress={submitReport}
        >
          Submit
        </Button>
      ),
    });

  }, [name, latitude, longitude, description, imageUri, status]);

  const submitReport = async () => {
    setStatus('loading');

    if (!name || !latitude || !longitude || !description || !imageUri) {
      alert('Please fill in all fields before submitting.');
    } else {
      try {
      const imageUrl = imageUri ? await ImageUploader.uploadImageAsync(imageUri) : null;
      
        await create({
          title: name,
          latitude: latitude,
          longitude: longitude,
          description: description,
          imageUrl: imageUrl,
        });

        alert('Problem submitted successfully!');
        setStatus('disabled');
      } catch (error) {
        console.error('Error submitting problem:', error);
        alert('Error submitting problem. Please try again.');
        setStatus('disabled');
      }

      // setName('');
      // setDescription('');
      // setImageUri(null);
    }

  };

  const pickImage = async () =>{
    try {
      await ImageUploader.pickImage(setImageUri);
      console.log("ImageUri", imageUri);
    } catch (error) {
      console.error("Error picking image:", error);
    }
  }

  return (
    <Box>
      <Input
        placeholder="Title"
        value={name}
        variant="underlined"
        size="2xl"
        onChangeText={setName}
      />
      <Input
        placeholder="Describe a problem..."
        size="md"
        variant="unstyled"
        value={description}
        onChangeText={setDescription}
      />
      <Button onPress={pickImage}>Pick Image</Button>
      {imageUri && <Image key={imageUri} style={{ width: '100%', height: 200 }} source={{ uri: imageUri }} alt="Selected Image" />}
    </Box>
  );
};

export default InputProblem;