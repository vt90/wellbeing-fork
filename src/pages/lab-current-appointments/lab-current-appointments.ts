import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';

import { LabViewReportsPage } from '../lab-view-reports/lab-view-reports';
import { LabViewAppointmentHistoryPage } from '../lab-view-appointment-history/lab-view-appointment-history';
import { HomePage } from '../home/home';

/**
 * Generated class for the LabCurrentAppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-lab-current-appointments',
  templateUrl: 'lab-current-appointments.html',
})
export class LabCurrentAppointmentsPage {
	status:any;
	c1:any;
	test = [];
	userId:any="";
	userDetails:any="";
	requestStatus:any="";
	activeAppointmentListInfo:any="";
	archiveAppointmentListInfo:any="";
	appointmentId:any="";
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider, private  alertCtrl: AlertController) {
		this.status = "active";
		this.checkuserloggedIn();
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad LabCurrentAppointmentsPage');
	} */
	
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
					this.getLabAppointmentsList();
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
	
	getLabAppointmentsList(){		
		this.restapiService.GetLabAppointmentsList(this.userId).then(response => {
			console.log('getAllPatientListByLab',response);
			if(response.responseStatus=true){
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
		if (c1.appointment_status == 'Pending' || c1.appointment_status == 'Rescheduled' || c1.appointment_status == 'Cancelled') {
			this.test[c1.appointmentId] = 0;
		} else if (c1.appointment_status == 'Confirmed'){
			this.test[c1.appointmentId] = 1; 
		}
		this.c1	= c1;
		this.appointmentId	= c1.appointmentId;
		this.changeLabAppointmentStatus();
	}
	
	changeLabAppointmentStatus(){
		this.restapiService.ChangeLabAppointmentStatus(this.c1, this.userId).then(response => {
			if(response.responseStatus==true){
				this.getLabAppointmentsList();
				this.requestStatus=1;
			} else{
				if(response.alreadyStatus==true){
					let alert = this.alertCtrl.create({
								message:"This slot is already confirmed, Kindly reschedule or cancel it", 
								buttons: [{ text: 'Ok', 
									handler: () => {
										this.getLabAppointmentsList();
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
	
	completeAppointment(appointmentDetails){	
		let alert = this.alertCtrl.create({ message: "Are you sure you want to complete this Appointment?", 
			buttons: [{ text: 'Ok', 
				handler: () => { 	
					this.restapiService.CompleteLabAppointmentStatus(this.userId, 'Completed', appointmentDetails.id).then(response => {
						if(response.responseStatus==true){
							this.navCtrl.push(LabViewReportsPage,{
								appointmentDetails:appointmentDetails,
								action:'uploadViewLabReports'
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
	
	uploadReports(appointmentDetails){
		this.navCtrl.push(LabViewReportsPage,{
			appointmentDetails:appointmentDetails,
			action:'uploadViewLabReports'
		});
	}
	
	goHome(){
		this.navCtrl.setRoot(HomePage);
	}
	
	viewHistory(appointmentDetails){
		this.navCtrl.push(LabViewAppointmentHistoryPage,{
			appointmentDetails:appointmentDetails
		});
	}

}
