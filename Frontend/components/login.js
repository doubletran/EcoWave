import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

class Login extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.logoContainer}>
              <View style={styles.logoContainer}>
                <Text style={styles.title}>Account Information</Text>
              </View>

              <View style={styles.infoContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter User name/Email"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCorrect={false}
                  onSubmitEditing={() => this.refs.txtPassword.focus()}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Enter Password"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  returnKeyType="go"
                  autoCorrect={false}
                  ref={"textPassword"}
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("SplashScreen")}>
                  <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default Login;