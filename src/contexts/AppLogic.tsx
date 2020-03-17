import * as React from "react";
import { State, reducer, initialState, gameSizes, actions } from "./reducer";
import { useLocalStorage } from "../hooks";

interface IAppLogicContext {
  game: State;
  initialize: (cards: gameSizes) => void;
  flip: (position: number) => void;
  visibleCards: number[];
  won: boolean;
}

const AppLogicContext = React.createContext<IAppLogicContext>(null);

interface IAppLogicProviderProps {}

export const AppLogicProvider: React.FunctionComponent<IAppLogicProviderProps> = ({
  children
}) => {
  const [finalInitialState, setFinalInitialState] = useLocalStorage<State>(
    "MEMORY-GAME",
    initialState
  );
  const [game, dispatch] = React.useReducer(reducer, finalInitialState);
  React.useEffect(() => {
    setFinalInitialState(game);
  }, [game, setFinalInitialState]);

  const initialize = React.useCallback(
    (cards: gameSizes) => {
      dispatch(actions.initialize(cards));
    },
    [dispatch]
  );

  const flip = React.useCallback(
    (position: number) => {
      dispatch(actions.flip(position));
    },
    [dispatch]
  );

  const won = React.useMemo(() => game.cards.every(d => d.paired), [
    game.cards
  ]);

  const visibleCards = React.useMemo(
    () =>
      game.cards
        .map((card, pos) =>
          card.paired || pos === game.selectedPosition ? pos : -1
        )
        .filter(pos => pos !== -1),
    [game.cards, game.selectedPosition]
  );

  return (
    <AppLogicContext.Provider
      value={{
        initialize,
        flip,
        game,
        won,
        visibleCards
      }}
    >
      {children}
    </AppLogicContext.Provider>
  );
};

export const useAppLogicContext = () => React.useContext(AppLogicContext);
