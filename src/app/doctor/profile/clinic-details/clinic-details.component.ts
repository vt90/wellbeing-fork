import { Component, OnInit } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.scss'],
})
export class ClinicDetailsComponent  {
  
  constructor(private windowService: WindowService) { }

  next(){
    this.windowService.setWindowFlags(false,false,false,false,false,true,false);
    console.log("Assistant  window should display");
   }

}
