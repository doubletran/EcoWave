import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';

import ReportProblem from './components/reportProblem.js'
import Splash from './components/splash.js'
import Problems from './test/Problems.js';
import CreateEvent from './components/events.js'

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ImageUploader from './database/ImageUploader.js';
function HomeScreen({ navigation }) {
  //const problemsDB = ProblemsDBcreate({name: "sfd"});
  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Scren</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Report a Problem"
        onPress={() => navigation.navigate('ReportProblem')}
      />
      <Button
        title = 'Create an Event'
        onPress = {() => navigation.navigate('Create an Event')}
      />
            <Button
        title="Upload Image"
        onPress={() => navigation.navigate('Image Picker')}
      />
            <MapView
        style={styles.map}
        provider = {PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      </MapView>

    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
  
    <NavigationContainer>

      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={
    HomeScreen} />
        <Stack.Screen name="Details" component={Splash} />
        <Stack.Screen name='ReportProblem' component={ReportProblem} />
        <Stack.Screen name='Create an Event' component={CreateEvent} />
        <Stack.Screen name="Image Picker" component={ImageUploader}/>
      </Stack.Navigator>

    </NavigationContainer>
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
  map:{
    width:100,
    height: 100
  }
});

export default App;
