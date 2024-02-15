import Navigator from "./Navigator";
import { extendTheme } from "native-base";
import { NativeBaseProvider } from "native-base";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import SignInAndUp from "./components/SignInAndUp";

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
  const theme = extendTheme({
    components: {
      Text: {
        fontSize: "17",
      },
      Input: {
        sizes: "lg",
        baseStyle: {
          p: "10",
        },
        _text: {
          fontSize: "17",
        },
      },
      Button: {
        h: "10",
        variants: {
          rounded: ({ colorScheme }) => {
            return {
              bg: `${colorScheme}.500`,
              _hover: {
                bg: `${colorScheme}.600`,
              },
              _pressed: {
                bg: `${colorScheme}.700`,
              },
              _text: {
                color: `${colorScheme}.50`,
              },
              rounded: "full",
            };
          },
        },
      },
    },
  });
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey='pk_test_ZXhvdGljLXN3aW5lLTMzLmNsZXJrLmFjY291bnRzLmRldiQ'
    >
      <NativeBaseProvider theme={theme}>
      <SignedIn>
        <Navigator />
      </SignedIn>
      <SignedOut>
        <SignInAndUp/>
      </SignedOut>
      </NativeBaseProvider>
    </ClerkProvider>
  );
}

export default App;
