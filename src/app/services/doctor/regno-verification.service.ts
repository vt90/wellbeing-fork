import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegnoVerificationService {
  private _endpoint = 'https://mciindia.org/MCIRest/open/getDataFromService?service=searchDoctor';

  constructor(private httpClient: HttpClient) {}

  getDoctorDetails(rNo: string){
    return this.httpClient.post(`${this._endpoint}`, { registrationNo:  rNo});
  }
}
