import React from "react";
import { TouchableOpacityProps, ActivityIndicator } from "react-native";

import { ButtonAlign, Container, Title } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
};

export function ButtonTakePhoto({ title, loading, ...rest }: Props) {
  return (
    <Container activeOpacity={0.8} {...rest}>
      {loading ? (
        <ActivityIndicator color={"#fff"} />
      ) : (
        <ButtonAlign>
          <Title>{title}</Title>
        </ButtonAlign>
      )}
    </Container>
  );
}
