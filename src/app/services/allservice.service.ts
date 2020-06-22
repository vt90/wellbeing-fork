import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { Doctor } from './DoctorCrud';

@Injectable({
  providedIn: 'root'
})
export class AllserviceService {
  // bookingListRef: any;
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;
  
  constructor(
    private db: AngularFireDatabase
  ) { }

    // Create
    createBooking(dr: Doctor) {
      // debugger
      this.bookingListRef = this.db.list('/list');
            if (dr) {
              return  this.bookingListRef.push({
              fullname: dr.fullname,
                mobile: dr.mobile,
                email: dr.email,
                password: dr.password,
                confirmpass: dr.confirmpass,
                registrationID: dr.registrationID,
                hospitalName: dr.hospitalName,
                specialization: dr.specialization,
                // specializationId: dr.SpecializationId,
                terms: dr.terms
            });
            }
      // console.log("Doctor request ", JSON.stringify(dr))
      // return this.bookingListRef.push({
      //   fullname: dr.fullname,
      //   mobile: dr.mobile,
      //   email: dr.email,
      //   password: dr.password,
      //   confirmpass: dr.confirmpass,
      //   registrationID: dr.registrationID,
      //   hospitalName: dr.hospitalName,
      //   specialization: dr.Specialization,
      //   specializationId: dr.SpecializationId,
      //   terms: dr.terms
      // }).catch((error) =>{
      //   console.log("push error", error)
      // })
    }

    // // Get Single
    // getBooking(id: string) {
    //   this.bookingRef = this.db.object('/doctor/' + id);
    //   return this.bookingRef;
    // }

    // // Get List
    // getBookingList() {
    //   this.bookingListRef = this.db.list('/doctor');
    //   return this.bookingListRef;
    // }

    // // Update
    // updateBooking(id, dr: Doctor) {
    //   return this.bookingRef.update({
    //     name: dr.fullname,
    //     mobile: dr.mobile,
    //     email: dr.email,
    //     password: dr.password,
    //     confirmpass: dr.confirmpass,
    //     registrationID: dr.registrationID,
    //     hospitalName: dr.hospitalName,
    //     specialization: dr.Specialization,
    //     specializationId: dr.SpecializationId,
    //     terms: dr.terms
    //   })
    // }

    // // Delete
    // deleteBooking(id: string) {
    //   this.bookingRef = this.db.object('/doctor/' + id);
    //   this.bookingRef.remove();
    // }
}
