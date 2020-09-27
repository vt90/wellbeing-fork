import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'practise-info',
  templateUrl: './practise-info.component.html',
  styleUrls: ['./practise-info.component.scss'],
})
export class PractiseInfoComponent {
 
  constructor(private windowService: WindowService) { }

  next(){
    this.windowService.setWindowFlags(false,false,true,false,false,false,false);
    console.log("Availability window should display");
   }

}
