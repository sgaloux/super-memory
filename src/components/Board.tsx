import * as React from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { Card } from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { initialize, gameSelectors, showCard } from "../store/gameReducer";
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

  const gameInitialized = useSelector(gameSelectors.isInitialized);
  const allCards = useSelector(gameSelectors.cards);
  const flips = useSelector(gameSelectors.nbFlips);
  return (
    <Container>
      <h1>Memory Game</h1>
      <Button
        text="initialize"
        onClick={() => dispatch(initialize(8))}
      ></Button>
      <h3>Flips : {flips}</h3>
      <CardsContainer>
        {gameInitialized &&
          allCards.map(card => (
            <Card
              key={card.position}
              card={card}
              onClick={() => dispatch(showCard(card.position))}
            ></Card>
          ))}
      </CardsContainer>
    </Container>
  );
};
