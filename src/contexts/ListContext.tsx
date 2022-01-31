import React, { createContext, useContext, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { ListProps } from "../components/List";
import AuthContext from "./AuthContext";
import { Alert } from "react-native";

interface ListsContextData {
  listAll(): Promise<any>;
  lists: ListProps[];
  addItem({ name }: any): Promise<void>;
  handleDelete(id: string): Promise<void>;
}

const ListsContext = createContext<ListsContextData>({} as ListsContextData);

export const ListsProvider: React.FC = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [lists, setLists] = useState<ListProps[]>([]);

  async function listAll(): Promise<any> {
    firestore()
      .collection("user")
      .doc(user.uid)
      .collection("lists")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ListProps[];

        setLists(data);
      });
  }

  async function addItem({ name }: any): Promise<void> {
    await firestore()
      .collection("user")
      .doc(user.uid)
      .collection("lists")
      .add({
        name,
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .catch(() => {
        Alert.alert("Erro ao cadastrar lista");
      });
  }

  async function handleDelete(id: string): Promise<void> {
    firestore()
      .collection("user")
      .doc(user.uid)
      .collection("lists")
      .doc(id)
      .delete();
  }

  return (
    <ListsContext.Provider value={{ listAll, lists, addItem, handleDelete }}>
      {children}
    </ListsContext.Provider>
  );
};

export default ListsContext;
