import * as React from "react";
import styled from "styled-components";
import assets from "../assets";
import { CardInfo } from "../store/gameReducer";

export interface ICardProps {
  card: CardInfo;
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
  onClick,
  flipped
}) => {
  const [visible, setVisible] = React.useState(flipped);
  React.useEffect(() => {
    setVisible(flipped);
  }, [flipped]);

  return (
    <Container
      visible={visible}
      onClick={() => {
        setVisible(true);
        setTimeout(() => onClick(card.position), 500);
      }}
    >
      {visible && card.image}
    </Container>
  );
};
