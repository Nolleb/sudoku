import {Component, input, OnInit, output, signal} from '@angular/core';
import {DifficultyItem} from '../../../store/sudoku.slice';

@Component({
  selector: 'app-select-difficulty',
  templateUrl: './select-difficulty.component.html',
  styleUrl: './select-difficulty.component.scss'
})

export class SelectDifficultyComponent implements OnInit {
  difficulties = input<DifficultyItem[]>([]);
  onChangeDifficulty = output<DifficultyItem>();
  selectedValue = signal<string>('')

  ngOnInit(): void {
    if (this.difficulties() && this.difficulties().length > 0) {
      this.selectedValue.set(this.difficulties()[0].value)
      this.onChangeDifficulty.emit(this.difficulties()[0]);
    }
  }

  selectDifficulty(item: DifficultyItem) {
    this.selectedValue.set(item.value);
    this.onChangeDifficulty.emit(item)
  }
}
