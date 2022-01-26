import React, { useState } from "react";

import auth from "@react-native-firebase/auth";
import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignInWithEmailAndPassword() {
    const { user } = await auth().signInWithEmailAndPassword(email, password);
    console.log(user);
  }

  return (
    <Container>
      <Title>MyListShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input placeholder="senha" secureTextEntry onChangeText={setPassword} />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      {/* <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
      </Account> */}
    </Container>
  );
}
