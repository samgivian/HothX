import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "./style";
import { getStorage, ref, storage } from "firebase/storage";
import { initializeApp } from "firebase/app";

export default function HomeScreen() {
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

  const [image, setImage] = useState(null);
  const storage = getStorage();

  const [uploading, setUploading] = useState(false);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200 }}
          onPress={() => alert(image)}
        />
      )}
      <Button title="Upload Image" />

      <TouchableOpacity
        //={styles.submitButton}
        title="Go to Details"
        onPress={() => {
          //  const mountainsRef = ref(storage, 'mountains.jpg');
          alert(image.uri);
          const task = storage().ref(filename).putFile(uploadUri);
          // this.submitDataBase();
          //navigation.navigate("Details")
        }}
      >
        <Text style={{ color: "black", fontWeight: "bold" }}> Submit </Text>
      </TouchableOpacity>

      <Text>Result</Text>
    </View>
  );
}
