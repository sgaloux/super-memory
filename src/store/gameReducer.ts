import { RootState } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

export type gameSizes = 8 | 12 | 16 | 24 | 32 | 48;

export type CardInfo = {
  image: string;
  paired: boolean;
  position: number;
};

export type State = {
  selectedPosition: number | null;
  cards: CardInfo[];
  initialized: boolean;
};

export const initialState: State = {
  cards: [],
  selectedPosition: null,
  initialized: false
};

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
  return shuffle(data).map((d, pos) => ({
    image: "" + d,
    paired: false,
    position: pos
  }));
}

export const gameReducer = createSlice({
  name: "game",
  initialState,
  reducers: {
    initialize(state, action: PayloadAction<gameSizes>) {
      state.cards = generatePairs(action.payload);
      state.selectedPosition = null;
      state.initialized = true;
    },
    flip(state, action: PayloadAction<number>) {
      if (state.selectedPosition === null) {
        state.selectedPosition = action.payload;
      } else {
        const firstCard = state.cards[state.selectedPosition!];
        const secondCard = state.cards[action.payload];
        if (firstCard.image === secondCard.image) {
          firstCard.paired = true;
          secondCard.paired = true;
        }
        state.selectedPosition = null;
      }
    }
  }
});

export const { initialize, flip } = gameReducer.actions;
export default gameReducer.reducer;

const gameSelector = (state: RootState) => state.game;

export const cards = createSelector(gameSelector, game =>
  game.cards.map(card => ({
    ...card,
    flipped: card.position === game.selectedPosition || card.paired
  }))
);

export const isInitialized = createSelector(
  gameSelector,
  game => game.initialized
);
