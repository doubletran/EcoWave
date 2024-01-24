import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';

const ReportProblem = ({ userId }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Request permission to access the device's image library
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('camera roll permissions required to make this work!!1!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

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

  return (
    <View style={styles.container}>
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
      <Button title="Pick Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Submit Report" onPress={submitReport} />
    </View>
  );
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

export default ReportProblem;