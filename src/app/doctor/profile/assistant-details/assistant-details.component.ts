import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'assistant-details',
  templateUrl: './assistant-details.component.html',
  styleUrls: ['./assistant-details.component.scss'],
})
export class AssistantDetailsComponent {
  @Output() flags:EventEmitter<boolean[]> = new EventEmitter<boolean[]>();
  
  constructor() { }

  next(){
    this.flags.emit([false,false,false,false,false,false,true]);
    console.log("terms and condition window should display");
   }

}
