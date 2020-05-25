import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Validators, FormBuilder } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';

import { ShareReportDocListPage } from '../share-report-doc-list/share-report-doc-list';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the ViewReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-view-report',
	templateUrl: 'view-report.html',
})
export class ViewReportPage {
	appointmentId:any;
	userName:any;
	userRole:any;
	id:any;
	userId:any;
	reportId:any;
	labReportsList:any;
	requestStatus:any;
	shareLabReports:any;
	reportDetails:any;
	cbIdx:any;
	cbChecked  = [];

	constructor(public restapiService: AllserviceProvider, public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, private formBuilder: FormBuilder, private alertCtrl: AlertController,private iab: InAppBrowser) {
		this.reportDetails = navParams.get('reportDetails');
		this.appointmentId = navParams.get('appointmentId');		
		this.shareLabReports = this.formBuilder.group({
			reportId: ['', Validators.compose([Validators.required])]
		});
		this.cbChecked  = [];
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
						if(this.appointmentId){
							
							this.getUploadedLabReportsList();
						}
						if(this.reportDetails){
							this.appointmentId = this.reportDetails.id;
							this.getUploadedLabReportsList();
						}
					}
					//this.requestStatus=1;

				}

			},() =>{

			});
	    })
	}
	
	updateCheckedOptions(chBox, event) {
		this.cbIdx = this.cbChecked.indexOf(chBox);
		
		if(event.target.checked) {
			if(this.cbIdx < 0 ){
				this.cbChecked.push(chBox);
				// console.log(chBox);
			}

		} else {
			if(this.cbIdx >= 0 ){
				this.cbChecked.splice(this.cbIdx,1);
				// console.log(this.cbIdx);
			}

		}
	}
	
	/* updateOptions() {
		console.log(this.cbChecked);
	} */
	
	
	getUploadedLabReportsList(){
		this.restapiService.GetUploadedLabReportsList(this.userId,this.appointmentId).then(response => {
			console.log('GetUploadedLabReportsList',response);
			if(response.responseStatus=true){
				this.labReportsList = response.response.labReportsList;
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
		console.log('ionViewDidLoad ViewReportPage');
	} */
	openDocLists(shareLabReports){
		// console.log('Submitted value: ', this.cbChecked); return false;
		// console.log("shareLabReports",shareLabReports);
		if(shareLabReports.controls['reportId'].errors){
			if(shareLabReports.controls['reportId'].errors['required']){
				this.errorMessagealert("Please Select atleast one Report to share");
				return false;
			}
		}		
		this.navCtrl.push(ShareReportDocListPage,{
			reportId:this.cbChecked,
			labBookAppointmentId:this.appointmentId
		});		
	}
	
	viewPrescription(path){
		console.log('path',path);
		//return false;
		this.iab.create(path,'_self',{location:'no'});
	}

}
