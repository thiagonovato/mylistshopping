import React, { useState } from "react";

import auth from "@react-native-firebase/auth";
import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Alert } from "react-native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleSignInWithEmailAndPassword() {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        Alert.alert("Erro ao logar", "Verifique seus dados e tente novamente.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

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
        onPress={handleSignInWithEmailAndPassword}
        disabled={!email || !password}
        loading={loading}
      />

      {/* <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
      </Account> */}
    </Container>
  );
}
