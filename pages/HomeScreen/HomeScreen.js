import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";

import { initializeApp } from "firebase/app";
import { firebase } from "../../firebaseConfig";
import { getDatabase, set, ref, onValue } from "firebase/database";

export default function HomeScreen() {
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

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [result_str, setResult_str] = useState("");

  submitDataBase = () => {
    alert("Submit to database");
    set(ref(database, "users/"), {
      username: "asdasdasdasd",
      email: "asdasdas",
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };
    console.log(source);
    setImage(source);
  };

  readOutput = () => {
    this.interval = setInterval(() => {
      const answerRef = ref(database, "results/answer");
      const resultRef = ref(database, "results/result_str");
      onValue(answerRef, (snapshot) => {
        const data = snapshot.val();
        if (data != "") {
          setAnswer(data);
        }
      });
      onValue(resultRef, (snapshot) => {
        const data = snapshot.val();
        if (data != "") {
          setResult_str(data);
          set(ref(database, "results/"), {
            answer: "",
            result_str: "",
          });
        }
        //alert(data);
      });
    }, 1000);
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    var refImage = firebase.storage().ref().child(filename).put(blob);

    try {
      urlImage = await refImage;

      outputURL =
        "https://firebasestorage.googleapis.com/v0/b/hackhill-b5c62.appspot.com/o/" +
        urlImage.metadata.fullPath.toString() +
        "?alt=media&token";
      //alert(outputURL);
      set(ref(database, "imageURL"), {
        URL: outputURL,
      });
      this.readOutput();
    } catch (e) {
      console.error(e);
    }

    setUploading(false);
    /*
    set(ref(database, "imageURL/"), {
      URL: urlSubmit,
    });
    */
    Alert.alert("Photo uploaded!!!");

    setImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}

        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <Text style={styles.buttonText}>Upload image</Text>
        </TouchableOpacity>
      </View>
      <Text>Answer:{answer}</Text>
      <Text>Result:{result_str}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: "#507dbc",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: "center",
  },
});
