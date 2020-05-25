import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';

import { LabBookAppointmentPage } from '../lab-book-appointment/lab-book-appointment';

/**
 * Generated class for the LabDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lab-detail',
  templateUrl: 'lab-detail.html',
})
export class LabDetailPage {
	userName:any;
	userRole:any;
	userId:any;
	id:any;
	userUniqueId:any;
	labDetails:any;
	lab_id:any;
	lab_name:any;
	lab_address:any;
	lab_tests:any;
	lab_image:any;
	lab_about:any;
	lab_contact_no:any;
	lab_email:any;  
	maplink:any;  
	visit_type:any;  
	labSchedule:any;  

	constructor(public restapiService: AllserviceProvider, public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice) {
		this.labDetails 	= navParams.get('labDetails');
		this.visit_type 	= navParams.get('visit_type');
		
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
						this.userUniqueId = response.response.userDetail.unique_id;
						this.id = response.response.userDetail.id;
						this.userId=userId;
						this.getLabDetails();
					}
					//this.requestStatus=1;

				}

			},() =>{

			});
	    })
	}

	getLabDetails(){
		console.log(this.visit_type);
		this.restapiService.ViewLabDetails(this.labDetails,this.userId,this.visit_type)
		.then(responsedata => {
			console.log("responsedata: ",responsedata);
			if(responsedata.responseStatus==true){
				if(responsedata.response.detailStatus==true){
					
					this.lab_id 		= responsedata.response.lab_id;
					this.lab_name 		= responsedata.response.lab_name;
					this.lab_address 		= responsedata.response.lab_address;
					this.lab_tests 		= responsedata.response.lab_tests;
					this.lab_about		= responsedata.response.lab_about;
					this.lab_image		= responsedata.response.lab_image;
					this.lab_contact_no = responsedata.response.lab_contact_no;
					this.lab_email 		= responsedata.response.lab_email;
					this.labSchedule 	= responsedata.response.labSchedule;
					this.maplink 		= responsedata.response.mapLink;
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

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad LabDetailPage');
	} */
	labBookAppointment(labId) {
		//console.log("labIDdd",labId);
		this.navCtrl.push(LabBookAppointmentPage,{
			labId:labId,
			patientId:this.id,
			pUniqueId:this.userUniqueId,
			visit_type:this.visit_type
		});
	}

}
