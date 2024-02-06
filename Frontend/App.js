import {NavigationContainer} from '@react-navigation/native';

import Navigator, {BottomNav} from './Navigator';

import { NativeBaseProvider } from 'native-base';

import { ClerkProvider } from '@clerk/clerk-expo'

import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

function App() {
  return (
    <ClerkProvider
    tokenCache={tokenCache}
    publishableKey='pk_test_ZXhvdGljLXN3aW5lLTMzLmNsZXJrLmFjY291bnRzLmRldiQ'
    >
    <NativeBaseProvider>
   
      <NavigationContainer>
     <Navigator/>
       
      <BottomNav />
      </NavigationContainer>
      
</NativeBaseProvider>
</ClerkProvider>
  );
}

export default App;
