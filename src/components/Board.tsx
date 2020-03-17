import * as React from "react";
import { useAppLogicContext } from "../contexts/AppLogic";
import styled from "styled-components";
import { Button } from "./Button";
import { Card } from "./Card";
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
  const { initialize, flip, game, won, visibleCards } = useAppLogicContext();

  const initializeClicked = React.useCallback(() => {
    initialize(32);
  }, [initialize]);

  return (
    <Container>
      <h1>Memory Game</h1>
      <Button text="initialize" onClick={initializeClicked}></Button>
      <CardsContainer>
        {game.initialized &&
          game.cards.map((card, position) => (
            <Card
              card={card}
              position={position}
              onClick={flip}
              flipped={visibleCards.includes(position)}
            ></Card>
          ))}
      </CardsContainer>
    </Container>
  );
};
