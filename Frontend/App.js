import {NavigationContainer} from '@react-navigation/native';

import Navigator, {BottomNav} from './Navigator';
import { extendTheme } from 'native-base';
import { NativeBaseProvider } from 'native-base';

function App() {
  const theme = extendTheme({

    components: {
      Text:{
        fontSize: "17"
      },
      Input:{
        _text:{
          fontSize: "17"
        }
      },
      Button: {
        h: "10",
        variants: {
          rounded: ({
            colorScheme
          }) => {
            return {
              bg: `${colorScheme}.500`,
              _hover: {
                bg: `${colorScheme}.600`
              },
              _pressed: {
                bg: `${colorScheme}.700`
              },
              _text: {
                color: `${colorScheme}.50`
              },
              rounded: "full"
            };
          }
        }
      }
    }
  });
  return (
    <NativeBaseProvider theme={theme}>
   
      <NavigationContainer>
     <Navigator/>
       
      <BottomNav />
      </NavigationContainer>
      
</NativeBaseProvider>
  );
}

export default App;
