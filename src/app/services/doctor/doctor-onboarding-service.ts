import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {Doctor} from '../../model/doctor.model';
import {DoctorService} from './doctor.service';
import {Clinic} from '../../model/clinic.model';
import {AlertController, LoadingController} from '@ionic/angular';
import {FirebaseStorageService} from '../firebase-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorOnboardingService {

  clinic: Clinic = null;
  currentDoctor = new BehaviorSubject<Doctor>(null);
  private uploadFile: File;

  constructor(db: AngularFireDatabase,
              private router: Router,
              private doctorService: DoctorService,
              private firebaseStorageService: FirebaseStorageService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  getCurrentDoctor() {
    return this.currentDoctor.asObservable();
  }

  saveDoctorToDB(termsAcceptedDatetime: string) {
    const doctor = this.currentDoctor.getValue();
    doctor.termsAndConditionsAcceptedAt = termsAcceptedDatetime;
    this.currentDoctor.next(doctor);
    this.uploadCert();
  }

  setClinicData(c: Clinic){
    this.clinic = c;
  }

  setDoctor(d: Doctor){
    this.currentDoctor.next(d);
  }

  setCertFile(uploadFile: File) {
    this.uploadFile = uploadFile;
  }

  private uploadCert() {
    this.loadingCtrl.create().then(el => {
      el.present().then();
    });
    const doctor = this.currentDoctor.getValue();
    const extension = doctor.certificate.substring(doctor.certificate.lastIndexOf('.') + 1);
    const fname = `/${doctor.id}/certificate.` + extension;

    this.firebaseStorageService.checkIfNameExists(fname).then(exists => {
      if (!exists) {
        this.firebaseStorageService.uploadModule(this, this.uploadFile, fname, extension, this.uploadCallback);
      } else {
        this.loadingCtrl.dismiss()
          .then(() => {
            return this.alertCtrl.create({
              header: 'Replace?',
              message: 'Certificate has already been uploaded. Replace existing file?',
              buttons: [{text: 'Yes', role: 'ok'}, {text: 'No', role: 'cancel'}]
            });
          })
          .then(el => {
            el.present().then();
            return el.onDidDismiss();
          })
          .then(retVal => {
            if (retVal.role === 'ok') {
              this.firebaseStorageService.uploadModule(this, this.uploadFile, fname, extension, this.uploadCallback);
            }
          });
      }
    });
  }

  uploadCallback(obj: any, url: string, path: string, progress: number, err: string) {
    if (url) {
      obj.loadingCtrl.dismiss().then();
      const doctor = obj.currentDoctor.getValue();
      doctor.certificate = path;
      obj.doctorService.addDoctor(doctor);
      // TODO: do this differently. to be discussed
      // this.doctorService.addClinicData(this.clinic, this.currentDoctor.getValue().id).then(r => console.log(r));
      obj.router.navigate(['doctor']).then();
      console.log('link', url);
    } else if (err) {
      obj.loadingCtrl.dismiss().then();
      obj.alertCtrl.create({
        header: 'Error',
        message: err,
        buttons: [{text: 'OK', role: 'cancel'}]
      }).then(el => {
        el.present().then();
        return el.onDidDismiss();
      });
    } else {
      console.log('upload at ', progress);
    }
  }
}
