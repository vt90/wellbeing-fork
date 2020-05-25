import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the AppointmemtHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-appointmemt-history',
	templateUrl: 'appointmemt-history.html',
})
export class AppointmemtHistoryPage {
	userId:any="";
	userDetails:any="";
	requestStatus:any="";
	clinicId:any=0;
	clinicName:any="";
	appointmentDetails:any="";
	patientName:any="";
	patientMobileNo:any="";
	patientLocation:any="";
	appointmentList:any="";

	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider,private iab: InAppBrowser) {
		this.appointmentDetails 	= navParams.get('appointmentDetails');
		console.log("this.appointmentDetails",this.appointmentDetails);
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
					this.getAppointmentHistoryList();
					
				}

			},() =>{

			});
	    })
	}
	
	getAppointmentHistoryList(){
		this.restapiService.GetAppointmentHistoryList(this.userId, this.appointmentDetails).then(response => {
			if(response.responseStatus=true){
				this.patientName 		= response.response.patient_name;
				this.patientMobileNo 	= response.response.patient_mobile_no;
				this.patientLocation 	= response.response.patient_location;
				this.appointmentList 	= response.response.appointmentDetail;
				this.requestStatus=1;
			} else{
				
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	viewPrescription(path){
		console.log('path',path);
		//return false;
		this.iab.create(path,'_self',{location:'no'});
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad AppointmemtHistoryPage');
	} */
}
