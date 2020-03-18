import * as React from "react";
import styled from "styled-components";
import { Card } from "./Card";
import { Button, Dialog, Toaster, Position, Classes } from "@blueprintjs/core";
import { useDispatch, useSelector } from "react-redux";
import { initialize, gameSelectors, showCard } from "../store/gameReducer";
import { Settings } from "./Settings";
import { gameSizes } from "../store/sizes";
export interface IBoardProps {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  height: 100%;
`;

const CardsContainer = styled.div<{ rows: number; columns: number }>`
  display: grid;
  grid-template-columns: ${props =>
    Array.from(Array(props.columns))
      .map(() => "1fr")
      .join(" ")};
  grid-template-rows: ${props =>
    Array.from(Array(props.rows))
      .map(() => "1fr")
      .join(" ")};
  grid-gap: 0.5rem;
  flex: 1;
  align-self: stretch;
  padding: 1rem;
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

  const onNewGameClicked = React.useCallback(() => {
    dispatch(initialize(boardSize.gameSize));
  }, [boardSize.gameSize, dispatch]);

  const onSettingsClicked = React.useCallback(() => {
    setSettingsOpened(true);
  }, [setSettingsOpened]);

  const onBoardSizeSelected = React.useCallback(
    (size: gameSizes) => {
      setSettingsOpened(false);
      dispatch(initialize(size));
    },
    [dispatch]
  );

  return (
    <Container>
      <h1>Memory Game ({boardSize.gameSize} cards) </h1>
      <ButtonsContainer>
        <Button
          large
          icon="new-grid-item"
          intent="primary"
          onClick={onNewGameClicked}
        ></Button>
        <Button
          large
          intent="warning"
          icon="cog"
          onClick={onSettingsClicked}
        ></Button>
      </ButtonsContainer>
      <h3>Flips : {flips}</h3>
      <CardsContainer rows={boardSize.rows} columns={boardSize.columns}>
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
        icon="cog"
        title="Game settings"
      >
        <div className={Classes.DIALOG_BODY}>
          <Settings onSizeSelected={onBoardSizeSelected}></Settings>
        </div>
      </Dialog>
    </Container>
  );
};
