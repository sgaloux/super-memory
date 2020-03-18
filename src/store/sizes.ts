export type gameSizes = 8 | 16 | 24 | 30;

export interface IBoardSize {
  gameSize: gameSizes;
  columns: number;
  rows: number;
}

const boardSizes: IBoardSize[] = [
  {
    gameSize: 8,
    columns: 2,
    rows: 4
  },
  {
    gameSize: 16,
    columns: 4,
    rows: 4
  },
  {
    gameSize: 24,
    columns: 4,
    rows: 6
  },
  { gameSize: 30, columns: 5, rows: 6 }
];

export const availableSizes = () => boardSizes.map(d => d.gameSize);
export const getBoard = (size: gameSizes) =>
  boardSizes.find(d => d.gameSize === size);
