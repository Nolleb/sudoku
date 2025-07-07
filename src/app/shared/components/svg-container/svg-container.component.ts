import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-svg-container',
  templateUrl: './svg-container.component.html',
  standalone: true,
  styleUrls: ['./svg-container.component.scss']
})
export class SvgContainerComponent {
  @Input() iconName!: string;
  @Input() svgHeight!: string;
  @Input() svgWidth!: string;
  @Input() svgViewBox!: any;
}
