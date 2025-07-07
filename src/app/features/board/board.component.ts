import {Component, inject} from '@angular/core';
import {BoardStore} from './store/board.store';
import {KeyValuePipe} from '@angular/common';
import {RatingComponent} from './components/rating/rating.component';
import {SudokuStore} from '../../store/sudoku.store';
import {ModalComponent} from '../../shared/components/modal/modal.component';
import {LoaderComponent} from '../../shared/components/loader/loader.component';
import {
  ModalCreationContentComponent
} from '../../shared/components/modal-creation-content/modal-creation-content.component';

@Component({
  selector: 'app-board',
  imports: [
    KeyValuePipe,
    RatingComponent,
    ModalComponent,
    LoaderComponent,
    ModalCreationContentComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  standalone: true
})
export class BoardComponent {
  protected title = 'sudoku';
  boardStore = inject(BoardStore)
  sudokuStore = inject(SudokuStore)

  isModalVisible = false

  onClickRestart() {
    this.sudokuStore.initSudokuGrid(this.sudokuStore.sudokuPuzzle(), this.sudokuStore.sudokuSolution())
  }

  onOpenModal() {
    this.isModalVisible = true
  }
}
