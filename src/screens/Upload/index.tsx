import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";

import { Container, Content, Progress, Transferred } from "./styles";
import { Alert } from "react-native";
import AuthContext from "../../contexts/AuthContext";
import UploadContext from "../../contexts/UploadContext";

export function Upload() {
  const { user } = useContext(AuthContext);
  const { addItem } = useContext(UploadContext);
  const [image, setImage] = useState("");
  const [bytesTransferred, setBytesTransferred] = useState("");
  const [progress, setProgress] = useState("0");

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  async function handleUpload() {
    const fileName = new Date().getTime();
    const reference = storage().ref(`images/${user.uid}/${fileName}`);

    const uploadTask = reference.putFile(image);

    uploadTask.on("state_changed", (taskSnapshot) => {
      const percent = (
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100
      ).toFixed(0);

      setProgress(percent);

      setBytesTransferred(
        `${taskSnapshot.bytesTransferred} transferido de ${taskSnapshot.totalBytes}`
      );
    });

    uploadTask.then(async () => {
      const imageUrl = await reference.getDownloadURL();
      addItem({ name: fileName, url: imageUrl, path: reference.fullPath });
      setProgress("0");
      setBytesTransferred("");
      setImage("");
      Alert.alert("Enviado com sucesso.");
    });
  }

  return (
    <Container>
      <Header title="Upload de Fotos" />

      <Content>
        <Photo uri={image} onPress={handlePickImage} />

        <Button title="Fazer upload" onPress={handleUpload} />

        <Progress>{progress}%</Progress>

        <Transferred>{bytesTransferred}</Transferred>
      </Content>
    </Container>
  );
}
