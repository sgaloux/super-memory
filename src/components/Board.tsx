import * as React from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { Card } from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { initialize, isInitialized, cards, flip } from "../store/gameReducer";
export interface IBoardProps {}

const Container = styled.div``;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  * {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`;

export const Board: React.FunctionComponent<IBoardProps> = props => {
  const dispatch = useDispatch();

  const gameInitialized = useSelector(isInitialized);
  const allCards = useSelector(cards);

  return (
    <Container>
      <h1>Memory Game</h1>
      <Button
        text="initialize"
        onClick={() => dispatch(initialize(32))}
      ></Button>
      <CardsContainer>
        {gameInitialized &&
          allCards.map(card => (
            <Card
              key={card.position}
              card={card}
              onClick={() => dispatch(flip(card.position))}
              flipped={card.flipped}
            ></Card>
          ))}
      </CardsContainer>
    </Container>
  );
};
