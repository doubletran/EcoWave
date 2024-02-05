import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, Image, StyleSheet, Dimensions } from 'react-native';
import { create } from '../database/events';
import { PermissionsAndroid } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export function ViewEvents({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Events</Text>
      <Button
        title="Create Event"
        onPress={() => navigation.navigate('Create Event')}
      />
    </View>
  );
}

export default function CreateEvent({ navigation }) {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    // Request permission to access the device's location
    let getLocationPerms = async () => {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(async (request) => {
        if (request) {
          console.log("We have location permissions.")
          return
        }
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'Example App',
              'message': 'Example App access to your location '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location")
          } else {
            console.log("location permission denied")
          }
        } catch (err) {
          console.warn(err)
        }
      })
    }
    getLocationPerms()
  }, []);

  const handleMapPress = (event) => {
    // Extract latitude and longitude from the pressed location
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setLocation({ latitude: latitude, longitude: longitude});
    console.log(location);
  };

  const submitReport = () => {
    create({ title: name, description, latitude: location.latitude, longtitude: location.longitude, time: "undefined"})
    setName('')
    setDescription('')
    setLocation({latitude: 0, longitude: 0})
    setDate('')
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        provider = {PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 44.638,
          longitude: -124.052,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      > 
        {location && <Marker coordinate={location} />}
      </MapView>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Date and Time"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Text>
        Selected location: {location.latitude}, {location.longitude}
      </Text>
      <Button title="Create Event" onPress={submitReport} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  map: {
    //flex: 1,
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});