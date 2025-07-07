import {Component, inject} from '@angular/core';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {SudokuStore} from './store/sudoku.store';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [LoaderComponent, RouterOutlet, HeaderComponent, FooterComponent, NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
