import React, { useContext } from "react";

import { ButtonIcon } from "../ButtonIcon";
import { Container, Info, Title, Options } from "./styles";
import { Alert, TouchableOpacity } from "react-native";
import ListContext from "../../contexts/ListContext";
import { useNavigation } from "@react-navigation/native";

export type ListProps = {
  id: string;
  name: string;
};

type Props = {
  data: ListProps;
};

export function List({ data }: Props) {
  const navigation = useNavigation();

  const { handleDelete, setSelectedList } = useContext(ListContext);

  function handleConfirmDelete() {
    Alert.alert("Atenção", `Deseja realmente excluir ${data.name}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          handleDelete(data.id);
        },
      },
    ]);
  }

  function handleScreen(data: {}) {
    setSelectedList(data);
    navigation.navigate("Products");
  }

  return (
    <Container>
      <Info>
        <TouchableOpacity onPress={() => handleScreen(data)}>
          <Title>{data.name}</Title>
        </TouchableOpacity>
      </Info>

      <Options>
        <ButtonIcon icon="delete" color="alert" onPress={handleConfirmDelete} />
      </Options>
    </Container>
  );
}
