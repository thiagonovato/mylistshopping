import React, { useContext } from "react";

import { ButtonIcon } from "../ButtonIcon";
import { Container, Info, Title, Options } from "./styles";
import { Alert } from "react-native";
import ListContext from "../../contexts/ListContext";

export type ListProps = {
  id: string;
  name: string;
};

type Props = {
  data: ListProps;
};

export function List({ data }: Props) {
  const { handleDelete } = useContext(ListContext);

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

  return (
    <Container>
      <Info>
        <Title>{data.name}</Title>
      </Info>

      <Options>
        <ButtonIcon icon="delete" color="alert" onPress={handleConfirmDelete} />
      </Options>
    </Container>
  );
}
