import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export function ViewEvents({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Events</Text>
      <Button
        title="Create Event"
        onPress={() => navigation.navigate('CreateEvent')}
      />
    </View>
  );
}

export function CreateEvent({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Create an Event</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}