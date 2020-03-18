import * as React from "react";
import styled from "styled-components";
import assets from "../assets";
import { CardInfo } from "../store/gameReducer";

export interface ICardProps {
  card: CardInfo;
  onClick: (position: number) => void;
}

interface ContainerProps {
  visible: boolean;
  error?: boolean;
  paired?: boolean;
}

const Container = styled.div<ContainerProps>`
  padding: 2rem;
  border: 1px solid black;
  border-radius: 10px;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  font-size: 5rem;
  font-weight: bolder;
  cursor: pointer;
  justify-content: center;
  background: ${props =>
    !props.visible ? `url(${assets.images.cardLogo})` : "white"};
  border: 3px solid
    ${props => (props.error ? "red" : props.paired ? "green" : "black")};

  &:hover {
    -moz-box-shadow: 0 0 10px #ccc;
    -webkit-box-shadow: 0 0 10px #ccc;
    box-shadow: 0 0 10px #ccc;
  }
`;

export const Card: React.FunctionComponent<ICardProps> = ({
  card,
  onClick
}) => {
  return (
    <Container
      visible={card.visible}
      error={card.error}
      paired={card.paired}
      onClick={() => onClick(card.position)}
    >
      {card.visible && card.image}
    </Container>
  );
};
