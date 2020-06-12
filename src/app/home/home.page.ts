import { Component } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userRole:any;
  
  constructor(private authService: AuthService) {
      this.getUserRole();

  }
  
  getUserRole(){
    if(this.authService.user.token!=null){
      this.userRole=this.authService.user.role;
    }
    
  


  }


}
