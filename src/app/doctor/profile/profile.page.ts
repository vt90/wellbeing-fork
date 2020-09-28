import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {
  flags: boolean[];
  window1: boolean = true;
  window2: boolean = false;
  window3: boolean = false;
  window4: boolean = false;
  window5: boolean = false;
  window6: boolean = false;
  window7: boolean = false;
  
  
  constructor() {
  }

  setFlags(event: boolean[]){
    this.flags = event;
    if(this.flags){
      this.window1 = this.flags[0];
      this.window2 = this.flags[1];
      this.window3 = this.flags[2];
      this.window4 = this.flags[3];
      this.window5 = this.flags[4];
      this.window6 = this.flags[5];
      this.window7 = this.flags[6];
      console.log(this.flags);
    }
  }
 
}
