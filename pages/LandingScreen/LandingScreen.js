import * as React from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "./style";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function LandingScreen({ navigation }) {
  // TODO: Replace the following with your app's Firebase project configuration
  // See: https://firebase.google.com/docs/web/learn-more#config-object
  const firebaseConfig = {
    apiKey: "AIzaSyDKaiK2UWx9kXFVTt0LShsIL0DObleIzcw",
    authDomain: "hackhill-b5c62.firebaseapp.com",
    databaseURL: "https://hackhill-b5c62-default-rtdb.firebaseio.com",
    projectId: "hackhill-b5c62",
    storageBucket: "hackhill-b5c62.appspot.com",
    messagingSenderId: "1011777628241",
    appId: "1:1011777628241:web:0107c13c2be3fe57be3070",
    measurementId: "G-44KH16YWY2",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(app);
  const auth = getAuth();

  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  //const [number, onChangePassword] = React.useState("");

  state = {
    email: "",
    password: "",
  };
  handleEmail = (text) => {
    this.setState({ email: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };
  submitDataBase = () => {
    alert("Submit to database");
    set(ref(database, "users/"), {
      username: "ASd",
      email: "as",
    });
  };

  login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //alert("signed in");
        navigation.navigate("Details");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Password or username is incorrect!");
      });
  };
  signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Succesfuly Signed up!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <View style={styles.container}>
      {/*
      <ImageBackground
        source={require("./grading.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >*/}
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: "center",
          fontFamily: "Didot",
        }}
      >
        <Image style={styles.logo} source={require("./exam.png")} />
        <Text
          style={{
            fontFamily: "Noteworthy-Bold",
            fontSize: 32,
            fontWeight: "bold",
            color: "white",
          }}
        >
          The Grader{" "}
        </Text>
      </View>
      {/*
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
        */}
      <View style={{ width: "100%", marginTop: 20, alignItems: "center" }}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="white"
          autoCapitalize="none"
          onChangeText={onChangeEmail}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="white"
          autoCapitalize="none"
          onChangeText={onChangePassword}
        />
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Forgot Password?
        </Text>
      </View>
      <View style={{ width: "100%", marginTop: 20, alignItems: "center" }}>
        <TouchableOpacity
          style={styles.loginButton}
          title="Go to Details"
          onPress={() => {
            this.login();
            // navigation.navigate("Details");
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}> Login </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signupButton}
          title="Go to Details"
          onPress={() => {
            this.signUp();
            // this.submitDataBase();
            //navigation.navigate("Details")
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}> Sign Up </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LandingScreen;
