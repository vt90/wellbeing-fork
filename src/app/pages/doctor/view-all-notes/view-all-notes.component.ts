import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
  selector: 'app-view-all-notes',
  templateUrl: './view-all-notes.component.html',
  styleUrls: ['./view-all-notes.component.scss'],
})
export class ViewAllNotesComponent implements OnInit {
  @Input() notes: string[];
  @Input() doctorId: string;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {}
  async delete(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'confirm-alert',
      header: 'Alert!',
      message: 'Are you Sure?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Yes',
          handler: () => {
            this.notes.splice(id, 1);

            this.doctorService
              .editDoctorInfo(this.doctorId, { notes: this.notes })
              .then(() => {
                this.toastController
                  .create({
                    message: 'Note succesfully deleted.',
                    duration: 3000,
                    position: 'top',
                  })
                  .then((toast) => toast.present());
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
      ],
    });

    await alert.present();
  }
}
