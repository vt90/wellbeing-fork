import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';

import { HomePage } from '../home/home';

/**
 * Generated class for the SelectClinicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-select-clinic',
	templateUrl: 'select-clinic.html',
})
export class SelectClinicPage {
	clinics_list = [];
	clinic_count:any=0;
	userName:any;
	userRole:any;
	userId:any;
	id:any;
	clinicId:any;
	action:any;

	constructor(public restapiService: AllserviceProvider, public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice) {
		
		this.action = navParams.get('action');
		if(!this.action){
			this.action	= '';
		}
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
						this.userId=userId;
						if(!this.action || this.action == ''){
							this.action = response.response.userDetail.action;
						}
						// this.action	= '';
						console.log(this.action);
						if(this.action == 'dashboard'){
							this.getDoctorwiseClinicListing(userId);
						}else if(this.action == 'assistantDashboard'){
							this.getAssistantwiseClinicListing(userId);							
						}else{
							this.navCtrl.setRoot(HomePage);
						}
					}
					//this.requestStatus=1;

				  }

			  },() =>{

			  });
	    })
	}

	getDoctorwiseClinicListing(userId){
		this.restapiService.GetDoctorwiseClinics(this.userId,"Home")
		.then(responsedata => {
			if(responsedata.responseStatus==true){
				if(responsedata.response.clinicStatus==true){
					this.clinics_list 	= responsedata.response.clinicDetails;
					this.clinic_count 	= responsedata.response.clinicCount;
					// this.doctors_list.push( this.doctors_list.length );
				}
			}
		});
	}

	getAssistantwiseClinicListing(userId){
		this.restapiService.GetAssistantwiseClinics(this.userId)
		.then(responsedata => {
			if(responsedata.responseStatus==true){
				if(responsedata.response.clinicStatus==true){
					this.clinics_list 	= responsedata.response.clinicDetails;
					this.clinic_count 	= responsedata.response.clinicCount;
					// this.doctors_list.push( this.doctors_list.length );
				}
			}
		});
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
	    })
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SelectClinicPage');
		this.checkuserloggedIn();
	}
	
	goDashboard(clinicDetails){
		/* this.loginservice.getAppClinicId().then(clinicId=>{
			console.log("app-login-token from clinicId:"+clinicId);
			this.clinicId = clinicId;
		});
		if(!this.clinicId){
		} */
			this.loginservice.setAppClinicId(clinicDetails.clinic_id);
		 
		/* this.navCtrl.push(HomePage,{
			clinicDetails:clinicDetails
		}); */
		this.navCtrl.setRoot(HomePage);
	}
}
