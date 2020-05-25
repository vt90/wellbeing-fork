import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';
import { InAppBrowser } from '@ionic-native/in-app-browser';
//import { FileOpener } from '@ionic-native/file-opener';
/**
 * Generated class for the ViewSharedReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-view-shared-reports',
	templateUrl: 'view-shared-reports.html',
})
export class ViewSharedReportsPage {
	userName:any;
	userRole:any;
	id:any;
	userId:any;
	reportDetails:any;
	clinicId:any;
	reportList:any;
	requestStatus:any;

	constructor(public restapiService: AllserviceProvider, public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice,private iab: InAppBrowser/* ,public fileOpener: FileOpener */) {
		this.reportDetails = navParams.get('reportDetails');
		
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
						if(this.userRole == 'patient'){
							this.viewDoctorwiseSharedReports();							
						}else if(this.userRole == 'doctor'){
							this.checkClinicId();
						}
					}
					//this.requestStatus=1;

				}

			},() =>{

			});
	    })
	}
	
	viewReport(path){
		console.log('path',path);
		//return false;
		this.iab.create(path,'_self',{location:'no'});
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
						this.viewPatientwiseSharedReports();
					
					//this.requestStatus=1;
				}

			},() =>{

			});
	    })
	}
	
	viewDoctorwiseSharedReports(){
		this.restapiService.ViewDoctorwiseSharedReports(this.userId,this.reportDetails.id).then(response => {
			console.log('ViewDoctorwiseSharedReports',response);
			if(response.responseStatus=true){
				this.reportList = response.response.reportList;
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	viewPatientwiseSharedReports(){
		this.restapiService.ViewPatientwiseSharedReports(this.userId,this.reportDetails.id).then(response => {
			console.log('ViewPatientwiseSharedReports',response);
			if(response.responseStatus=true){
				this.reportList = response.response.reportList;
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	logoutUser(){
		this.loginservice.clearLogin().then(userId=>{
			this.navCtrl.setRoot(LoginPage);
	    })
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad ViewSharedReportsPage');
	} */

}
