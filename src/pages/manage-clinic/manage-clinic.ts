import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';

import { DocAddClinicPage } from '../doc-add-clinic/doc-add-clinic';
import { AssistantListPage } from '../assistant-list/assistant-list';

/**
 * Generated class for the ManageClinicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-manage-clinic',
	templateUrl: 'manage-clinic.html',
})
export class ManageClinicPage {
	clinics_list = [];
	clinic_count:any=0;
	userName:any;
	userRole:any;
	userId:any;
	id:any;
	
	constructor(public restapiService: AllserviceProvider, public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice,private  alertCtrl: AlertController) {
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
						this.getDoctorwiseClinicListing(userId);
					}
					//this.requestStatus=1;

				  }

			  },() =>{

			  });
	    })
	}

	getDoctorwiseClinicListing(userId){
		this.restapiService.GetDoctorwiseClinics(this.userId,"Clinic")
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
	
	editClinic(clinicDetails){
		this.navCtrl.push(DocAddClinicPage,{
			clinicDetails:clinicDetails
		});
	}
	
	removeClinic(clinicDetails){
		let alert = this.alertCtrl.create({ message: "Are you sure you want to delete?",
		buttons: [{ text: 'Ok', handler: () => { 
						this.restapiService.removeClinic(clinicDetails, this.userId)
						.then(responsedata => {
							if(responsedata.responseStatus==true){
								if(responsedata.response.clinicStatus==true){
									this.restapiService.GetDoctorwiseClinics(this.userId,"Clinic")
									.then(responsedata1 => {
										if(responsedata1.responseStatus==true){
											if(responsedata1.response.clinicStatus==true){
												this.clinics_list 	= responsedata1.response.clinicDetails;
												this.clinic_count 	= responsedata1.response.clinicCount;
												// this.doctors_list.push( this.doctors_list.length );
												let alert = this.alertCtrl.create({ message: "Successfully Deleted",
												buttons: [{ text: 'Ok', handler: () => { 
																this.navCtrl.setRoot(ManageClinicPage);
															}},{ text: 'Cancel'}],
															enableBackdropDismiss: false 
														}); 
												alert.present();
											}
										}
									});
								}
							}
						});
					} },{ text: 'Cancel'}],
						enableBackdropDismiss: false  
				}); 
		alert.present();
	}	
  
	/* ionViewDidLoad() {
		console.log('ionViewDidLoad ManageClinicPage');
	} */
	addClinic(){
		this.navCtrl.push(DocAddClinicPage);
	}
	
	addHomeClinic(){
		this.navCtrl.push(DocAddClinicPage,{
			homeClinic:"homeClinic"
		});
	}
	
	assistantList(){
		this.navCtrl.push(AssistantListPage);
	}
}
