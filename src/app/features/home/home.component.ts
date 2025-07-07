import {Component, inject} from '@angular/core';
import {SudokuGridComponent} from '../sudoku-grid/sudoku-grid.component';
import {BoardComponent} from '../board/board.component';
import {LoaderComponent} from '../../shared/components/loader/loader.component';
import {ModalComponent} from '../../shared/components/modal/modal.component';
import {
  ModalCreationContentComponent
} from '../../shared/components/modal-creation-content/modal-creation-content.component';
import {SudokuStore} from '../../store/sudoku.store';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss',
  imports: [
    SudokuGridComponent,
    BoardComponent,
    LoaderComponent,
    ModalComponent,
    ModalCreationContentComponent,
    JsonPipe
  ]
})

export class HomeComponent {
  sudokuStore = inject(SudokuStore)

  isStartModalOpen = true
}
