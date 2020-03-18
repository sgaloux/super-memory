import * as React from "react";
import styled from "styled-components";
import { Card } from "./Card";
import { Button, Dialog } from "@blueprintjs/core";
import { useDispatch, useSelector } from "react-redux";
import { initialize, gameSelectors, showCard } from "../store/gameReducer";
export interface IBoardProps {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Board: React.FunctionComponent<IBoardProps> = props => {
  const dispatch = useDispatch();
  const [settingsOpened, setSettingsOpened] = React.useState(false);

  const gameInitialized = useSelector(gameSelectors.isInitialized);
  const allCards = useSelector(gameSelectors.cards);
  const flips = useSelector(gameSelectors.nbFlips);
  return (
    <Container>
      <h1>Memory Game</h1>
      <Button
        text="initialize"
        onClick={() => dispatch(initialize(16))}
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
      <Dialog
        isOpen={settingsOpened}
        onClose={() => setSettingsOpened(false)}
        isCloseButtonShown
      ></Dialog>
    </Container>
  );
};
