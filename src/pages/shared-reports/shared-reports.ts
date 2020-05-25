import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';

import { ViewSharedReportsPage } from '../view-shared-reports/view-shared-reports';

/**
 * Generated class for the SharedReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-shared-reports',
	templateUrl: 'shared-reports.html',
})
export class SharedReportsPage {
	userId:any="";
	userDetails:any="";
	doctorListInfo:any="";
	requestStatus:any="";

	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider) {
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
						this.userId=userId;
						this.viewDoctorListOfSharedReports();
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
	
	viewDoctorListOfSharedReports(){
		this.restapiService.ViewDoctorListOfSharedReports(this.userId).then(response => {
			// console.log('ViewDoctorListOfSharedReports',response);
			if(response.responseStatus=true){
				this.doctorListInfo = response.response.doctorList;
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

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad SharedReportsPage');
	} */

}
