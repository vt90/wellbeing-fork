import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';

import { PatientDetailPage } from '../patient-detail/patient-detail';

/**
 * Generated class for the PatientAddDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-patient-add-detail',
	templateUrl: 'patient-add-detail.html',
})
export class PatientAddDetailPage {
	userId:any="";
	userDetails:any="";
	AppointmentDetail:any;
	requestStatus:any="";
	clinicId:any=0;
	clinicName:any="";
	appointmentDetail:any="";
	appointmentInfo:any="";
	appointmentId:any="";

	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider, private formBuilder: FormBuilder, private  alertCtrl: AlertController) {
		this.appointmentInfo 		= navParams.get('appointmentDetails');
		this.appointmentId			= this.appointmentInfo.id;
		this.appointmentDetail	= this.appointmentInfo.appointment_detail;
		
		this.AppointmentDetail = this.formBuilder.group({
			appointmentDetail: ['', Validators.compose([Validators.required])]			
		});
		
		this.checkuserloggedIn();
	}
	
	checkuserloggedIn(){
		this.loginservice.getAppLoginToken().then(userId=>{
			// console.log("app-login-token from get:"+userId);
		  
			this.restapiService.CheckUserValid(userId)
			.then(response => {
			  if(response.responseStatus==true){
				// console.log(response.response);
				if(response.response.validityStatus==false){
					this.logoutUser();
					
				}else{
					this.userDetails = response.response.userDetail;
					//this.userDetails = response.response.userDetail.id;
					this.userId=userId;
					this.checkClinicId();
					// console.log("app-login-token from getab:"+this.userId);
						
					// if(this.assistantId){
						// this.getAssistantDetails(this.assistantId);	
					// }
				}
			  }
			  
			},() =>{
			 
			});  
	    })
	}
	
	logoutUser(){
		this.loginservice.clearLogin().then(userId=>{
			this.navCtrl.setRoot(LoginPage);
		})
	}
	
	checkClinicId(){
		this.loginservice.getAppClinicId().then(clinicId=>{
			// console.log("app-login-token from get:"+clinicId);

			this.restapiService.CheckClinicValid(this.userId,clinicId)
			.then(response => {
				if(response.responseStatus==true){
					// console.log(response.response);
					
					this.clinicName = response.response.clinicDetails.clinicName;
					this.clinicId = response.response.clinicDetails.clinicId;
					// this.getAppointmentDetails();					
				}

			},() =>{

			});
	    })
	}
	
	errorMessagealert(message){
		let alert = this.alertCtrl.create({ title: "Invalid Details",
						subTitle:message, 
						buttons: [{ text: 'Ok' /* , 
							handler: () => { 
								this.platform.exitApp(); 
							}  */
						}] 
					}); 
		alert.present();
	}
	
	addAppointmentDetail(appointmentDetail){
		// console.log(medicine);
		//return false;
		if(appointmentDetail.controls['appointmentDetail'].errors){
			if(appointmentDetail.controls['appointmentDetail'].errors['required']){
				this.errorMessagealert("Please Enter Details about Appointment.");
				return false;
			}
		}
		
		//console.log(this.userId);
		// console.log(appointmentDetail.value);
		// console.log(this.userId);
		// console.log(this.clinicId);
		// console.log(this.appointmentId);
		// return false;
		this.restapiService.addAppointmentDetail(appointmentDetail.value,this.userId,this.clinicId,this.appointmentId)
		.then(response => {
			  // console.log(response);
			if(response.responseStatus==true){
				// console.log(response.response);
				if(response.response.appointmentDetailStatus==true){
					//userDetailMsg
					
					let alert = this.alertCtrl.create({ /* title: response.response.appointmentDetailTitle, */
						message: response.response.appointmentDetailMsg, 
						buttons: [{ text: 'Ok', 
							handler: () => {
								this.appointmentInfo.appointment_detail	= appointmentDetail.value.appointmentDetail;
								this.navCtrl.push(PatientDetailPage,{
									appointmentDetails:this.appointmentInfo
								});
							} 
						}],
						enableBackdropDismiss: false  
					}); 
					alert.present();
				}
			}
				
		});
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad PatientAddDetailPage');
	} */

}
