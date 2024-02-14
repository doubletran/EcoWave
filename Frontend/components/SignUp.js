import * as React from "react";

import { useSignUp } from "@clerk/clerk-expo";
import {
  Box,
  FormControl,
  Input,
  Button,
  HStack,
  Center,
  Container,
} from "native-base";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  React.useEffect(() => {});
  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <Center>
      {!pendingVerification ? (
        <>
          <Box p='4' m='auto' w='100%'>
            <FormControl>
              <FormControl.Label>First Name</FormControl.Label>
              <Input onChangeText={(firstName) => setFirstName(firstName)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Last Name</FormControl.Label>
              <Input onChangeText={(lastName) => setLastName(lastName)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input
                onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type='password'
                onChangeText={(password) => setPassword(password)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input type='password' />
            </FormControl>
          </Box>

          <Button m='auto' onPress={onSignUpPress}>
            Sign up
          </Button>
          <Button variant='link'>
            Already have an account? Sign in instead
          </Button>
        </>
      ) : (
        <>
          <Box p='4' m='auto' w='100%'>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input onChangeText={(code) => setCode(code)} />
            </FormControl>
          </Box>

          <Button onPress={onPressVerify}>Verify</Button>
        </>
      )}
    </Center>
  );
}
