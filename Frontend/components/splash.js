import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Splash({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details,again"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
    );
}