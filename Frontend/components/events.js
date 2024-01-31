import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, Image, StyleSheet, Dimensions } from 'react-native';
import { create } from '../database/events';

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

  const submitReport = () => {
    create({ title: name, description, latitude: 0, longtitude: 0, time: "2am"})
  };

  return (
    <View style={styles.container}>
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