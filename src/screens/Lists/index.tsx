import React from "react";

import { Header } from "../../components/Header";
import { Container } from "./styles";
import { FormList } from "../../components/FormList";
import { ListsList } from "../../components/ListsList";

export function Lists() {
  return (
    <Container>
      <Header title="Listas" showLogoutButton />
      <FormList />
      <ListsList />
    </Container>
  );
}
