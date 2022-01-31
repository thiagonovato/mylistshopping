import React, { createContext, useContext, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { ProductProps } from "../components/Product";
import AuthContext from "./AuthContext";
import { Alert } from "react-native";
import ListsContext from "./ListContext";

interface ProductsContextData {
  listAll(): Promise<any>;
  products: ProductProps[];
  addItem({ description, quantity }: any): Promise<void>;
  handleDoneToggle(id: string, done: boolean): Promise<void>;
  handleDelete(id: string): Promise<void>;
  loadingProducts: boolean;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

export const ProductsProvider: React.FC = ({ children }) => {
  const { selectedList } = useContext(ListsContext);
  const { user } = useContext(AuthContext);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductProps[]>([]);

  async function listAll(): Promise<any> {
    setLoadingProducts(true);
    const subscribe = firestore()
      .collection("user")
      .doc(user.uid)
      .collection("lists")
      .doc(selectedList.id)
      .collection("products")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setProducts(data);
        setLoadingProducts(true);
      });
    return () => subscribe();
  }

  async function addItem({ description, quantity }: any): Promise<void> {
    await firestore()
      .collection("user")
      .doc(user.uid)
      .collection("lists")
      .doc(selectedList.id)
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
      .collection("user")
      .doc(user.uid)
      .collection("lists")
      .doc(selectedList.id)
      .collection("products")
      .doc(id)
      .update({ done: !done });
  }

  async function handleDelete(id: string): Promise<void> {
    firestore()
      .collection("user")
      .doc(user.uid)
      .collection("lists")
      .doc(selectedList.id)
      .collection("products")
      .doc(id)
      .delete();
  }

  return (
    <ProductsContext.Provider
      value={{
        listAll,
        products,
        addItem,
        handleDoneToggle,
        handleDelete,
        loadingProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
