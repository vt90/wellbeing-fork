import { Component } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
})
export class AvailabilityComponent {

  constructor(private windowService: WindowService) { }

  next(){
    this.windowService.setWindowFlags(false,false,false,true,false,false,false);
    console.log("Fee structure window should display");
   }

}
