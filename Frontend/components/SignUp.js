import * as React from "react";

import { useSignUp } from "@clerk/clerk-expo";
import {
  Box,
  FormControl,
  Input,
  Button,
} from "native-base";

export default function SignUpScreen({ handleSignin }) {
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
    <>
      {!pendingVerification ? (
        <>
          <Box w='100%' py='5' px='10'>
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

          <Button onPress={onSignUpPress}>
            Sign Up
          </Button>
          <Button variant='link' onPress={handleSignin}>
            Already have an account? Sign in instead
          </Button>
        </>
      ) : (
        <>
              <Box w='100%' py='5' px='10'>
            <FormControl>
              <FormControl.Label>Enter code to verify email</FormControl.Label>
              <Input value={code} onChangeText={(code) => setCode(code)} />
            </FormControl>
          </Box>

          <Button onPress={onPressVerify}>Verify</Button>
        </>
      )}
    </>
  );
}
