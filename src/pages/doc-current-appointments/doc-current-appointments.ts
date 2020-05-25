import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';

import { AppointmemtHistoryPage } from '../appointmemt-history/appointmemt-history';
import { PatientDetailPage } from '../patient-detail/patient-detail';
import { HomePage } from '../home/home';
/**
 * Generated class for the DocCurrentAppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-doc-current-appointments',
	templateUrl: 'doc-current-appointments.html',
})
export class DocCurrentAppointmentsPage {
	status:any;
	c1:any;
	test = [];
	userId:any="";
	userDetails:any="";
	requestStatus:any="";
	activeAppointmentListInfo:any="";
	archiveAppointmentListInfo:any="";
	clinicId:any=0;
	clinicName:any="";
	appointmentId:any="";
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider, private  alertCtrl: AlertController) {
		this.status = "active";
		this.checkuserloggedIn();
	}
	
	checkuserloggedIn(){
		this.loginservice.getAppLoginToken().then(userId=>{
		  console.log("app-login-token from get:"+userId);
		  
			this.restapiService.CheckUserValid(userId)
			.then(response => {
			  if(response.responseStatus==true){
				console.log(response.response);
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
	
	errorMessagealert($message){
		let alert = this.alertCtrl.create({ title: "Invalid Details",
						message:$message, 
						buttons: [{ text: 'Ok'}] 
					}); 
		alert.present();
	}
	
	checkClinicId(){
		this.loginservice.getAppClinicId().then(clinicId=>{
		  console.log("app-login-token from get:"+clinicId);

			this.restapiService.CheckClinicValid(this.userId,clinicId)
			.then(response => {
				if(response.responseStatus==true){
					console.log(response.response);
					
					this.clinicName = response.response.clinicDetails.clinicName;
					this.clinicId = response.response.clinicDetails.clinicId;
					this.getClinicwiseDocAppointmentsList();
					
				}

			},() =>{

			});
	    })
	}
	
	getClinicwiseDocAppointmentsList(){
		this.restapiService.GetClinicwiseDocAppointmentsList(this.userId,this.clinicId).then(response => {
			console.log('GetClinicwiseDocAppointmentsList',response);
			if(response.responseStatus==true){
				this.activeAppointmentListInfo = response.response.activeList;
				this.archiveAppointmentListInfo = response.response.archiveList;				
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	onChange(c1){
		let alert = this.alertCtrl.create({ message: "Are you sure you want to change status of this Appointment?", 
			buttons: [{ text: 'Ok', 
				handler: () => { 
					if (c1.appointment_status == 'Pending' || c1.appointment_status == 'Rescheduled' || c1.appointment_status == 'Cancelled') {
						this.test[c1.appointmentId] = 0;
					} else if (c1.appointment_status == 'Confirmed'){
						this.test[c1.appointmentId] = 1; 
					}
					this.c1	= c1;
					this.appointmentId	= c1.appointmentId;
					this.changeDoctorAppointmentStatus();
				}
			},{
				text: 'Cancel', 
				handler: () => { 
				}
			}],
			enableBackdropDismiss: false 
		}); 
		alert.present();
	}
	
	changeDoctorAppointmentStatus(){
		this.restapiService.ChangeDoctorAppointmentStatus(this.c1,this.userId).then(response => {
			if(response.responseStatus==true){
				this.getClinicwiseDocAppointmentsList();
				this.requestStatus=1;
			} else{
				if(response.alreadyStatus==true){
					let alert = this.alertCtrl.create({
								message:"This slot is already confirmed, Kindly reschedule or cancel it", 
								buttons: [{ text: 'Ok', 
									handler: () => {
										this.getClinicwiseDocAppointmentsList();
									}
								}],
								enableBackdropDismiss: false
							}); 
					alert.present();
				}
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	/* ionViewDidLoad() {
		console.log('ionViewDidLoad DocCurrentAppointmentsPage');
	} */
	completeAppointment(appointmentDetails){
		let alert = this.alertCtrl.create({ message: "Are you sure you want to complete this Appointment?", 
			buttons: [{ text: 'Ok', 
				handler: () => { 
					this.restapiService.CompleteDoctorAppointment(this.userId, 'Completed', appointmentDetails.id).then(response => {
						if(response.responseStatus==true){
							this.navCtrl.push(PatientDetailPage,{
								appointmentDetails:appointmentDetails
							});
							this.requestStatus=1;
						} else{
							this.requestStatus=2;
						}
					},() =>{
						this.requestStatus=3; 
					}); 
				}
			},{
				text: 'Cancel', 
				handler: () => { 
				}
			}],
			enableBackdropDismiss: false 
		}); 
		alert.present();
		
	}
	
	addPrescription(appointmentDetails){
		this.navCtrl.push(PatientDetailPage,{
			appointmentDetails:appointmentDetails
		});
	}
	
	viewHistory(appointmentDetails){
		this.navCtrl.push(AppointmemtHistoryPage,{
			appointmentDetails:appointmentDetails
		});
	}
	
	goHome(){
		this.navCtrl.setRoot(HomePage);
	}
}
