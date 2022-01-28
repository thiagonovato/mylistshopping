import React, { useContext, useState } from "react";

import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import AuthContext from "../../contexts/AuthContext";

export function SignIn() {
  const { signIn, loadingAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <Title>MyListShopping</Title>
      <Subtitle>monte sua lista de compra</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button
        title="Entrar"
        onPress={() => signIn(email, password)}
        disabled={!email || !password}
        loading={loadingAuth}
      />

      {/* <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
      </Account> */}
    </Container>
  );
}
