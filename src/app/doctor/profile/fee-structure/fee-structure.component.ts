import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrls: ['./fee-structure.component.scss'],
})
export class FeeStructureComponent  {
  @Output() flags:EventEmitter<boolean[]> = new EventEmitter<boolean[]>();
  
  constructor() { }

  next(){
    this.flags.emit([false,false,false,false,true,false,false]);
    console.log("Clinic  window should display");
   }
 

}
