import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrls: ['./fee-structure.component.scss'],
})
export class FeeStructureComponent  {
  @Output() step: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  next(){
    this.step.emit(4);
    console.log('Clinic  window should display');
   }

  prev() {
    this.step.emit(2);
  }
}
