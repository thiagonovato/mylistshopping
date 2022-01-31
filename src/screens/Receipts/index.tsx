import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

import { Container, PhotoInfo } from "./styles";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { File, FileProps } from "../../components/File";
import UploadContext from "../../contexts/UploadContext";

export function Receipts() {
  const { listAll, lists, handleDelete } = useContext(UploadContext);
  const [photoSelected, setPhotoSelected] = useState("");
  const [photoInfo, setPhotoInfo] = useState("");

  async function handleShowImage({ url, created_at }: FileProps) {
    setPhotoSelected(url);
    {
      created_at &&
        setPhotoInfo(`Enviado em ${created_at.toDate().toString()}`);
    }
  }

  async function handleDeleteImage({ id, path }: FileProps) {
    Alert.alert("Atenção", `Deseja realmente excluir?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          handleDelete(id, path)
            .catch(() => {
              Alert.alert("Erro ao excluir. Tente novamente.");
            })
            .finally(() => {
              setPhotoInfo("");
              setPhotoSelected("");
            });
        },
      },
    ]);
  }

  useEffect(() => {
    listAll();
  }, []);

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={photoSelected} />

      <PhotoInfo>{photoInfo}</PhotoInfo>

      <FlatList
        data={lists}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item)}
            onDelete={() => {
              handleDeleteImage(item);
            }}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", padding: 24 }}
      />
    </Container>
  );
}
