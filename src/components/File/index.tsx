import React from "react";
import { ButtonIcon } from "../ButtonIcon";
import { Container, Info, Name, Path, Options } from "./styles";

export type FileProps = {
  id: string;
  name: string;
  url: string;
  created_at: any;
  path: string;
};

type Props = {
  data: FileProps;
  onShow?: () => void;
  onDelete?: () => void;
};

export function File({ data, onShow, onDelete }: Props) {
  return (
    <Container>
      <Info>
        <Name>{data.name}</Name>
        {data.created_at && <Path>{data.created_at.toDate().toString()}</Path>}
      </Info>

      <ButtonIcon
        icon="visibility"
        onPress={onShow}
        style={{
          marginRight: 5,
        }}
      />
      <Options>
        <ButtonIcon icon="delete" color="alert" onPress={onDelete} />
      </Options>
    </Container>
  );
}
