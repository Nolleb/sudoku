import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true
})

export class FooterComponent {
  copyright ="Signal store Sudoku"
  date = new Date().getFullYear();
}
