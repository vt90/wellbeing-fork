import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {
  userRole:string;
  
  constructor(private authService: AuthService) {}
  
  ngOnInit(){
    this.getUserRole();
  }
  getUserRole(){
    if(this.authService.user.token!=null){
      this.userRole=this.authService.user.role;
    }
  }


}
