import React, { createContext, useContext, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { ProductProps } from "../components/Product";
import AuthContext from "./AuthContext";
import { Alert } from "react-native";

interface ProductsContextData {
  listAll(): Promise<any>;
  products: ProductProps[];
  addItem({ description, quantity }: any): Promise<void>;
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

  return (
    <ProductsContext.Provider value={{ listAll, products, addItem }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
