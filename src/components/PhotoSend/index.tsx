import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import {
  Container,
  EmptyPhotoContainer,
  Image,
  EmptyPhotoText,
} from "./styles";

type Props = TouchableOpacityProps & {
  uri?: string;
};

export function PhotoSend({ uri, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...rest}>
      <Container>
        {uri ? (
          <Image source={{ uri }} />
        ) : (
          <EmptyPhotoContainer>
            <EmptyPhotoText>Selecione uma foto do seu arquivo</EmptyPhotoText>
          </EmptyPhotoContainer>
        )}
      </Container>
    </TouchableOpacity>
  );
}
