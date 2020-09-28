import { Component, EventEmitter,  Output } from '@angular/core';

@Component({
  selector: 'clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.scss'],
})
export class ClinicDetailsComponent  {
  @Output() flags:EventEmitter<boolean[]> = new EventEmitter<boolean[]>();
  
  constructor() { }

  next(){
    this.flags.emit([false,false,false,false,false,true,false]);
   console.log("Assistant  window should display");
   }

}
