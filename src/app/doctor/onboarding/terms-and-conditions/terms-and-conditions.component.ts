import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent {
  @Output() step: EventEmitter<number> = new EventEmitter<number>();
  isChecked: boolean;

  constructor() { }

  next() {
    this.step.emit(5);
  }

  prev() {
    this.step.emit(3);
  }

}
