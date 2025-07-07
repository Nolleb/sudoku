import {Component, ElementRef, inject, viewChild, ViewChild} from '@angular/core';
import {CellValue} from '../../store/models/sudoku.models';
import {SudokuStore} from '../../store/sudoku.store';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-sudoku-grid',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sudoku-grid.component.html',
  styleUrl: './sudoku-grid.component.scss',
})

export class SudokuGridComponent {
  sudokuStore = inject(SudokuStore)

  table = viewChild<ElementRef<HTMLTableElement>>('table')

  getBoxBorderClass(row: number, col: number): string[] {
    const classes: string[] = [];

    if (row % 3 === 0) classes.push('border-top-bold');
    if (col % 3 === 0) classes.push('border-left-bold');
    if (row === 8) classes.push('border-bottom-bold');
    if (col === 8) classes.push('border-right-bold');

    return classes;
  }

  onCellChangeValue($event: Event) {
    $event.preventDefault()
    const target = $event.target as HTMLInputElement
    if (!target) return
    const id = target.id
    const newValue = target.value

    const isValid = newValue === '' || /^[1-9]$/.test(newValue)
    const cellValue = newValue === '' ? null :
      /^[1-9]$/.test(newValue) ? parseInt(newValue) as CellValue : null

    this.sudokuStore.updateCellValue(cellValue, id);

    this.displayInvalidInputBorder(isValid, target)
  }

  displayInvalidInputBorder(isValid: boolean, target: HTMLInputElement) {
    if (isValid) {
      target.classList.remove('invalid-input');
    } else {
      target.classList.add('invalid-input');
    }
  }

  protected readonly Object = Object;

  onCellFocusValue(rowIndex: number, colIndex: number, $event: FocusEvent) {
    $event.preventDefault()
    this.highLightSelectedRow(rowIndex, true)
    this.highlightColumnCells(rowIndex, colIndex, true)
  }

  onCellBlurValue(rowIndex: number, colIndex: number, $event: FocusEvent) {
    this.highLightSelectedRow(rowIndex, false)
    this.highlightColumnCells(rowIndex, colIndex, false)
  }

  highLightSelectedRow(currentRowIndex: number, isHighlight: boolean) {
    const selectedRow = this.table()!.nativeElement.rows[currentRowIndex]
    if (isHighlight) {
      selectedRow.classList.add('selected-color')
    } else {
      selectedRow.classList.remove('selected-color')
    }
  }

  highlightColumnCells(currentRowIndex: number, colIndex: number, isHighlight: boolean): void {
    const table = this.table()?.nativeElement;
    if (!table) return;

    const rows = table.rows;
    for (let i = 0; i < rows.length; i++) {
      if (i === currentRowIndex) continue;
      const cell = rows[i].cells[colIndex];
      if (cell) {
        if (isHighlight) {
          cell.classList.add('selected-color');
        } else {
          cell.classList.remove('selected-color');
        }
      }
    }
  }
}
