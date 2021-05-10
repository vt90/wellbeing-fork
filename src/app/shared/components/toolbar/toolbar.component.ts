import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {AuthUser} from '../../../model/auth-user.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  user: AuthUser;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.user;
  }

}
