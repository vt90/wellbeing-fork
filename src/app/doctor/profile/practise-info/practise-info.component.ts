import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'practise-info',
  templateUrl: './practise-info.component.html',
  styleUrls: ['./practise-info.component.scss'],
})
export class PractiseInfoComponent {
  @Output() flags:EventEmitter<boolean[]> = new EventEmitter<boolean[]>();
  constructor() { }

  next(){
    this.flags.emit([false,false,true,false,false,false,false]);
    console.log("Availability window should display");
   }

}
