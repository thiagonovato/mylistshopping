import React, { createContext, useContext, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import AuthContext from "./AuthContext";
import { Alert } from "react-native";
import { FileProps } from "../components/File";

interface UploadContextData {
  listAll(): Promise<any>;
  lists: FileProps[];
  addItem({ name, url }: any): Promise<void>;
  handleDelete(id: string, path: string): Promise<void>;
  setSelectedList(id: {}): void;
  selectedList: {};
  loadingList: boolean;
}

const UploadContext = createContext<UploadContextData>({} as UploadContextData);

export const UploadProvider: React.FC = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [lists, setLists] = useState<FileProps[]>([]);
  const [selectedList, setSelectedList] = useState<{}>({});
  const [loadingList, setLoadingList] = useState<boolean>(false);

  async function listAll(): Promise<any> {
    const subscribe = firestore()
      .collection("user")
      .doc(user.uid)
      .collection("uploads")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as FileProps[];

        setLists(data);
        setLoadingList(true);
      });
    return () => subscribe();
  }

  async function addItem({ name, url, path }: any): Promise<void> {
    await firestore()
      .collection("user")
      .doc(user.uid)
      .collection("uploads")
      .add({
        name,
        url,
        path,
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .catch(() => {
        Alert.alert("Erro ao fazer upload");
      });
  }

  async function handleDelete(id: string, path: string): Promise<void> {
    storage()
      .ref(path)
      .delete()
      .then(() => {
        firestore()
          .collection("user")
          .doc(user.uid)
          .collection("uploads")
          .doc(id)
          .delete();
      })
      .catch(() => {
        Alert.alert("", "Erro ao deletar o arquivo");
      });
  }

  return (
    <UploadContext.Provider
      value={{
        listAll,
        lists,
        addItem,
        handleDelete,
        setSelectedList,
        selectedList,
        loadingList,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export default UploadContext;
