import {entityConfig} from '@ngrx/signals/entities';
import {type} from '@ngrx/signals';

export interface CellPosition {
  row: number,
  col: number,
  value: CellValue,
  isValidCellValue: boolean,
  isOriginalValue: boolean,
  solutionValue: CellValue
}

export type CellValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null

export const sudokuPuzzleConfig = entityConfig({
  entity: type<CellPosition>(),
  collection: '_puzzle',
  selectId: (cell) => `${cell.row}-${cell.col}`
})
