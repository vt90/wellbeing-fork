import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';

import { ViewReportPage } from '../view-report/view-report';
/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-reports',
	templateUrl: 'reports.html',
})
export class ReportsPage {
	status:any;
	test = [];
	userId:any="";
	userDetails:any="";
	requestStatus:any="";
	activeAppointmentListInfo:any="";
	archiveAppointmentListInfo:any="";

	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider, private  alertCtrl: AlertController) {
		this.status = "active";
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
					this.getPatientActiveArchiveReportsList();
				}
			  }
			  
			},() =>{
			 
			});  
	    })
	}
	
	getPatientActiveArchiveReportsList(){
		this.restapiService.GetPatientActiveArchiveReportsList(this.userId).then(response => {
			console.log('GetPatientActiveArchiveReportsList',response);
			if(response.responseStatus=true){
				this.activeAppointmentListInfo = response.response.reportsActiveList;				
				this.archiveAppointmentListInfo = response.response.reportsArchiveList;				
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
	
	errorMessagealert($message){
		let alert = this.alertCtrl.create({ title: "Invalid Details",
						message:$message, 
						buttons: [{ text: 'Ok'}] 
					}); 
		alert.present();
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad ReportsPage');
	} */
	
	viewReport(reportDetails) {
		console.log(reportDetails);
		this.navCtrl.push(ViewReportPage,{
			reportDetails:reportDetails
		}); 
	}
	
	moveArchived(reportDetails) {
		let alert = this.alertCtrl.create({ message: "Are you sure you want to move this report to archive?", 
			buttons: [{ text: 'Ok', 
				handler: () => { 
					this.restapiService.MoveLabReportsToArchive(this.userId,reportDetails.id).then(response => {
						// console.log('getAllScheduleList',response);
						if(response.responseStatus==true){
							this.getPatientActiveArchiveReportsList();
							this.requestStatus=1;
						} else{
							this.requestStatus=2;
						}
					},() =>{
						this.requestStatus=3; 
					});
				}
			},{
				text: 'Cancel', 
				handler: () => { 
				}
			}],
			enableBackdropDismiss: false  
		}); 
		alert.present();
	}

}
