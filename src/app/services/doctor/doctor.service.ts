import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private db: firebase.database.Database;

  constructor(private adb: AngularFireDatabase) {
    this.db = adb.database;
  }

  retrieveSpecializations() {
    let specs: string[];
    return this.db.ref('/specializations/').once('value').then(snapshot => {
      specs = snapshot.val();
      return specs;
    });
  }
}
