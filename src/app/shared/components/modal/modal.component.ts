import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  standalone: true
})

export class ModalComponent {
  title = input.required<string>()
  showCloseModal = input<boolean>(true)
  shown = input.required<boolean>()
  isClosing = output<boolean>()

  closeModal() {
    this.isClosing.emit(false);
  }
}
