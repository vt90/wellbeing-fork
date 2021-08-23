import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  @Input() doctorId: string;
  @Input() notes: string[];
  constructor(
    private modalController: ModalController,
    private doctorService: DoctorService,
    private toastController: ToastController
  ) {}
  error: string;
  ngOnInit() {}
  cancel() {
    this.modalController.dismiss();
  }
  addNote(form: NgForm) {
    this.error = '';
    if (!form.form.value.note) {
      this.error = 'Field Required';
    } else {
      this.notes.push(form.form.value.note);

      this.doctorService
        .editDoctorInfo(this.doctorId, { notes: this.notes })
        .then(() => {
          this.toastController
            .create({
              message: 'Note succesfully added.',
              duration: 3000,
              position: 'top',
            })
            .then((toast) => toast.present());
          this.modalController.dismiss();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  onChange(e: any) {
    console.log(e);
  }
}
