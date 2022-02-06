import React, { useContext, useState } from "react";

import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import AuthContext from "../../contexts/AuthContext";
import { ButtonGoogle } from "../../components/ButtonGoogle";

export function SignIn({ navigation }) {
  const { signIn, loadingAuth, signInWithGoogle, loadingSignInWithGoogle } =
    useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onGoogleButtonPress() {
    signInWithGoogle();
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
        onPress={() => signIn(email, password)}
        disabled={!email || !password}
        loading={loadingAuth}
      />
      <ButtonGoogle
        title="Entrar com Google"
        onPress={() => signInWithGoogle()}
        loading={loadingSignInWithGoogle}
      />

      <Account>
        <ButtonText
          title="Recuperar senha"
          onPress={() => navigation.navigate("RecoveryPassword")}
        />
        <ButtonText
          title="Criar conta"
          onPress={() => navigation.navigate("SignUp")}
        />
      </Account>
    </Container>
  );
}
