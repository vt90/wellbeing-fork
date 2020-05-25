import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';

import { BookAppointmentPage } from '../book-appointment/book-appointment';
import { LabBookAppointmentPage } from '../lab-book-appointment/lab-book-appointment';
import { ViewPrescriptionPage } from '../view-prescription/view-prescription';
import { HomePage } from '../home/home';
//import { LabViewReportsPage } from '../lab-view-reports/lab-view-reports';
import { ViewReportPage } from '../view-report/view-report';
/**
 * Generated class for the ActiveAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-active-appointment',
	templateUrl: 'active-appointment.html',
})
export class ActiveAppointmentPage {
	status:any;
	userId:any="";
	userDetails:any="";
	requestStatus:any="";
	doctorActiveAppointmentListInfo:any="";
	labActiveAppointmentListInfo:any="";
	appointmentId:any="";

	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider, private  alertCtrl: AlertController) {
		this.status = "doctor";
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
					this.userId=userId;
					this.getPatientActiveAppointmentsList();
				}
			  }
			  
			},() =>{
			 
			});  
	    })
	}
	
	getPatientActiveAppointmentsList(){
		this.restapiService.GetPatientActiveAppointmentsList(this.userId).then(response => {
			console.log('GetPatientActiveAppointmentsList',response);
			if(response.responseStatus=true){
				this.doctorActiveAppointmentListInfo = response.response.patientDoctorActiveAppointmentList;
				this.labActiveAppointmentListInfo = response.response.patientLabActiveAppointmentList;
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3;
		}); 
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
	
	cancelDocAppointmentByPatient(appointmentId) {
		let alert = this.alertCtrl.create({ message: "Are you sure you want to cancel this report?", 
			buttons: [{ text: 'Ok', 
				handler: () => { 
					this.restapiService.CancelDocAppointmentByPatient(this.userId,appointmentId).then(response => {
						// console.log('getAllScheduleList',response);
						if(response.responseStatus==true){
							this.getPatientActiveAppointmentsList();
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
	
	cancelLabAppointmentByPatient(appointmentId) {
		let alert = this.alertCtrl.create({ message: "Are you sure you want to cancel this report?", 
			buttons: [{ text: 'Ok', 
				handler: () => { 
					this.restapiService.CancelLabAppointmentByPatient(this.userId,appointmentId).then(response => {
						// console.log('getAllScheduleList',response);
						if(response.responseStatus==true){
							this.getPatientActiveAppointmentsList();
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

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad ActiveAppointmentPage');
	} */
	
	goHome(){
		this.navCtrl.setRoot(HomePage);
	}
	
	rescheduleAppointment(appointmentId){
		this.navCtrl.push(BookAppointmentPage,{
			appointmentId:appointmentId
		});
	}
	
	rescheduleAppointmentForLab(appointmentId,labId){
		this.navCtrl.push(LabBookAppointmentPage,{
			labId:labId,
			appointmentId:appointmentId
		});
	}
	
	viewLabPrescription(appointmentId){
		/* this.navCtrl.push(ViewPrescriptionPage,{
			appointmentId:appointmentId
		}); */
		this.navCtrl.push(ViewReportPage,{
			appointmentId:appointmentId,
			action:'ViewLabReports'
		});
	}
	
	viewPrescription(appointmentId){
		this.navCtrl.push(ViewPrescriptionPage,{
			appointmentId:appointmentId
		});
	}

}
