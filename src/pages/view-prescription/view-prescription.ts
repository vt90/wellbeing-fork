import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the ViewPrescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-view-prescription',
	templateUrl: 'view-prescription.html',
})
export class ViewPrescriptionPage {
	userName:any;
	userRole:any;
	id:any;
	userId:any;
	appointmentId:any;
	requestStatus:any;
	prescriptionDetails:any;
	appointmentStartDateFormatted:any;
	visit_type:any;
	medicineDetail:any;
	medicine_detail:any;
	imagePath:any;

	constructor(public restapiService: AllserviceProvider, public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice,private iab: InAppBrowser) {
		this.appointmentId = navParams.get('appointmentId');
		
		this.checkuserloggedIn();
	}
	
	checkuserloggedIn(){
		this.loginservice.getAppLoginToken().then(userId=>{
			this.restapiService.CheckUserValid(userId)
			.then(response => {
				if(response.responseStatus==true){
					if(response.response.validityStatus==false){
						this.logoutUser();
					}else{
						this.userName = response.response.userDetail.full_name;
						this.userRole = response.response.userDetail.userRole;
						this.id = response.response.userDetail.id;
						this.userId = userId;
						this.viewAppointmentPrescription();
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
	
	viewAppointmentPrescription(){
		this.restapiService.ViewAppointmentPrescription(this.userId,this.appointmentId).then(response => {
			console.log('ViewAppointmentPrescription',response);
			if(response.responseStatus=true){
				this.prescriptionDetails 			= response.response.prescriptionDetails;
				this.appointmentStartDateFormatted	= this.prescriptionDetails.appointmentStartDateFormatted;
				this.visit_type						= this.prescriptionDetails.visit_type;
				this.medicineDetail					= this.prescriptionDetails.medicineDetail;
				this.medicine_detail				= this.prescriptionDetails.medicine_detail;
				this.imagePath						= this.prescriptionDetails.imagePath;
				this.requestStatus=1;
			} else{
				//this.prescriptionDetails = [];
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
		console.log('ionViewDidLoad ViewPrescriptionPage');
	} */

}
