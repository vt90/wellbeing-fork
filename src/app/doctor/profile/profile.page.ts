import {Component, OnInit} from '@angular/core';
import {Doctor} from '../../model/doctor.model';
import {AuthService} from '../../services/auth.service';
import {DoctorService} from '../../services/doctor/doctor.service';
import {Clinic} from '../../model/clinic.model';
import {AlertController} from '@ionic/angular';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    doctor: Doctor = null;
    userId: string;
    clinics: Clinic[];
    changePassword: boolean;

    constructor(private authService: AuthService,
                private doctorService: DoctorService,
                public alertCtrl: AlertController) {
    }

    ngOnInit() {
        this.userId = this.authService.userID;
        this.doctorService.getDoctorById(this.userId).then(doctor => {
            this.doctor = doctor;
            this.clinics = doctor.clinics;
        });
    }

    onProfilePicChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = (e) => { // called once readAsDataURL is completed
                this.doctor.profilePic = e.target.result;
            };
        }
    }

    removeProfilePic() {
        this.alertCtrl.create({
            message: 'Do you want to remove Profile Pic?',
            buttons: [
                {
                    text: 'Yes',
                    role: 'cancel',
                    handler: () => {
                        this.doctor.profilePic = null;
                    }
                },
                {
                    text: 'No',
                    handler: () => {
                        console.log('no change in profile pic');
                    }
                }
            ]
        }).then((alert) => {
            alert.present();
            return alert.onDidDismiss();
        });
    }

    newPassword(pwdForm: NgForm) {
        if (pwdForm.invalid) {
            return;
        }
        const newPwd = pwdForm.value.nPass;
        this.authService.changePassword(this.doctor.email, newPwd).then(() => {
            console.log();
            this.alertCtrl.create({
                message: 'Password updated successfully',
                buttons: ['OK']
            }).then((alert) => {
                alert.present();
                return alert.onDidDismiss();
            });
        });
    }

    save(profileForm: NgForm) {
        if (profileForm.invalid) {
            return;
        }
        this.doctorService.addDoctor(this.doctor, this.userId);
        return this.alertCtrl.create({
            message: 'Profile updated successfully',
            buttons: ['OK']
        }).then((alert) => alert.present());
    }
}
