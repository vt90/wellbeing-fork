import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
})
export class AvailabilityComponent {
  @Output() step: EventEmitter<number> = new EventEmitter<number>();
  showClinic = true;
  showAvail = false;
  showFee = false;
  clinicSetup = false;

  constructor() {
  }

  next() {
    this.step.emit(3);
    console.log('Fee structure window should display');
  }

  prev() {
    this.step.emit(1);
  }
}
