import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import {Validators, FormBuilder } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { Events } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the PatientRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-register',
  templateUrl: 'patient-register.html',
})
export class PatientRegisterPage {
	Patient:any;
	requestStatus:any;
	patientName:any;
	patientMobileNo:any;
	patientEmail:any;
	patientPassword:any;
	termsConditions:any=false;
	loginData	= [];

	namePattern="[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*";
	emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
	constructor(public navCtrl: NavController, public navParams: NavParams, public restapiService: AllserviceProvider, private formBuilder: FormBuilder, private  alertCtrl: AlertController, public loginservice:Loginservice, public events: Events) {
		this.Patient = this.formBuilder.group({
			patientName: ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
			patientEmail: ['', Validators.compose([Validators.required,Validators.pattern(this.emailPattern)])],
			patientMobileNo: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(15),Validators.pattern('[7-9]{1}[0-9]{9}|[0-9]{11,15}')])],
			patientPassword: ['', Validators.compose([Validators.required])],
			termsConditions: [false, Validators.compose([Validators.pattern('true')])]
		});
	}
	
	errorMessagealert($message){
		let alert = this.alertCtrl.create({ title: "Invalid Details",
						message:$message, 
						buttons: [{ text: 'Ok'}] 
					}); 
		alert.present();
	}
	
	registerPatient(patient){
		//return false;
		if(patient.controls['patientName'].errors){
			if(patient.controls['patientName'].errors['required']){
				this.errorMessagealert("Please Enter Name");
				return false;
			}else if(patient.controls['patientName'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Name");
				return false;
			}
		}else if(patient.controls['patientMobileNo'].errors){
			if(patient.controls['patientMobileNo'].errors['required']){
				this.errorMessagealert("Please Enter Contact No.");
				return false;
			} else if(patient.controls['patientMobileNo'].errors['minlength']){
				this.errorMessagealert("Please Enter Valid Contact No.");
				return false;
			} else if(patient.value.patientMobileNo.length == 10){
				if(patient.controls['patientMobileNo'].errors['pattern']){
					this.errorMessagealert("Please Enter Valid Contact No.");
					return false;
				}
			} 
		}else if(patient.controls['patientEmail'].errors){
			if(patient.controls['patientEmail'].errors['required']){
				this.errorMessagealert("Please Enter Email");
				return false;
			} else if(patient.controls['patientEmail'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Email");
				return false;
			}
		}else if(patient.controls['patientPassword'].errors){
			if(patient.controls['patientPassword'].errors['required']){
				this.errorMessagealert("Please Enter Password");
				return false;
			}
			
		}else if(patient.controls['termsConditions'].errors){
			//if(patient.controls['termsConditions'].errors['pattern']){
				this.errorMessagealert("Please Select Terms and Conditions.");
				return false;
			//}
		}
		
		this.restapiService.registerPatient(patient.value, 0, 0)
		.then(response => {
			if(response.responseStatus==true){
				if(response.response.patientStatus==true){
					//userDetailMsg
					
					let alert = this.alertCtrl.create({ title: response.response.userUpdatetitle,
						message: response.response.patientMsg, 
						buttons: [{ text: 'Ok', 
							handler: () => { 
								this.loginData['email']		= patient.value.patientEmail;
								this.loginData['password']	= patient.value.patientPassword;
								
								this.restapiService.userLogin(this.loginData)
								.then(responsedata => {
									// console.log(responsedata);
									//this.loader.dismiss();
									if(responsedata.responseStatus==true){
										if(responsedata.response.loginStatus==true){
											//this.loginservice.setAppLoginToken(responsedata.response.user.userToken);
											this.loginservice.setAppLoginTokenReturnPromise(responsedata.response.user.userToken).then(resp=>{
												console.log("Login set:"+resp);
				
												this.events.publish('user:newlogin', "", Date.now());
											//this.loginservice.setAppLoginTokenReturnPromise(responsedata.response.user.userToken);
											// this.loader.dismiss().then(() => {
												// this.navCtrl.push(HomePage);
												this.navCtrl.setRoot(HomePage);
											// });
											//this.navCtrl.push(HomePage);
											});
										}else{
											// this.loader.dismiss();
											let alert = this.alertCtrl.create({ title: responsedata.response.loginMsgTitle,
													subTitle:responsedata.response.loginMsg, 
													buttons: [{ text: 'Ok', 
													}] 
												}); 
											alert.present();
										}	
										
										//console.log(responsedata);
										
									}else{
										//this.alertbox("Invalid",responsedata.responseMsg,false);
										// this.loader.dismiss();
										let alert = this.alertCtrl.create({ title: "Invalid Details!",
													subTitle:responsedata.responseMsg, 
													buttons: [{ text: 'Ok', 
													}] 
												}); 
										alert.present();
									}
								},() =>{
									// this.loader.dismiss();
									let alert = this.alertCtrl.create({ title: "No Internet Connection",
													subTitle:"Please make sure you are connected to the internet", 
													buttons: [{ text: 'Ok'/* , 
														handler: () => { 
															this.platform.exitApp(); 
														}  */
													}] 
												}); 
									alert.present();
								});
							} 
						}],
						enableBackdropDismiss: false  
					}); 
					alert.present();
				}else{
					//this.alertbox("Invalid",responsedata.responseMsg,false);
					// this.loader.dismiss();
					let alert = this.alertCtrl.create({ title: "Invalid Details!",
								subTitle:response.response.patientMsg, 
								buttons: [{ text: 'Ok', 
								}] 
							}); 
					alert.present();
				}
			} 
		});
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad PatientRegisterPage');
	} */

}
