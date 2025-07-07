import {DifficultyItem, initialSudokuSlice, SudoKuResponse, SudokuSlice} from './sudoku.slice';
import {SudokuService} from './services/sudoku.service';
import {computed, inject} from '@angular/core';
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {withDevtools} from '@angular-architects/ngrx-toolkit';
import {catchError, map, Observable, throwError} from 'rxjs';
import {setAllEntities, updateEntity, withEntities} from '@ngrx/signals/entities';
import {CellPosition, CellValue, sudokuPuzzleConfig} from './models/sudoku.models';
import {updateErrorNb} from './sudoku.updaters';

export const SudokuStore = signalStore(
  { providedIn: "root" },
  withState<SudokuSlice>(initialSudokuSlice),
  withEntities(sudokuPuzzleConfig),
  withComputed((store) => {
    const puzzleMap = computed(() => store._puzzleEntityMap());
    const cells = computed(() => Object.values(puzzleMap()))
    const isPuzzleLoaded = computed(() => !store.loading())

    const hasNullValue = computed(() => {
      if (!isPuzzleLoaded()) {
        return false
      }
      return Object.values(puzzleMap()).some(cell => cell.value === null)
    });

    const isPuzzleFullyFilled = computed(() => {
      if (!isPuzzleLoaded()) {
        return false
      }

      return Object.values(puzzleMap()).every(cell => cell.value !== null)
    });

    const difficulty = computed(() => store.difficulty())
    const nbErrors = computed(() => store.errorNb());
    const maxErrorNb = computed(() => store.maxErrorNb());

    const isGameOver = computed(() => store.errorNb() >= store.maxErrorNb())

    const isComplete2 = computed(() => {
      if(!isPuzzleFullyFilled()) {
        return false
      }
      return cells().every(cell => {
        if(cell.value === null) {
          return false
        }
        return cell.value === cell.solutionValue
      })
    });

    const isComplete = computed(() => {
      if (!isPuzzleFullyFilled()) {
        return false;
      }

      const hasPlayerFilledCells = cells().some(cell => !cell.isOriginalValue && cell.value !== null);
      if (!hasPlayerFilledCells) {
        return false;
      }

      return cells().every(cell => cell.value === cell.solutionValue);
    });

    return {
      puzzleMap,
      hasNullValue,
      isPuzzleLoaded,
      isPuzzleFullyFilled,
      difficulty,
      nbErrors,
      maxErrorNb,
      isGameOver,
      isComplete
    };
  }),

  withMethods((
    store,
    sudokuService = inject(SudokuService),
  ) => ({
    loadSudoku(difficulty: DifficultyItem): Observable<SudoKuResponse> {
      patchState(store, {
        loading: true
      })
      return sudokuService.getSudoku(difficulty).pipe(
        map(sudoku => {

          this.initSudokuGrid(sudoku.puzzle, sudoku.solution)

          patchState(store, {
            sudokuSolution: sudoku.solution,
            sudokuPuzzle: sudoku.puzzle,
            loading: false
          });

          return sudoku;
        }),

        catchError(error => {
          patchState(store, {
            loading: false
          })
          return throwError(() => error);
        })
      );
    },

    initSudokuGrid(puzzle: number[][], solution: number[][]): CellPosition[] {
      const cellPositions = puzzle.flatMap((row: number[], rowIndex: number) =>
        row.map((value, colIndex: number) => {
          const cellValue: CellValue = this.isValidCellValue(value) ? value as CellValue : null
          const solutionValue: CellValue = this.isValidCellValue(solution[rowIndex][colIndex]) ?
            solution[rowIndex][colIndex] as CellValue : null

          return {
            row: rowIndex,
            col: colIndex,
            value: cellValue,
            isValidCellValue: this.isValidCellValue(value),
            isOriginalValue: cellValue !== null,
            solutionValue: solutionValue
          };
        })
      )
      patchState(store, setAllEntities(cellPositions, sudokuPuzzleConfig))
      this.resetErrorNb()

      return cellPositions;
    },

    isValidCellValue(value: number | null): boolean {
      return value === null || (value >= 1 && value <= 9)
    },

    //todo update difficulty

    updateCellValue(cellValue: CellValue, cellID: string) {
      const currentCell = store.puzzleMap()[cellID];
      patchState(store, updateEntity({
        id: cellID,
        changes: {
          value: !this.isValidCellValue(cellValue) ? null : cellValue,
          isOriginalValue: false
        }
      }, sudokuPuzzleConfig))

      patchState(store, updateErrorNb(store.errorNb(), cellValue, currentCell))
      return cellValue
    },

    resetErrorNb() {
      patchState(store, {
        errorNb: 0
      })
    }
  })),

  withDevtools('sudoku'),
);
