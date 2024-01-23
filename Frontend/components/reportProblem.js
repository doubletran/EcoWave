import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const ReportProblem = ({ userId }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Request permission to access the device's image library
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('camera roll permissions required to make this work!!1!');
      }

    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    if (locationStatus !== 'granted') {
      alert('Location permissions required to display the map!');
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

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleMapPress = (event) => {
    // Extract latitude and longitude from the pressed location
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  };

  const submitReport = () => {
    // Use Firebase to store the problem report data
    // Include userId, name, location, description, image URL, and timestemp when the problem was created
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        provider = {PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      </MapView>
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
  mapContainer: {
    height: 200, 
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default ReportProblem;