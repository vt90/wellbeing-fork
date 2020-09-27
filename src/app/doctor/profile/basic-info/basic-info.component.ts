import { Router } from '@angular/router';
import { WindowService } from './../window.service';
import { Component } from '@angular/core';

@Component({
  selector: 'basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent {

  constructor(private windowService: WindowService) { }

  next(){
   this.windowService.setWindowFlags(false,true,false,false,false,false,false);
   console.log("practise info should display");
  }
  
}
