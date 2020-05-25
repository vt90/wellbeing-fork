import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
/**
 * Generated class for the DoctorLeavePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-leave',
  templateUrl: 'doctor-leave.html',
})
export class DoctorLeavePage {
	doctorOnLeaveId:any="";
	fromDate:any="";
	toDate:any="";
	drName:any="";
	drMobile:any="";
	userId:any="";
	userDetails:any="";
	requestStatus:any="";
	frommindate:any="";
	currentdate:any="";
	drLeave:any="";
	clinicId:any="";
	doctorOnLeaveDetails:any="";
	namePattern="[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*";


	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider, private formBuilder: FormBuilder, private  alertCtrl: AlertController) {
		//this.fromDate="2018-02-02";
		//this.toDate="2018-02-03";
		//this.clinicId = 1;
		this.drLeave = this.formBuilder.group({
			fromDate: ['', Validators.compose([Validators.required])],
			toDate: ['', Validators.compose([Validators.required])],
			drName: ['', Validators.compose([Validators.pattern(this.namePattern)])],
			drMobile: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[7-9]{1}[0-9]{9}|[0-9]{11,15}')])]
		});
		let fdate=new Date();
		//this.frommaxdate= this.getFormatedDate(fdate);
		this.frommindate= this.getFormatedDate(fdate);
		this.currentdate= this.getFormatedDate(fdate);
		
		this.checkuserloggedIn();
	}
	
	getFormatedDate(dateTimeStamp){
	  //console.log(dateTimeStamp);
	    var formatedDate = '';
		// let numbers=0;
		var dateObj = new Date(dateTimeStamp);
		//formatedDate = dateObj.getDate() + '/' + (dateObj.getMonth()+1) + '/' + dateObj.getFullYear();
		//let curmon=('0' + dateObj.getMonth()+1).slice(-2);
		//let curmon=dateObj.getMonth()+1;
		/* let curday=dateObj.getDate();
		if(curmon<10){
			curmon= "" + numbers + curmon;
		}
		if(curday<10){
			curday= numbers+curday;
		} */
		//console.log(curmon);
		formatedDate = dateObj.getFullYear() + '-' +  ('0' + (dateObj.getMonth()+1)).slice(-2)  + '-' + ('0' + dateObj.getDate()).slice(-2);
		return formatedDate;
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
						//this.userDetails = response.response.userDetail.id;
						this.userId=userId;
						this.checkClinicId();
						// console.log("app-login-token from getab:"+this.userId);
						//this.getAllClinicList();	
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
						this.getDoctorOnLeaveDetails();
					//this.requestStatus=1;
				  }

			  },() =>{

			  });
	    })
	}
	
	getDoctorOnLeaveDetails(){
		this.restapiService.GetDoctorOnLeaveDetails(this.userId, this.clinicId).then(response => {
			// console.log('GetDoctorOnLeaveDetails',response);
			if(response.responseStatus=true){
				this.doctorOnLeaveDetails = response.response.doctorOnLeaveDetails;
				this.doctorOnLeaveId 	= this.doctorOnLeaveDetails.id;
				this.fromDate			= this.doctorOnLeaveDetails.fromDate;
				this.fromDate			= this.getFormatedDate(this.fromDate);
				this.toDate 			= this.doctorOnLeaveDetails.toDate;
				this.toDate				= this.getFormatedDate(this.toDate);
				this.drName 			= this.doctorOnLeaveDetails.drName;
				this.drMobile 			= this.doctorOnLeaveDetails.drMobile;
				this.requestStatus		= 1;
			} else{
				this.doctorOnLeaveId	= '';
				this.requestStatus		= 2;
			}
		},() =>{
			this.requestStatus=3;
		}); 
	}
	
	errorMessagealert($message){
		let alert = this.alertCtrl.create({ title: "Invalid Details",
						message:$message, 
						buttons: [{ text: 'Ok'}] 
					}); 
		alert.present();
	}
	
	clearDoctorLeave(drLeave){
		//console.log("drLeave",drLeave);
		
		
		let alert = this.alertCtrl.create({
			message: "Are you sure you want to delete leave", 
			buttons: [{ text: 'Ok', 
				handler: () => {
					this.restapiService.clearLeaveByDoctor(drLeave.value,this.userId,this.clinicId,this.doctorOnLeaveId)
					.then(response => {
						// console.log(response);
						if(response.responseStatus==true){
							console.log(response.response);
							if(response.response.doctorLeaveStatus==true){
								//userDetailMsg
								
								let alert = this.alertCtrl.create({ 
									message: response.response.doctorLeaveMsg, 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											// this.drLeave.reset()
											//this.getDoctorOnLeaveDetails();
											this.navCtrl.setRoot(HomePage);
										} 
									}],
									enableBackdropDismiss: false 
								}); 
								alert.present();
							}else{
								let alert = this.alertCtrl.create({ title: response.response.doctorLeaveTitle,
									subTitle:response.response.doctorLeaveMsg, 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											// this.drLeave.reset()
											//this.getDoctorOnLeaveDetails();
											this.navCtrl.setRoot(HomePage);
										} 
									}],
									enableBackdropDismiss: false 
								}); 
								alert.present();
							}
						}else{
							/* let alert = this.alertCtrl.create({ title: response.response.doctorLeaveTitle,
								subTitle:response.response.doctorLeaveMsg, 
								buttons: [{ text: 'Ok'
								}] 
							}); 
							alert.present(); */
							this.requestStatus=2;
						}
					});
				} 
			},
			{ text: 'Cancel', 
				handler: () => { 
				} 
			}] 
		}); 
		alert.present();
	}
	
	checkdateformatfor(fromdate){
		console.log("from date"+fromdate);
		//console.log("from date"+fromdate);
		//let dr=fromdate.split('/');
		this.frommindate = this.getFormatedDate(fromdate);
		this.toDate = "";	
	}
	
	createDoctorLeave(drLeave){
		console.log("drLeave",drLeave);
		//return false;
		if(drLeave.value.fromDate == "NaN-aN-aN" || drLeave.value.fromDate == ''){
			this.errorMessagealert("Please Select From Date");
			return false;
		} else if(drLeave.value.toDate == "NaN-aN-aN" || drLeave.value.toDate == ''){
			this.errorMessagealert("Please Select To Date");
			return false;
		} else if(drLeave.controls['drName'].errors){
			if(drLeave.controls['drName'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Name");
				return false;
			}
		}
		//}
		/*  else if(drLeave.controls['drMobile'].errors){
			if(drLeave.controls['drMobile'].errors['required']){
				this.errorMessagealert("Please Enter Mobile No.");
				return false;
			} else if(drLeave.controls['drMobile'].errors['minLength']){
				this.errorMessagealert("Please Enter Valid Mobile No. Minimum or Maximum 10 digits");
				return false;
			} else if(drLeave.controls['drMobile'].errors['maxLength']){
				this.errorMessagealert("Please Enter Valid Mobile No");
				return false;
			} else if(drLeave.controls['drMobile'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Mobile No.");
				return false;
			}
		} */
		
		let alert = this.alertCtrl.create({
			message: "Are you sure you want to set leaves for selected Dates?", 
			buttons: [{ text: 'Ok', 
				handler: () => {
					this.restapiService.createLeaveByDoctor(drLeave.value,this.userId,this.clinicId,this.doctorOnLeaveId)
					.then(response => {
						// console.log(response);
						if(response.responseStatus==true){
							console.log(response.response);
							if(response.response.doctorLeaveStatus==true){
								//userDetailMsg
								
								let alert = this.alertCtrl.create({ 
									message: response.response.doctorLeaveMsg, 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											// this.drLeave.reset()
											//this.getDoctorOnLeaveDetails();
											this.navCtrl.setRoot(HomePage);
										} 
									}],
									enableBackdropDismiss: false 
								}); 
								alert.present();
							}else{
								let alert = this.alertCtrl.create({ title: response.response.doctorLeaveTitle,
									subTitle:response.response.doctorLeaveMsg, 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											// this.drLeave.reset()
											//this.getDoctorOnLeaveDetails();
											this.navCtrl.setRoot(HomePage);
										} 
									}],
									enableBackdropDismiss: false 
								}); 
								alert.present();
							}
						}else{
							/* let alert = this.alertCtrl.create({ title: response.response.doctorLeaveTitle,
								subTitle:response.response.doctorLeaveMsg, 
								buttons: [{ text: 'Ok'
								}] 
							}); 
							alert.present(); */
							this.requestStatus=2;
						}
					});
				} 
			},
			{ text: 'Cancel', 
				handler: () => { 
				} 
			}],
			enableBackdropDismiss: false 
		}); 
		alert.present();
	}
	
	/* ionViewDidLoad() {
		console.log('ionViewDidLoad DoctorLeavePage');
	} */

}
