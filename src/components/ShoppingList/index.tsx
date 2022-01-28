import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";

import { styles } from "./styles";
import { Product } from "../Product";
import ProductsContext from "../../contexts/ProductsContext";

export function ShoppingList() {
  const { listAll, products } = useContext(ProductsContext);

  useEffect(() => {
    listAll();
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
