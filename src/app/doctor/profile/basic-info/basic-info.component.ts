import {Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent {
  @Output() step: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  next() {
    this.step.emit(1);
  }
}
