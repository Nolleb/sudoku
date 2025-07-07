import {PartialStateUpdater, patchState} from '@ngrx/signals';
import {ErrorValue, SudokuSlice} from './sudoku.slice';
import {CellPosition, CellValue} from './models/sudoku.models';

export function updateErrorNb(
  currentError: ErrorValue,
  cellValue: CellValue,
  currentCell: CellPosition
): PartialStateUpdater<SudokuSlice> {
  let newError: ErrorValue = currentError
  if (cellValue !== null &&
    !currentCell.isOriginalValue &&
    cellValue !== currentCell.solutionValue) {
    newError = incrementErrorCount() as ErrorValue
  }
  function incrementErrorCount() {
    if (currentError < 5) {
     return currentError + 1
    }
    return currentError
  }
  return state => ({
    ...state,
    errorNb: newError,
  })
}
