export interface SudokuSlice {
  sudokuSolution: number[][],
  sudokuPuzzle: number[][],
  difficulty: DifficultyItem[],
  loading: boolean,
  maxErrorNb: number,
  errorNb: ErrorValue,
}

export const initialSudokuSlice: SudokuSlice = {
  sudokuSolution: [],
  sudokuPuzzle: [],
  difficulty: [
    { name: 'Facile', value: 'easy' },
    { name: 'Moyen', value: 'MEDIUM' },
    { name: 'Expert', value: 'hard' }
  ],
  loading: false,
  maxErrorNb: 5,
  errorNb: 0,
};

export interface SudoKuResponse {
  puzzle: number[][],
  solution: number[][],
}

export interface DifficultyItem {
  name: string,
  value: string,
}

export type ErrorValue = 0 | 1 | 2 | 3 | 4 | 5
