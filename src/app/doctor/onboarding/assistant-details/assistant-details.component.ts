import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'assistant-details',
  templateUrl: './assistant-details.component.html',
  styleUrls: ['./assistant-details.component.scss'],
})
export class AssistantDetailsComponent {
  @Output() step: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  next(){
    this.step.emit(4);
    console.log('terms and condition window should display');
   }

  prev() {
    this.step.emit(2);
  }
}
