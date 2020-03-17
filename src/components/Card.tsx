import * as React from "react";
import { CardInfo } from "../contexts/reducer";
import styled from "styled-components";
import assets from "../assets";

export interface ICardProps {
  card: CardInfo;
  position: number;
  flipped: boolean;
  onClick: (position: number) => void;
}

const Container = styled.div<{ visible: boolean }>`
  padding: 2rem;
  border: 1px solid black;
  border-radius: 10px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  background: ${props =>
    !props.visible ? `url(${assets.images.cardLogo})` : "white"};
  &:hover {
    color: blue;
    background-color: red;
  }
`;

export const Card: React.FunctionComponent<ICardProps> = ({
  card,
  position,
  onClick,
  flipped
}) => {
  const [visible, setVisible] = React.useState(flipped);
  React.useEffect(() => {
    setVisible(flipped);
  }, [flipped]);

  return (
    <Container visible={visible} onClick={() => setVisible(true)}>
      {visible && card.image}
    </Container>
  );
};
