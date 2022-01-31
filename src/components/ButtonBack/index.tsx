import React from "react";
import { TouchableOpacityProps } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Container } from "./styles";
import theme from "../../theme";

type Props = TouchableOpacityProps & {
  size?: "small" | "large";
  icon?: React.ComponentProps<typeof AntDesign>["name"];
};

export function ButtonBack({ size = "small", icon, ...rest }: Props) {
  return (
    <Container activeOpacity={0.8} size={size} {...rest}>
      <AntDesign
        name={icon}
        size={size === "small" ? 18 : 24}
        color={theme.COLORS.BLACK}
      />
    </Container>
  );
}
