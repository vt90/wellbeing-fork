import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
import { LabAddAppointmentScheduledPage } from '../lab-add-appointment-scheduled/lab-add-appointment-scheduled';
import { HomePage } from '../home/home';
/**
 * Generated class for the LabAppointmentScheduledPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-lab-appointment-scheduled',
	templateUrl: 'lab-appointment-scheduled.html',
})
export class LabAppointmentScheduledPage {
	
	userId:any="";
	userDetails:any="";
	scheduleInfo:any="";
	requestStatus:any="";
	clinicId:any="";

	constructor(public navCtrl: NavController, public navParams: NavParams,public loginservice:Loginservice,public restapiService: AllserviceProvider, private  alertCtrl: AlertController) {
		this.checkuserloggedIn();
	}
	
	goHome(){
		this.navCtrl.setRoot(HomePage);
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
						console.log(this.userId);
						this.getAllScheduleList();
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
	
	getAllScheduleList(){
		console.log('userId',this.userId);
		this.restapiService.getAllLabScheduleList(this.userId).then(response => {
			console.log('getAllLabScheduleList',response);
			if(response.responseStatus=true){
				this.scheduleInfo = response.response.scheduleList;				
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
  
	createScheduleByLab(appointmentDay){
		this.navCtrl.push(LabAddAppointmentScheduledPage);
	}
	
	editScheduleByLab(appointmentDay){
		this.navCtrl.push(LabAddAppointmentScheduledPage,{
			appointmentDay:appointmentDay
		});
	}
	
	deleteScheduleByLab(appointmentDay){
		console.log('appointmentDay',appointmentDay);
		this.restapiService.deleteScheduleByLab(this.userId,appointmentDay).then(response => {
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

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad LabAppointmentScheduledPage');
	} */
	
	addLabSchedule(){
		this.navCtrl.push(LabAddAppointmentScheduledPage);
	}

}
