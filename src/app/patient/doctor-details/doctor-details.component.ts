import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Doctor} from '../../model/doctor.model';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss'],
})
export class DoctorDetailsComponent implements OnInit {
  @Input() doc: Doctor;

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {}

  close(){
    this.modalCtrl.dismiss();
  }
}
