import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
/**
 * Generated class for the LabClosedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lab-closed',
  templateUrl: 'lab-closed.html',
})
export class LabClosedPage {
	labClosedId:any="";
	fromDate:any="";
	toDate:any="";
	leaveDetails:any="";
	userId:any="";
	userDetails:any="";
	requestStatus:any="";
	frommindate:any="";
	currentdate:any="";
	labClosed:any="";
	labClosedDetails:any="";
	namePattern="[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*";

	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider, private formBuilder: FormBuilder, private  alertCtrl: AlertController) {
		this.labClosed = this.formBuilder.group({
			fromDate: ['', Validators.compose([Validators.required])],
			toDate: ['', Validators.compose([Validators.required])],
			leaveDetails: ['', Validators.compose([Validators.required])]
		});
		let fdate=new Date();
		//this.frommaxdate= this.getFormatedDate(fdate);
		this.frommindate= this.getFormatedDate(fdate);
		this.currentdate= this.getFormatedDate(fdate);
		
		this.checkuserloggedIn();
	}
	
	checkdateformatfor(fromdate){
		console.log("from date"+fromdate);
		//console.log("from date"+fromdate);
		//let dr=fromdate.split('/');
		this.frommindate = this.getFormatedDate(fromdate);
		this.toDate = "";
	}
	
	getFormatedDate(dateTimeStamp){
	    var formatedDate = '';
		// let numbers=0;
		var dateObj = new Date(dateTimeStamp);
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
						this.userId=userId;
						this.getLabClosedDetails();
					}
				  }
				  
			  },() =>{
				 
			  });  
	    })
	}
	
	getLabClosedDetails(){
		this.restapiService.GetLabClosedDetails(this.userId).then(response => {
			console.log('GetLabClosedDetails',response);
			if(response.responseStatus=true){
				this.labClosedDetails = response.response.labClosedDetails;
				this.labClosedId 	= this.labClosedDetails.id;
				this.fromDate		= this.labClosedDetails.fromDate;
				this.fromDate		= this.getFormatedDate(this.fromDate);
				this.toDate 		= this.labClosedDetails.toDate;
				this.toDate			= this.getFormatedDate(this.toDate);
				this.leaveDetails 	= this.labClosedDetails.labDetails;
				this.requestStatus	= 1;
			} else{
				this.labClosedId	= '';
				this.requestStatus	= 2;
			}
		},() =>{
			this.requestStatus=3;
		}); 
	}
	
	logoutUser(){
		this.loginservice.clearLogin().then(userId=>{
			this.navCtrl.setRoot(LoginPage);
		});
	}
	
	errorMessagealert($message){
		let alert = this.alertCtrl.create({ title: "Invalid Details",
						message:$message, 
						buttons: [{ text: 'Ok'}] 
					}); 
		alert.present();
	}
	
	createLabClosed(labClosed){
		console.log(labClosed);
		//return false;
		/* if(labClosed.controls['fromDate'].errors){
			if(labClosed.controls['fromDate'].errors['required']){
				this.errorMessagealert("Please Select From Date");
				return false;
			}
		} else if(labClosed.controls['toDate'].errors){
			if(labClosed.controls['toDate'].errors['required']){
				this.errorMessagealert("Please Select To Date");
				return false;
			}
		} */ 
		if(labClosed.value.fromDate == "NaN-aN-aN" || labClosed.value.fromDate == ''){
			this.errorMessagealert("Please Select From Date");
			return false;
		} else if(labClosed.value.toDate == "NaN-aN-aN" || labClosed.value.toDate == ''){
			this.errorMessagealert("Please Select To Date");
			return false;
		}else if(labClosed.controls['leaveDetails'].errors){
			if(labClosed.controls['leaveDetails'].errors['required']){
				this.errorMessagealert("Please Enter Leave Details");
				return false;
			}/*  else if(labClosed.controls['leaveDetails'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Details");
				return false;
			} */
		}if (labClosed.value.leaveDetails && labClosed.value.leaveDetails.trim() == '') {
			this.errorMessagealert("Please Enter Valid Details");
			return false;
		}
		
		let alert = this.alertCtrl.create({
			message: "Are you sure you want to set lab closed for selected dates?", 
			buttons: [{ text: 'Ok', 
				handler: () => {		
					this.restapiService.createClosedLab(labClosed.value,this.userId,this.labClosedId)
					.then(response => {
						// console.log(response);
						if(response.responseStatus==true){
							// console.log(response.response);
							if(response.response.labClosedStatus==true){
								//userDetailMsg
								
								let alert = this.alertCtrl.create({ 
									message: response.response.labClosedMsg, 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											// this.labClosed.reset()
											//this.getLabClosedDetails();
											this.navCtrl.setRoot(HomePage);
										} 
									}],
									enableBackdropDismiss: false  
								}); 
								alert.present();
							}else{
								let alert = this.alertCtrl.create({ title: response.response.labClosedTitle,
									subTitle:response.response.labClosedMsg, 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											// this.labClosed.reset()
											//this.getLabClosedDetails();
											this.navCtrl.setRoot(HomePage);
										} 
									}],
									enableBackdropDismiss: false  
								}); 
								alert.present();
							}
						}else{
							/* let alert = this.alertCtrl.create({ title: response.response.labClosedTitle,
								subTitle:response.response.labClosedMsg, 
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
	
	
	clearLabClosed(labClosed){
		console.log(labClosed);
		//return false;
		
		
		let alert = this.alertCtrl.create({
			message: "Are you sure you want to delete lab closed dates?", 
			buttons: [{ text: 'Ok', 
				handler: () => {		
					this.restapiService.clearClosedLab(labClosed.value,this.userId,this.labClosedId)
					.then(response => {
						// console.log(response);
						if(response.responseStatus==true){
							// console.log(response.response);
							if(response.response.labClosedStatus==true){
								//userDetailMsg
								
								let alert = this.alertCtrl.create({ /* title: response.response.labClosedTitle, */
									message: response.response.labClosedMsg, 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											// this.labClosed.reset()
											//this.getLabClosedDetails();
											this.navCtrl.setRoot(HomePage);
										} 
									}],
									enableBackdropDismiss: false  
								}); 
								alert.present();
							}else{
								let alert = this.alertCtrl.create({ title: response.response.labClosedTitle,
									subTitle:response.response.labClosedMsg, 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											// this.labClosed.reset()
											//this.getLabClosedDetails();
											this.navCtrl.setRoot(HomePage);
										} 
									}],
									enableBackdropDismiss: false  
								}); 
								alert.present();
							}
						}else{
							/* let alert = this.alertCtrl.create({ title: response.response.labClosedTitle,
								subTitle:response.response.labClosedMsg, 
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
		console.log('ionViewDidLoad LabClosedPage');
	} */

}
