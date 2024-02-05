import {NavigationContainer} from '@react-navigation/native';
import Navigator, {BottomNav} from './components/Navigator.js';

import { NativeBaseProvider } from 'native-base';

function App() {
  return (
    <NativeBaseProvider>
   
      <NavigationContainer>
     <Navigator/>
       
      <BottomNav />
      </NavigationContainer>
      
</NativeBaseProvider>
  );
}
export default App;
