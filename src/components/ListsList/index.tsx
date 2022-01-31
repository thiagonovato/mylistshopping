import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";

import { styles } from "./styles";
import ListsContext from "../../contexts/ListContext";
import { List } from "../List";

export function ListsList() {
  const { listAll, lists, loadingList } = useContext(ListsContext);

  useEffect(() => {
    listAll();
  }, []);

  return (
    <>
      {loadingList && (
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <List data={item} />}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          contentContainerStyle={styles.content}
        />
      )}
    </>
  );
}
