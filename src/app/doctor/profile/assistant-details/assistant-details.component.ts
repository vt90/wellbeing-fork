import { Component } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'assistant-details',
  templateUrl: './assistant-details.component.html',
  styleUrls: ['./assistant-details.component.scss'],
})
export class AssistantDetailsComponent {

  constructor(private windowService: WindowService) { }

  next(){
    this.windowService.setWindowFlags(false,false,false,false,false,false,true);
    console.log("terms and condition window should display");
   }

}
