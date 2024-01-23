import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';

import ReportProblem from './components/reportProblem.js'
import Splash from './components/splash.js'
import { ViewEvents, CreateEvent } from './components/events.js'
import Problems from './test/Problems.js';


function HomeScreen({navigation}) {
  // const problemsDB = ProblemsDBcreate({name: "sfd"});
  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Scren</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="View Events"
        onPress={() => navigation.navigate('Events')}
      />
      <Button
        title = 'Report a Problem'
        onPress={() => navigation.navigate('ReportProblem')}
      />
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
        <Stack.Screen name="Events" component={ViewEvents} />
        <Stack.Screen name="Create Event" component={CreateEvent} />
        <Stack.Screen name='ReportProblem' component={ReportProblem} />
      </Stack.Navigator>
      <Problems/>
    </NavigationContainer>
  );
}


export default App;
