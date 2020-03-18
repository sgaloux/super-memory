import * as React from "react";
import { availableSizes, gameSizes } from "../store/sizes";
import styled from "styled-components";
import { Button } from "@blueprintjs/core";

export interface ISettingsProps {
  onSizeSelected: (size: gameSizes) => void;
}

const sizes = availableSizes();

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Settings: React.FunctionComponent<ISettingsProps> = ({
  onSizeSelected
}) => {
  return (
    <Container>
      {sizes.map(s => (
        <Button
          large
          intent="primary"
          key={s}
          text={`${s} cards`}
          onClick={() => onSizeSelected(s)}
        ></Button>
      ))}
    </Container>
  );
};
