import React from "react";

import { ShoppingList } from "../../components/ShoppingList";
import { FormBox } from "../../components/FormBox";
import { Header } from "../../components/Header";
import { Container } from "./styles";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ButtonBack } from "../../components/ButtonBack";

export function Products() {
  const navigation = useNavigation();
  return (
    <Container>
      <Header title="Lista" showLogoutButton showBackButton />
      <FormBox />
      <ShoppingList />
    </Container>
  );
}
