import {BoardSlice, initialBoardSlice} from './board.slice';
import {computed, effect, inject} from '@angular/core';
import {patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState} from '@ngrx/signals';
import {withDevtools} from '@angular-architects/ngrx-toolkit';
import {SudokuStore} from '../../../store/sudoku.store';
import {updateNumberCount} from './board.updaters';

export const BoardStore = signalStore(
  { providedIn: "root" },
  withState<BoardSlice>(initialBoardSlice),
  withProps( _ => ({
    _sudokuStore : inject(SudokuStore)
  })),
  withComputed((store) => {

    const cells = computed(() => Object.values(store._sudokuStore.puzzleMap()))

    const digitNumbersFound = computed(() => store.arrayValues())

    return  {
      digitNumbersFound,
      cells
    }
  }),
  withMethods((
    store,
  ) => ({
    setNumberCount(val: number) {
      patchState(store, updateNumberCount(val, store.cells(), store._sudokuStore))
    },

    setArrayValues() {
      [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(val => this.setNumberCount(val))
    },

    initBoard() {
      this.setArrayValues()
    },

    setupPuzzleChangeEffect() {
      effect(() => {
        if(store._sudokuStore.isPuzzleLoaded()) {
          this.initBoard();
        }
      });
    }
  })),

  withDevtools('board'),
  withHooks(store => ({
    onInit: () => {
      store.setupPuzzleChangeEffect();
    }
  }))
);
