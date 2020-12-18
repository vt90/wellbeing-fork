import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent {

  constructor(private router: Router,
              private modalCtrl: ModalController) {
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
