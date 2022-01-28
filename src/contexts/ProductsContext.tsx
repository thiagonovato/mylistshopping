import React, { createContext, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { ProductProps } from "../components/Product";

interface ProductsContextData {
  listAll(): Promise<any>;
  products: ProductProps[];
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

export const ProductsProvider: React.FC = ({ children }) => {
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [user, setUser] = useState<object | null>(null);
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

  return (
    <ProductsContext.Provider value={{ listAll, products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
