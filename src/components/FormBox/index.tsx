import React, { useContext, useState } from "react";

import { Container } from "./styles";
import { ButtonIcon } from "../ButtonIcon";
import { Input } from "../Input";
import ProductsContext from "../../contexts/ProductsContext";

export function FormBox() {
  const { addItem } = useContext(ProductsContext);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);

  async function handleProductAdd() {
    await addItem({
      description,
      quantity,
    });
    setDescription("");
    setQuantity(0);
  }

  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setDescription}
        value={description}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        onChangeText={(value) => setQuantity(Number(value))}
        value={quantity.toString()}
      />

      <ButtonIcon
        size="large"
        icon="add-shopping-cart"
        onPress={handleProductAdd}
        disabled={!description || !quantity}
      />
    </Container>
  );
}
