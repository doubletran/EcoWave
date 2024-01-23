import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './components/splash.js'
import { ViewEvents, CreateEvent } from './components/events.js'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="View Events"
        onPress={() => navigation.navigate('Events')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={Splash} />
        <Stack.Screen name="Events" component={ViewEvents} />
        <Stack.Screen name="Create Event" component={CreateEvent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
