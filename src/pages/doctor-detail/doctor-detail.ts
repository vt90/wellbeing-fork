import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';
import {ViewChild} from '@angular/core';
import { BookAppointmentPage } from '../book-appointment/book-appointment';

/**
 * Generated class for the DoctorDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-doctor-detail',
	templateUrl: 'doctor-detail.html',
})
export class DoctorDetailPage {
	
	@ViewChild(Content) content: Content;
	images = ['clinic-1.jpg','clinic-2.jpg','clinic-3.jpg','clinic-4.jpg','clinic-5.jpg','clinic-6.jpg'];
	userName:any;
	userRole:any;
	userId:any;
	userUniqueId:any;
	id:any;
	doctorDetails:any;
	otherClinicDetail:any=[];
	clinic_id:any;
	doctor_id:any;
	doctor_name:any;
	doctor_clinic_name:any;
	clinic_image:any;
	doctor_specializations:any;
	doctor_sub_specializations:any;
	doctor_about:any;
	doctor_image:any;
	clinic_addresses:any;
	doctor_mobile_no:any;
	doctor_email:any;
	maplink:any;
	visit_type:any;
	visit:any;
	clinicSchedule:any;
	doctor_other_clinics = [];
  

	constructor(public restapiService: AllserviceProvider, public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice) {
		this.doctorDetails 	= navParams.get('doctorDetails');
		this.visit_type 	= navParams.get('visit_type');
		this.checkuserloggedIn();
	}
	
	checkuserloggedIn(){
		this.loginservice.getAppLoginToken().then(userId=>{
			this.restapiService.CheckUserValid(userId)
			.then(response => {
				if(response.responseStatus==true){
					if(response.response.validityStatus==false){
						this.logoutUser();
					}else{
						this.userName = response.response.userDetail.full_name;
						this.userRole = response.response.userDetail.userRole;
						this.userUniqueId = response.response.userDetail.unique_id;
						this.id = response.response.userDetail.id;
						this.userId=userId;
						this.getDoctorDetails();
					}
					//this.requestStatus=1;

				}

			},() =>{

			});
	    })
	}

	getDoctorDetails(){
		// console.log("doctor: ",this.doctorDetails);
		this.restapiService.ViewDoctorDetails(this.doctorDetails,this.userId)
		.then(responsedata => {
			// console.log(responsedata.response);
			if(responsedata.responseStatus==true){
				if(responsedata.response.detailStatus==true){
					this.clinic_id 					= this.doctorDetails.clinic_id;
					this.doctor_id 					= responsedata.response.doctor_id;
					this.doctor_name 				= responsedata.response.doctor_name;
					this.doctor_clinic_name			= responsedata.response.doctor_clinic_name;
					this.visit						= responsedata.response.visit_type;
					this.clinic_image				= responsedata.response.clinic_image;
					this.doctor_specializations 	= responsedata.response.doctor_specializations;
					this.doctor_sub_specializations = responsedata.response.doctor_sub_specializations;
					this.doctor_about			 	= responsedata.response.doctor_about;
					this.doctor_image			 	= responsedata.response.doctor_image;
					this.clinic_addresses			= responsedata.response.clinic_addresses;
					this.clinicSchedule				= responsedata.response.clinicSchedule;
					//this.clinic_addresses_arr		= responsedata.response.clinic_addresses_arr;
					// this.doctor_clinic_images 	= responsedata.response.doctor_clinic_images;
					this.doctor_mobile_no 			= responsedata.response.doctor_mobile_no;
					this.doctor_email 				= responsedata.response.doctor_email;
					this.doctor_other_clinics 		= responsedata.response.doctor_other_clinics;
					this.maplink 					= responsedata.response.mapLink;
					// this.doctors_list.push( this.doctors_list.length );
				}
			}
		});
	}
	
	logoutUser(){
		this.loginservice.clearLogin().then(userId=>{
		  // return email1;
		  //this.emailid=email1;
		  if(userId){
			  //this.isuserLoggedIn=false;
		  }
		  // this.viewCtrl.dismiss();
		  this.navCtrl.setRoot(LoginPage);
	    })
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad DoctorDetailPage');
	} */
	bookAppointment(doctorId, clinicId){
		this.navCtrl.push(BookAppointmentPage,{
			doctorId:doctorId,
			clinicId:clinicId,
			patientId:this.id,
			pUniqueId:this.userUniqueId,
			visit_type:this.visit_type
		});
	}

	showClinicDetails(doctorDetail) {
		console.log("doctorDetail",doctorDetail);
		this.content.scrollToTop();
		this.otherClinicDetail.doctor_id	= this.doctorDetails.doctor_id;
		this.otherClinicDetail.clinic_id	= doctorDetail.id;
		this.otherClinicDetail.visit_type	= doctorDetail.visit_type;
		this.restapiService.ViewDoctorDetails(this.otherClinicDetail,this.userId)
		.then(responsedata => {
			// console.log(responsedata.response);
			if(responsedata.responseStatus==true){
				if(responsedata.response.detailStatus==true){
					this.clinic_id 					= this.otherClinicDetail.clinic_id;
					this.doctor_id 					= responsedata.response.doctor_id;
					this.doctor_name 				= responsedata.response.doctor_name;
					this.doctor_clinic_name			= responsedata.response.doctor_clinic_name;
					this.visit						= responsedata.response.visit_type;
					this.clinic_image				= responsedata.response.clinic_image;
					this.doctor_specializations 	= responsedata.response.doctor_specializations;
					this.doctor_sub_specializations = responsedata.response.doctor_sub_specializations;
					this.doctor_about			 	= responsedata.response.doctor_about;
					this.doctor_image			 	= responsedata.response.doctor_image;
					this.clinic_addresses			= responsedata.response.clinic_addresses;
					this.clinicSchedule				= responsedata.response.clinicSchedule;
					//this.clinic_addresses_arr		= responsedata.response.clinic_addresses_arr;
					// this.doctor_clinic_images 		= responsedata.response.doctor_clinic_images;
					this.doctor_mobile_no 			= responsedata.response.doctor_mobile_no;
					this.doctor_email 				= responsedata.response.doctor_email;
					this.doctor_other_clinics 		= responsedata.response.doctor_other_clinics;
					this.maplink 					= responsedata.response.mapLink;
					// this.doctors_list.push( this.doctors_list.length );
				}
			}
		});
	}
}
