import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
// import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';

import { ViewSharedReportsPage } from '../view-shared-reports/view-shared-reports';

/**
 * Generated class for the SharedDocReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-shared-doc-reports',
	templateUrl: 'shared-doc-reports.html',
})
export class SharedDocReportsPage {
	userId:any="";
	userDetails:any="";
	patientListInfo:any="";
	requestStatus:any="";
	clinicId:any="";

	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider) {
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
					this.userId=userId;
					this.checkClinicId();
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
					
						//this.clinicName = response.response.clinicDetails.clinicName;
						this.clinicId = response.response.clinicDetails.clinicId;
						this.viewPatientListOfSharedReports();
					
					//this.requestStatus=1;
				}

			},() =>{

			});
	    })
	}
	
	viewPatientListOfSharedReports(){
		this.restapiService.ViewPatientListOfSharedReports(this.userId).then(response => {
			console.log('ViewPatientListOfSharedReports',response);
			if(response.responseStatus=true){
				this.patientListInfo = response.response.patientList;
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3;
		}); 
	}
	
	view_shared_reports(reportDetails){
		this.navCtrl.push(ViewSharedReportsPage,{
			reportDetails:reportDetails
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SharedDocReportsPage');
	}

}
