import { Component } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrls: ['./fee-structure.component.scss'],
})
export class FeeStructureComponent  {
  
  constructor(private windowService: WindowService) { }

  next(){
    this.windowService.setWindowFlags(false,false,false,false,true,false,false);
    console.log("Clinic  window should display");
   }
 

}
