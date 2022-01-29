import React, { useContext } from "react";
import firestore from "@react-native-firebase/firestore";

import { ButtonIcon } from "../ButtonIcon";
import { Container, Info, Title, Quantity, Options } from "./styles";
import { Alert } from "react-native";
import ProductsContext from "../../contexts/ProductsContext";

export type ProductProps = {
  id: string;
  description: string;
  quantity: number;
  done: boolean;
};

type Props = {
  data: ProductProps;
};

export function Product({ data }: Props) {
  const { handleDoneToggle, handleDelete } = useContext(ProductsContext);

  function handleConfirmDelete() {
    Alert.alert("Atenção", `Deseja realmente excluir ${data.description}?`, [
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
        <Title done={data.done}>{data.description}</Title>

        <Quantity>Quantidade: {data.quantity}</Quantity>
      </Info>

      <Options>
        <ButtonIcon
          icon={data.done ? "undo" : "check"}
          onPress={() => handleDoneToggle(data.id, data.done)}
          style={{
            marginRight: 10,
          }}
        />

        <ButtonIcon
          icon="delete"
          color="alert"
          onPress={handleConfirmDelete}
          disabled={data.done}
        />
      </Options>
    </Container>
  );
}
