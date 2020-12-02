import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  db = firebase.database();
  specs = [];

  constructor() {
    const specializationRef= this.db.ref('/specializations');
    specializationRef.on('value',(snapshot)=>{
      this.specs  = snapshot.val();
    });
  }
}
