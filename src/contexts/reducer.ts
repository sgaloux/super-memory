import produce from "immer";
import { createAction, ActionType } from "typesafe-actions";
export type gameSizes = 8 | 12 | 16 | 24 | 32 | 48;

export type CardInfo = {
  image: string;
  paired: boolean;
};

export type State = {
  selectedPosition: number | null;
  cards: CardInfo[];
  initialized: boolean;
};
export const actions = {
  initialize: createAction("INITIALIZE")<gameSizes>(),
  flip: createAction("FLIP")<number>()
};

type Action = ActionType<typeof actions>;

function shuffle<T>(a: Array<T>): Array<T> {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generatePairs(cards: gameSizes): CardInfo[] {
  const data = Array.from(Array(cards / 2).keys())
    .map(d => [d, d])
    .flat();
  return shuffle(data).map(d => ({
    image: "" + d,
    paired: false
  }));
}

export const initialState: State = {
  cards: [],
  selectedPosition: null,
  initialized: false
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INITIALIZE":
      return {
        selectedPosition: null,
        cards: generatePairs(action.payload),
        initialized: true
      };
    case "FLIP":
      return produce(state, nextState => {
        if (state.selectedPosition === null) {
          nextState.selectedPosition = action.payload;
        } else {
          const firstCard = nextState.cards[nextState.selectedPosition!];
          const secondCard = nextState.cards[action.payload];
          if (firstCard.image === secondCard.image) {
            firstCard.paired = true;
            secondCard.paired = true;
          }
          nextState.selectedPosition = null;
        }
      });

    default:
      return state;
  }
}
