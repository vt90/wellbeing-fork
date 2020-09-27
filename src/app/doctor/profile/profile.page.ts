import { WindowService } from './window.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {

  window1: boolean = true;
  window2: boolean = false;
  window3: boolean = false;
  window4: boolean = false;
  window5: boolean = false;
  window6: boolean = false;
  window7: boolean = false;
  
  
  constructor(private ws: WindowService) { }

  ngOnInit(){
    this.ws.getFlags().subscribe(flags =>{
      if(flags){
        console.log(flags);
        this.window1 = flags[0];
        this.window2 = flags[1];
        this.window3 = flags[2];
        this.window4 = flags[3];
        this.window5 = flags[4]; 
        this.window6 = flags[5];
        this.window7 = flags[6];
      }
    });
  }
}
