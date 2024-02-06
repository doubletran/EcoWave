import {NavigationContainer} from '@react-navigation/native';

import Navigator, {BottomNav} from './Navigator';

import { NativeBaseProvider } from 'native-base';

import { ClerkProvider } from '@clerk/clerk-expo'

function App() {
  return (
    <ClerkProvider publishableKey='pk_test_ZXhvdGljLXN3aW5lLTMzLmNsZXJrLmFjY291bnRzLmRldiQ'>
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
