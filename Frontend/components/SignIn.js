import React from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { Box, FormControl, Input, Button, HStack, Center } from "native-base";
export default function SignInScreen() {
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
    <Center>
      <Box w='80%'>
        <FormControl>
          <FormControl.Label>Email ID</FormControl.Label>
          <Input
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input onChangeText={(password) => setPassword(password)} />
        </FormControl>
      </Box>
      <Button onPress={onSignInPress}>Sign In</Button>

      <Button variant='link' onPress={onSignInPress}>
        Not a user? Create an account
      </Button>
    </Center>
  );
}
