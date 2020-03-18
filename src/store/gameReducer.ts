import { RootState } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { gameSizes, getBoard } from "./sizes";

export type CardInfo = {
  image: string;
  paired: boolean;
  position: number;
  visible: boolean;
  error?: boolean;
};

export type State = {
  boardSize: gameSizes;
  selectedPosition: number | null;
  cards: CardInfo[];
  initialized: boolean;
  flips: number;
};

export const initialState: State = {
  boardSize: 24,
  cards: [],
  selectedPosition: null,
  initialized: false,
  flips: 0
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
    position: pos,
    visible: false
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
      state.flips = 0;
      state.boardSize = action.payload;
    },
    showCard(state, action: PayloadAction<number>) {
      if (flipIsAllowed(state.cards)) {
        state.cards[action.payload].error = false;
        state.cards[action.payload].visible = true;
        state.flips++;
      }
    },
    hideCards(state, action: PayloadAction<CardInfo[]>) {
      action.payload.forEach(c => {
        state.cards[c.position].visible = false;
        state.cards[c.position].error = false;
      });
    },
    pairCards(state, action: PayloadAction<CardInfo[]>) {
      action.payload.forEach(c => {
        state.cards[c.position].paired = true;
      });
    },
    markError(state, action: PayloadAction<CardInfo[]>) {
      action.payload.forEach(c => {
        state.cards[c.position].error = true;
      });
    }
  }
});

const flipIsAllowed = (cards: CardInfo[]) =>
  cards.filter(c => !c.paired && c.visible).length < 2;

export const {
  initialize,
  showCard,
  pairCards,
  hideCards,
  markError
} = gameReducer.actions;
export default gameReducer.reducer;

const gameSelector = (state: RootState) => state.game;

const cards = createSelector(gameSelector, game => game.cards);

const isInitialized = createSelector(gameSelector, game => game.initialized);

const flipAllowed = createSelector(cards, flipIsAllowed);
const visibleCards = createSelector(cards, cards =>
  cards.filter(c => !c.paired && c.visible)
);

const nbFlips = createSelector(gameSelector, game => game.flips);
const boardSize = createSelector(gameSelector, game =>
  getBoard(game.boardSize)
);

export const gameSelectors = {
  cards,
  isInitialized,
  flipAllowed,
  visibleCards,
  nbFlips,
  boardSize
};
