import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  Switch,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

import storage from "@react-native-firebase/storage";

import { Button as ButtonSend } from "../../components/Button";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";

import {
  Container,
  Content,
  Progress,
  styles,
  Transferred,
  EmptyPhotoContainer,
} from "./styles";
import AuthContext from "../../contexts/AuthContext";
import UploadContext from "../../contexts/UploadContext";
import { PhotoSend } from "../../components/PhotoSend";
import { ButtonTakePhoto } from "../../components/ButtonTakePhoto";

export function Upload() {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [startCamera, setStartCamera] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const { user } = useContext(AuthContext);
  const { addItem } = useContext(UploadContext);
  const [image, setImage] = useState("");
  const [bytesTransferred, setBytesTransferred] = useState("");
  const [progress, setProgress] = useState("0");

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function closeCamera() {
    setStartCamera(false);
  }

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

  async function handlePickPhoto() {
    const options = { aspect: [4, 4], quality: 1 };
    const data = await await cameraRef.current.takePictureAsync(options);
    setImage(data.uri);
    setStartCamera(false);
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

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Container>
      <Header title="Upload de Fotos" />

      {startCamera && (
        <View style={styles.container}>
          <Camera
            style={styles.camera}
            ratio="16:9"
            type={type}
            ref={cameraRef}
            onCameraReady={onCameraReady}
          >
            {/* <View style={styles.boxCamera}>
              <EmptyPhotoContainer />
            </View> */}
            <View style={styles.buttonContainer}>
              <View style={styles.buttonViewContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setStartCamera(false);
                    setImage("");
                  }}
                >
                  <Text style={styles.buttonBack}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handlePickPhoto();
                  }}
                ></TouchableOpacity>
                <TouchableOpacity onPress={() => {}}></TouchableOpacity>
              </View>
            </View>
          </Camera>
        </View>
      )}

      <Content>
        {!startCamera && (
          <>
            <ButtonTakePhoto
              title="Tirar foto"
              onPress={() => {
                setStartCamera(true);
                setImage("");
              }}
            />
            <PhotoSend uri={image} onPress={handlePickImage} />
          </>
        )}
        {!!image && (
          <>
            <ButtonSend title="Enviar" onPress={handleUpload} />

            <Progress>{progress}%</Progress>

            <Transferred>{bytesTransferred}</Transferred>
          </>
        )}
      </Content>
    </Container>
  );
}
