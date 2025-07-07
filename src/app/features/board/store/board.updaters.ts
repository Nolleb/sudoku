import {PartialStateUpdater} from '@ngrx/signals';
import {BoardSlice} from './board.slice';
import {CellPosition} from '../../../store/models/sudoku.models';

export interface StoreWithSudoku {
  puzzleMap(): Record<string, CellPosition>;
  isValidCellValue(value: number | null): boolean;
}

export function updateNumberCount(val: number, cells: CellPosition[], storeWithSudoku: StoreWithSudoku): PartialStateUpdater<BoardSlice> {
  const nbValue = cells.filter(cell =>
    storeWithSudoku.isValidCellValue(cell.value) &&
    cell.value === val &&
    cell.value === cell.solutionValue).length

  return state => ({
    ...state,
    arrayValues: {
      ...state.arrayValues,
      [val]: nbValue
    }
  })
}
