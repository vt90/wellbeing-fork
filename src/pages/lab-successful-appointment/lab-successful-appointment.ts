import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
// import { ActiveAppointmentPage } from '../active-appointment/active-appointment';
import { HomePage } from '../home/home';
/**
 * Generated class for the LabSuccessfulAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-lab-successful-appointment',
	templateUrl: 'lab-successful-appointment.html',
})
export class LabSuccessfulAppointmentPage {
	userId:any="";
	userRole:any="";
	userDetails:any="";
	bookAppointmentDetails: any;
	labId: any;
	labUniqueId: any;
	labName: any;
	selectTimeArr = [];
	daySlot: any;
	timeInterval: any;
	requestStatus: any;
	labImage: any;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider) {
		this.bookAppointmentDetails = navParams.get('bookAppointmentDetails');
		this.labId = navParams.get('labId');
		
		this.checkuserloggedIn();
		this.selectTimeArr	= this.bookAppointmentDetails.selectTime.split("_");
		this.timeInterval = this.selectTimeArr[0];
		this.daySlot = this.selectTimeArr[1];
		this.getLabDetailByLabId();
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
	
	getLabDetailByLabId(){
		this.restapiService.GetLabDetailsByLabId(this.labId).then(response => {
			if(response.responseStatus=true){
				console.log(response.response);
				this.labUniqueId = response.response.response.labUniqueId;
				this.labName = response.response.response.labName;
				this.labImage = response.response.response.labImage;
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad LabSuccessfulAppointmentPage');
	} */
	// activeAppointment(){
		// this.navCtrl.push(ActiveAppointmentPage);
	// }
	goHome(){
		this.navCtrl.setRoot(HomePage);
	
		/* this.navCtrl.push(HomePage).then(() => {
			const index = this.navCtrl.getActive().index;
			//this.navCtrl.remove(0, index);
			this.navCtrl.remove(index - 5, 6);
		}); */
	}
}
