import * as React from "react";
import styled from "styled-components";
import { Card } from "./Card";
import { Button, Dialog, Toaster, Position } from "@blueprintjs/core";
import { useDispatch, useSelector } from "react-redux";
import { initialize, gameSelectors, showCard } from "../store/gameReducer";
export interface IBoardProps {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  & > * + * {
    margin-left: 1rem;
  }
`;

export const Board: React.FunctionComponent<IBoardProps> = props => {
  const dispatch = useDispatch();
  const [settingsOpened, setSettingsOpened] = React.useState(false);

  const gameInitialized = useSelector(gameSelectors.isInitialized);
  const allCards = useSelector(gameSelectors.cards);
  const flips = useSelector(gameSelectors.nbFlips);
  const boardSize = useSelector(gameSelectors.boardSize);

  return (
    <Container>
      <h1>Memory Game ({boardSize.gameSize} cards) </h1>
      <ButtonsContainer>
        <Button
          large
          icon="new-grid-item"
          intent="primary"
          onClick={() => dispatch(initialize(16))}
        ></Button>
        <Button large intent="warning" icon="cog"></Button>
      </ButtonsContainer>
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
