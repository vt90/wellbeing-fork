import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
})
export class AvailabilityComponent {
  @Output() flags:EventEmitter<boolean[]> = new EventEmitter<boolean[]>();

  constructor() { }

  next(){
    this.flags.emit([false,false,false,true,false,false,false]);
    console.log("Fee structure window should display");
   }

}
