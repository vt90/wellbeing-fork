import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { DoctorAddAppointmentScheduledPage } from '../doctor-add-appointment-scheduled/doctor-add-appointment-scheduled';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
/**
 * Generated class for the DoctorAppointmentScheduledPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-doctor-appointment-scheduled',
	templateUrl: 'doctor-appointment-scheduled.html',
})
export class DoctorAppointmentScheduledPage {
	
	userId:any="";
	userDetails:any="";
	scheduleInfo:any="";
	requestStatus:any="";
	clinicId:any="";
	
	
	constructor(public navCtrl: NavController, public navParams: NavParams,public loginservice:Loginservice,public restapiService: AllserviceProvider, private  alertCtrl: AlertController) {
		
		//this.clinicId = 1;
		
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
	
	checkClinicId(){
		this.loginservice.getAppClinicId().then(clinicId=>{
		  console.log("app-clinicId:"+clinicId);

		   this.restapiService.CheckClinicValid(this.userId,clinicId)
			  .then(response => {
				  if(response.responseStatus==true){
					console.log(response.response);
					if(response.response.validityStatus==false){
						this.logoutUser();
					}else{
						//this.clinicName = response.response.clinicDetails.clinicName;
						this.clinicId = response.response.clinicDetails.clinicId;
						this.getAllScheduleList();	
					}
					//this.requestStatus=1;
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
	
	goHome(){
		this.navCtrl.setRoot(HomePage);
	}
	
	getAllScheduleList(){
		console.log('userId',this.userId);
		this.restapiService.getAllDoctorScheduleList(this.userId,this.clinicId).then(response => {
			console.log('getAllScheduleList',response);
			if(response.responseStatus=true){
				this.scheduleInfo = response.response.scheduleList;
				// this.clinicName = response.response.assistantList.clinicId;
				// this.assistantName = response.response.assistantList.assistantName;
				// this.assistantEmail = response.response.assistantList.assistantEmail;
				// this.assistantMobile = response.response.assistantList.assistantMobile;
				
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
  
	createScheduleByDoctor(appointmentDay){
		this.navCtrl.push(DoctorAddAppointmentScheduledPage);
	}
	
	editScheduleByDoctor(appointmentDay){
		this.navCtrl.push(DoctorAddAppointmentScheduledPage,{
			appointmentDay:appointmentDay,
			clinicId: this.clinicId
		});
	}
	
	deleteScheduleByDoctor(appointmentDay){
		console.log('appointmentDay',appointmentDay);
		this.restapiService.deleteScheduleByDoctor(this.userId,this.clinicId,appointmentDay).then(response => {
			console.log('getAllScheduleList',response);
			if(response.responseStatus=true){
				if(response.responseStatus.deleteStatus==true){
					let alert = this.alertCtrl.create({ 
						message: response.response.deleteMsg, 
						buttons: [{ text: 'Ok', 
							handler: () => { 
								this.getAllScheduleList();
							} 
						}],
						enableBackdropDismiss: false 
					}); 
					alert.present();
					this.requestStatus=1;
				}else{
					let alert = this.alertCtrl.create({ 
						message: response.response.deleteMsg, 
						buttons: [{ text: 'Ok', 
							handler: () => { 
								this.getAllScheduleList();
							} 
						}],
						enableBackdropDismiss: false 
					}); 
					alert.present();
					this.requestStatus=2;
				}
				
				
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad DoctorAppointmentScheduledPage');
	}

}
 