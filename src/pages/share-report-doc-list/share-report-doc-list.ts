import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Validators, FormBuilder } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';

// import { SharedReportsPage } from '../shared-reports/shared-reports';
import { HomePage } from '../home/home';

/**
 * Generated class for the ShareReportDocListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-share-report-doc-list',
	templateUrl: 'share-report-doc-list.html',
})
export class ShareReportDocListPage {
	userName:any;
	userRole:any;
	id:any;
	userId:any;
	reportId:any;
	labReportsList:any;
	requestStatus:any;
	shareToDocs:any;
	labBookAppointmentId:any;
	doctorsList:any;
	cbIdx:any;
	cbChecked  = [];

	constructor(public restapiService: AllserviceProvider, public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, private formBuilder: FormBuilder, private alertCtrl: AlertController) {
		this.reportId = navParams.get('reportId');
		
		this.labBookAppointmentId = navParams.get('labBookAppointmentId');
				
		this.shareToDocs = this.formBuilder.group({
			doctorId: ['', Validators.compose([Validators.required])]
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
						this.getPatientDoctorList();
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
	
	getPatientDoctorList(){
		this.restapiService.GetPatientDoctorList(this.userId).then(response => {
			console.log('GetPatientDoctorList',response);
			if(response.responseStatus=true){
				this.doctorsList = response.response.doctorsList;
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
	
	shareLabReportsToDoctors(shareToDocs){
		// console.log(bookAppointment);
		
		if(shareToDocs.controls['doctorId'].errors){
			
			if(shareToDocs.controls['doctorId'].errors['required']){
				this.errorMessagealert("Please Select atleast one Doctor to share");
				return false;
			}
		}
		
		console.log("cbChecked: ",this.cbChecked);
		console.log("userId:",this.userId);
		console.log("reportId:",this.reportId);
		console.log("labBookAppointmentId:",this.labBookAppointmentId);
		
		this.restapiService.ShareLabReportsToDoctors(this.cbChecked,this.userId,this.reportId,this.labBookAppointmentId)
		.then(response => {
			// console.log(response);
			if(response.responseStatus==true){
				// console.log(response.response);
				if(response.response.shareReportStatus==true){
					//userDetailMsg
					
					let alert = this.alertCtrl.create({ /* title: response.response.shareReportTitle, */
						message: response.response.shareReportMsg, 
						buttons: [{ text: 'Ok', 
							handler: () => {
								this.navCtrl.setRoot(HomePage);								
							} 
						}],
						enableBackdropDismiss: false  
					}); 
					alert.present();
				}
			}
				
		});
	} 

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad ShareReportDocListPage');
	} */

}
