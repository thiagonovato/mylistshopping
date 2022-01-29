import React, { createContext, useContext, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { ProductProps } from "../components/Product";
import AuthContext from "./AuthContext";
import { Alert } from "react-native";

interface ProductsContextData {
  listAll(): Promise<any>;
  products: ProductProps[];
  addItem({ description, quantity }: any): Promise<void>;
  handleDoneToggle(id: string, done: boolean): Promise<void>;
  handleDelete(id: string): Promise<void>;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

export const ProductsProvider: React.FC = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductProps[]>([]);

  async function listAll(): Promise<any> {
    firestore()
      .collection("list")
      .doc(user.uid)
      .collection("products")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setProducts(data);
      });
  }

  async function addItem({ description, quantity }: any): Promise<void> {
    await firestore()
      .collection("list")
      .doc(user.uid)
      .collection("products")
      .add({
        description,
        quantity,
        done: false,
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .catch(() => {
        Alert.alert("Erro ao cadastrar produto");
      });
  }

  async function handleDoneToggle(id: string, done: boolean): Promise<void> {
    firestore()
      .collection("list")
      .doc(user.uid)
      .collection("products")
      .doc(id)
      .update({ done: !done });
  }

  async function handleDelete(id: string): Promise<void> {
    firestore()
      .collection("list")
      .doc(user.uid)
      .collection("products")
      .doc(id)
      .delete();
  }

  return (
    <ProductsContext.Provider
      value={{ listAll, products, addItem, handleDoneToggle, handleDelete }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
