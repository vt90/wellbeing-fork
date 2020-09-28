import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'practise-info',
  templateUrl: './practise-info.component.html',
  styleUrls: ['./practise-info.component.scss'],
})
export class PractiseInfoComponent {
  @Output() step: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  next(){
    this.step.emit(2);
    console.log('Availability window should display');
   }

  prev() {
    this.step.emit(0);
  }
}
