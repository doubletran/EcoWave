import React from "react";
import { useSignIn } from "@clerk/clerk-expo";
import {
  Box,
  FormControl,
  Input,
  Button,
  HStack,
  Center,
  VStack,
} from "native-base";
export default function SignInScreen({ handleSignup }) {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Center w='100%'>
      <Box w="100%" py="5" px='10'>
        <FormControl>
          <FormControl.Label>Email ID</FormControl.Label>
          <Input
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          ></Input>
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input onChangeText={(password) => setPassword(password)} />
        </FormControl>
      </Box>
      <Button w='20%' onPress={onSignInPress}>
        Sign In
      </Button>

      <Button variant='link' onPress={handleSignup}>
        Not a user? Create an account
      </Button>
    </Center>
  );
}
