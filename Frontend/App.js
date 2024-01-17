import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './components/splash.js'

import Problems from './test/Problems.js';
function HomeScreen({ navigation }) {
  //const problemsDB = ProblemsDBcreate({name: "sfd"});
  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Scren</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
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
      </Stack.Navigator>
      <Problems/>
    </NavigationContainer>
  );
}


export default App;
