import React, { useContext } from "react";
import { ButtonIcon } from "../ButtonIcon";

import { Container, Title } from "./styles";
import AuthContext from "../../contexts/AuthContext";

type Props = {
  title: string;
  showLogoutButton?: boolean;
};

export function Header({ title, showLogoutButton = false }: Props) {
  const { signOut } = useContext(AuthContext);

  function handleLogout() {
    signOut();
  }

  return (
    <Container showLogoutButton={showLogoutButton}>
      <Title>{title}</Title>

      {showLogoutButton && (
        <ButtonIcon
          icon="logout"
          color="alert"
          style={{ marginTop: 20 }}
          onPress={handleLogout}
        />
      )}
    </Container>
  );
}
