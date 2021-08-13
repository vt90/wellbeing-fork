import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-view-all-notes',
  templateUrl: './view-all-notes.component.html',
  styleUrls: ['./view-all-notes.component.scss'],
})
export class ViewAllNotesComponent implements OnInit {
  @Input() notes: string[];
  @Input() doctorId: string;

  constructor(private alertController: AlertController, private toastController: ToastController) {}

  ngOnInit() {
    console.log(this.notes);
    console.log(this.doctorId);
  }
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
            console.log('ID', id);
            console.log('notes after remove', this.notes);
            // this.updateAppointment(status).then(() => {
              this.toastController
                .create({
                  message: 'Note succesfully deleted.',
                  duration: 3000,
                  position: 'top',
                })
                .then((toast) => toast.present());
            // });
          },
        },
      ],
    });

    await alert.present();
  }
}
