import {Component, input, OnInit} from '@angular/core';
import {SvgContainerComponent} from '../../../../shared/components/svg-container/svg-container.component';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  standalone: true,
  imports: [
    SvgContainerComponent
  ],
  styleUrl: './rating.component.scss',
})

export class RatingComponent implements OnInit {
  rating = input<number>(0)
  color = input<string>('#1ce')
  fontSize = input<string>('24px')

  max: number = 9
  numbers: Array<number> = Array.from({ length: this.max }, (_, i) => i)

  ngOnInit(): void {
    this.numbers = Array(this.max).fill(this.rating()).map((_x,i)=>i);
  }
}
