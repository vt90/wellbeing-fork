import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController  } from 'ionic-angular';

import { NotificationPage } from '../notification/notification';
import { SearchDoctorPage } from '../search-doctor/search-doctor';
import { ActiveAppointmentPage } from '../active-appointment/active-appointment';
import { ReportsPage } from '../reports/reports';
import { SharedReportsPage } from '../shared-reports/shared-reports';
import { PharmacyPage } from '../pharmacy/pharmacy';
import { SearchLabPage } from '../search-lab/search-lab';

import { DocCurrentAppointmentsPage } from '../doc-current-appointments/doc-current-appointments';
import { DoctorProfilePage } from '../doctor-profile/doctor-profile';
import { DoctorAppointmentScheduledPage } from '../doctor-appointment-scheduled/doctor-appointment-scheduled';
import { AssistantListPage } from '../assistant-list/assistant-list';
import { SharedDocReportsPage } from '../shared-doc-reports/shared-doc-reports';
import { DoctorLeavePage } from '../doctor-leave/doctor-leave';
import { DocRegisterPatientPage } from '../doc-register-patient/doc-register-patient';
import { DocAddAppointmentPage } from '../doc-add-appointment/doc-add-appointment';
import { LabProfilePage } from '../lab-profile/lab-profile';
import { LabClosedPage } from '../lab-closed/lab-closed';
import { LabAppointmentScheduledPage } from '../lab-appointment-scheduled/lab-appointment-scheduled';
import { LabCurrentAppointmentsPage } from '../lab-current-appointments/lab-current-appointments';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';
import { SelectClinicPage } from '../select-clinic/select-clinic';
import { SearchbarPage } from '../searchbar/searchbar';
import { LabViewReportsPage } from '../lab-view-reports/lab-view-reports';
import { DocAddClinicPage } from '../doc-add-clinic/doc-add-clinic';
import { CreateAssistantPage } from '../create-assistant/create-assistant';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	userName:any;
	userRole:any;
	userId:any;
	id:any;
	clinicDetails:any=[];
	clinicName:any="";
	clinicId:any="";
	turnCount:any="";
	requestStatus:any;

	constructor(public restapiService: AllserviceProvider,public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,public loginservice:Loginservice, private  alertCtrl: AlertController,private iab: InAppBrowser) {
		
		/* this.clinicDetails = navParams.get('clinicDetails');
		
		console.log("clinicDetails",this.clinicDetails); */
		
		this.checkuserloggedIn();
		
		//this.navCtrl.setRoot(HomePage);
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad HomePage');
		this.checkuserloggedIn();
	}
	
	checkClinicId(){
		this.loginservice.getAppClinicId().then(clinicId=>{
			console.log("app-login-token from get:"+clinicId);

			this.restapiService.CheckClinicValid(this.userId,clinicId)
			.then(response => {
				if(response.responseStatus==true){
					// console.log(response.response);
					
					this.clinicDetails = response.response.clinicDetails;
					this.clinicName = response.response.clinicDetails.clinicName;
					this.clinicId = response.response.clinicDetails.clinicId;
					this.getClinicSlotwiseUpdatedActiveTurn();
					// console.log("abc: "+ JSON.stringify(this.clinicDetails));
					// this.navCtrl.push(ActiveAppointmentPage);
					//this.requestStatus=1;
				}else{
					if((this.userRole == "doctor" || this.userRole == "assistant")){
						if(this.userRole == "doctor"){
							this.navCtrl.setRoot(SelectClinicPage,{
								action:'dashboard'
							});
						}
						if(this.userRole == "assistant"){
							this.navCtrl.setRoot(SelectClinicPage,{
								action:'assistantDashboard'
							});
						}
					}
				}

			},() =>{
				
			});
	    })
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
						this.userName = response.response.userDetail.full_name;
						this.userRole = response.response.userDetail.userRole;
						this.id = response.response.userDetail.id;
						this.userId=userId;
						/* if(this.userRole == "doctor" || this.userRole == "assistant"){
							this.checkClinicId();
							// if(this.clinicDetails.clinic_name){
								// this.clinicName = this.clinicDetails.clinic_name;
							// }
							console.log("clinicDetails: "+this.clinicDetails); return false;
						} */
						// console.log(response.response);
						if(response.response.userDetail.action == 'uploadDoctorDocs'){
							this.navCtrl.setRoot(LabViewReportsPage,{
								action:'uploadDoctorDocs'
							});
							//this.navCtrl.setRoot(DocAddClinicPage);
						}else if(response.response.userDetail.action == 'addClinic'){
							this.navCtrl.setRoot(DocAddClinicPage,{
								action:"addClinic"
							});	
							//this.navCtrl.setRoot(DocAddClinicPage);
						}else if(response.response.userDetail.action == 'addAssistant'){
							this.navCtrl.setRoot(CreateAssistantPage,{
								action:"addAssistant"
							});
							// this.navCtrl.setRoot(CreateAssistantPage);
						}else if(response.response.userDetail.action == 'uploadLabDocs'){
							this.navCtrl.setRoot(LabViewReportsPage,{
								action:'uploadLabDocs'
							});
							// this.navCtrl.setRoot(LabViewReportsPage);
						}/*  else if(response.response.userDetail.action == 'dashboard'){
							this.navCtrl.setRoot(SelectClinicPage,{
								action:'dashboard'
							});
							//this.navCtrl.setRoot(SelectClinicPage);
						}else if(response.response.userDetail.action == 'assistantDashboard'){
							this.navCtrl.setRoot(SelectClinicPage,{
								action:'assistantDashboard'
							});
							//this.navCtrl.setRoot(SelectClinicPage);
						} *//* else {									
							// this.navCtrl.setRoot(HomePage).then(() => {
								// const index = this.navCtrl.getActive().index;
								// this.navCtrl.remove(0, index);
							// });
							this.navCtrl.setRoot(HomePage);
						} */
						
						if((this.userRole == "doctor" || this.userRole == "assistant")){
							this.checkClinicId();
							// console.log("clinicDetails: "+this.clinicDetails);
							/* if(this.userRole == "doctor" && !this.clinicDetails){
								this.navCtrl.setRoot(SelectClinicPage,{
									action:'dashboard'
								});
							}
							if(this.userRole == "assistant" && !this.clinicDetails){
								this.navCtrl.setRoot(SelectClinicPage,{
									action:'assistantDashboard'
								});
							} */
						}
					}
					//this.requestStatus=1;					
				}

			},() =>{

			});
	    })
	}
	
	getClinicSlotwiseUpdatedActiveTurn(){
		this.restapiService.GetClinicSlotwiseUpdatedActiveTurn(this.userId,this.clinicId).then(response => {
			if(response.responseStatus=true){
				this.turnCount = response.response.turnCount;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	updateAppointmentTurn(){
		let alert = this.alertCtrl.create({ message: "Are you sure you want to Update the turn?", 
			buttons: [{ text: 'Ok', 
				handler: () => {
					this.restapiService.UpdateAppointmentTurn(this.userId,this.clinicId)
					.then(response => {
						// console.log(response);
						if(response.responseStatus==true){
							// console.log(response.response);
							if(response.response.appointmentTurnStatus==true){
								
								let alert = this.alertCtrl.create({ message: response.response.appointmentTurnMsg, 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											this.getClinicSlotwiseUpdatedActiveTurn();
										} 
									}],
									enableBackdropDismiss: false	 
								}); 
								alert.present();
							}else{
								let alert = this.alertCtrl.create({ message: response.response.appointmentTurnMsg, 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											this.getClinicSlotwiseUpdatedActiveTurn();
										} 
									}],
									enableBackdropDismiss: false	
								}); 
								alert.present();
							}
						}				
					});
				} 
			}, { text: 'Cancel', 
				handler: () => {
				}
			}],
			enableBackdropDismiss: false 
		}); 
		alert.present();
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
		  //console.log("app-login-token from get:"+userId);
	    })
	}
  
	openNotifications(){
		this.navCtrl.push(NotificationPage);
	} 
	searchDoctor(){
		this.navCtrl.push(SearchDoctorPage);
	}
	activeAppointment(){
		this.navCtrl.push(ActiveAppointmentPage);
	}
	openReports(){
		this.navCtrl.push(ReportsPage);
	}
	openShareReports(){
		this.navCtrl.push(SharedReportsPage);
	}
	openPharmacy(){
		//this.navCtrl.push(PharmacyPage);
		//this.iab.create('https://www.google.co.in/maps','_self',{location:'yes'});
	}
	searchLab(){
		this.navCtrl.push(SearchLabPage);
	}
	openSearch(){
		this.navCtrl.push(SearchbarPage);
	}

	// role doctor
	docCurrentAppointment(){
		this.navCtrl.push(DocCurrentAppointmentsPage);  
	}
	docProfile(){
		this.navCtrl.push(DoctorProfilePage);
	}
	scheduleList(){
		this.navCtrl.push(DoctorAppointmentScheduledPage);
	}
	assistantList(){
		this.navCtrl.push(AssistantListPage);
	}
	openShareDocReports(){
		this.navCtrl.push(SharedDocReportsPage);
	}
	docIsOnLeave(){
		this.navCtrl.push(DoctorLeavePage);
	}
	regPatient(){
		this.navCtrl.push(DocRegisterPatientPage);
	}
	docAddAppointment(){ 
		this.navCtrl.push(DocAddAppointmentPage);
	}
   
  
	// role lab
	labProfile(){
		this.navCtrl.push(LabProfilePage);
	}
	labClosed(){
		this.navCtrl.push(LabClosedPage);
	}
	scheduleListLab(){
		this.navCtrl.push(LabAppointmentScheduledPage);
	}
	labCurrentAppointment(){
		this.navCtrl.push(LabCurrentAppointmentsPage);
	}
}  
