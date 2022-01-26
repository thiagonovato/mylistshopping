import React from "react";
import { TouchableOpacityProps, ActivityIndicator, View } from "react-native";

import { Container, Title } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
};

export function Button({ title, loading, ...rest }: Props) {
  return (
    <Container activeOpacity={0.8} {...rest}>
      {loading ? <ActivityIndicator color={"#fff"} /> : <Title>{title}</Title>}
    </Container>
  );
}
