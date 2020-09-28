import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.scss'],
})
export class ClinicDetailsComponent {
  @Output() step: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  next() {
    this.step.emit(5);
    console.log('Assistant  window should display');
  }

  prev() {
    this.step.emit(3);
  }
}
