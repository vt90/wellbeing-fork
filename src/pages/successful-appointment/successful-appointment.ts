import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
// import { ActiveAppointmentPage } from '../active-appointment/active-appointment';
import { HomePage } from '../home/home';

/**
 * Generated class for the SuccessfulAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-successful-appointment',
	templateUrl: 'successful-appointment.html',
})
export class SuccessfulAppointmentPage {
	userId:any="";
	userRole:any="";
	userDetails:any="";
	bookAppointmentDetails: any;
	// doctorId: any;
	clinicId: any;
	doctorUniqueId: any;
	doctorName: any;
	clinicName: any;
	doctorImage: any;
	selectTimeArr = [];
	daySlot: any;
	timeInterval: any;
	requestStatus: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider) {
		this.bookAppointmentDetails = navParams.get('bookAppointmentDetails');
		console.log(this.bookAppointmentDetails);
		this.clinicId = navParams.get('clinicId');
		
		this.checkuserloggedIn();
		this.selectTimeArr	= this.bookAppointmentDetails.selectTime.split("_");
		this.timeInterval = this.selectTimeArr[0];
		this.daySlot = this.selectTimeArr[1];
		this.getDoctorDetailByClinicId();
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
						console.log("userDetails: ",this.userDetails);
						this.userRole = response.response.userDetail.userRole;
						//this.userDetails = response.response.userDetail.id;
						this.userId=userId;
						// console.log("app-login-token from getab:"+this.userId);
						this.checkClinicId();
					}
				}
				  
			},() =>{
				 
			});  
	    })
	}
	
	checkClinicId(){
		this.loginservice.getAppClinicId().then(clinicId=>{
		  // console.log("app-login-token from get:"+clinicId);

			this.restapiService.CheckClinicValid(this.userId,clinicId)
			.then(response => {
				if(response.responseStatus==true){
					// console.log(response.response);
					
					//this.clinicName = response.response.clinicDetails.clinicName;
					this.clinicId = response.response.clinicDetails.clinicId;
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
	
	getDoctorDetailByClinicId(){
		this.restapiService.GetDoctorDetailsByClinicId(this.clinicId).then(response => {
			if(response.responseStatus=true){
				console.log(response.response);
				this.doctorUniqueId = response.response.response.doctorUniqueId;
				this.doctorName = response.response.response.doctorName;
				this.clinicName = response.response.response.clinicName;
				this.doctorImage = response.response.response.doctorImage;
				// this.daySlot = response.response.response.daySlot;
				// this.timeInterval = response.response.response.appointmentDateTime;
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad SuccessfulAppointmentPage');
	} */
	
	/* activeAppointment(){
		this.navCtrl.push(ActiveAppointmentPage);
	} */
	
	goHome(){
		this.navCtrl.setRoot(HomePage);
		
		/* this.navCtrl.push(HomePage).then(() => {
		  const index = this.navCtrl.getActive().index;
		  this.navCtrl.remove(0, index);
		}); */
		/* this.navCtrl.push(HomePage).then(() => {
		  const index = this.navCtrl.getActive().index;
		  //this.navCtrl.remove(0, index);
		  this.navCtrl.remove(index - 5, 6);
		}); */
	
	
	}
}
