import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacityProps, ActivityIndicator, View } from "react-native";

import { ButtonAlign, Container, Title } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
};

export function ButtonGoogle({ title, loading, ...rest }: Props) {
  return (
    <Container activeOpacity={0.8} {...rest}>
      {loading ? (
        <ActivityIndicator color={"#fff"} />
      ) : (
        <ButtonAlign>
          <AntDesign name="google" size={24} color="white" />
          <Title>{title}</Title>
        </ButtonAlign>
      )}
    </Container>
  );
}
