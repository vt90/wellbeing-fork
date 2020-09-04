import { Component } from '@angular/core';
import {RegnoVerificationService} from '../services/regno-verification.service';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage {
    rNo: string;


    constructor(private rNoService: RegnoVerificationService) {
    }

    onValidate() {  // Written here for demo purpose
        this.rNoService.getDoctorDetails(this.rNo).subscribe(
            (response) => {
               console.log(response);
               JSON.stringify(response);
               },
            (err) => {console.log( 'No response' + err); },
        );
    }


}
