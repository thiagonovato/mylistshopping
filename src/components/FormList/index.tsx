import React, { useContext, useState } from "react";

import { Container } from "./styles";
import { ButtonIcon } from "../ButtonIcon";
import { Input } from "../Input";
import ListsContext from "../../contexts/ListContext";

export function FormList() {
  const { addItem } = useContext(ListsContext);
  const [name, setName] = useState("");

  async function handleProductAdd() {
    await addItem({
      name,
    });
    setName("");
  }

  return (
    <Container>
      <Input
        placeholder="Nova lista"
        size="medium"
        onChangeText={setName}
        value={name}
        style={{ marginRight: 8 }}
      />

      <ButtonIcon
        size="large"
        icon="add-shopping-cart"
        onPress={handleProductAdd}
        disabled={!name}
      />
    </Container>
  );
}
