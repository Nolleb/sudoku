import {Component, inject, input, output} from '@angular/core';
import {
  SelectDifficultyComponent
} from '../select-difficulty/select-difficulty.component';
import {SudokuStore} from '../../../store/sudoku.store';
import {DifficultyItem} from '../../../store/sudoku.slice';

@Component({
  selector: 'app-modal-creation-content',
  standalone: true,
  templateUrl: 'modal-creation-content.component.html',
  styleUrl: './modal-creation-content.component.scss',
  imports: [
    SelectDifficultyComponent
  ]
})

export class ModalCreationContentComponent {
  sudokuStore = inject(SudokuStore)
  createGameLabel = input<string>('')
  isModalVisible = input<boolean>(false)
  selectedDifficulty?: DifficultyItem
  gameCreated = output<void>()

  onClickNewGame() {
    this.sudokuStore.loadSudoku(this.selectedDifficulty!).subscribe(
      response => {
        if(response.puzzle.length > 0) {
          this.gameCreated.emit()
        }
      }
    )
  }
}
