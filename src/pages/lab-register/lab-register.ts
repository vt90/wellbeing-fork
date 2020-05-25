import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import {Validators, FormBuilder } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { Events } from 'ionic-angular';
import { LabViewReportsPage } from '../lab-view-reports/lab-view-reports';
// import { HomePage } from '../home/home';

/**
 * Generated class for the LabRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lab-register',
  templateUrl: 'lab-register.html',
})
export class LabRegisterPage {
	Lab:any;
	requestStatus:any;
	labName:any;
	labContactNo:any;
	labEmail:any;
	labPassword:any;
	labRegistrationId:any;
	labTests:any;
	visit_type:any;
	labTestIds:any;
	otherTestId:any;
	termsConditions:any=false;
	otherTest:any=false;
	loginData	= [];

	namePattern="[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*";
	emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
	constructor(public navCtrl: NavController, public navParams: NavParams, public restapiService: AllserviceProvider, private formBuilder: FormBuilder, private  alertCtrl: AlertController, public loginservice:Loginservice, public events: Events) {
		this.Lab = this.formBuilder.group({
			labName: ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
			labEmail: ['', Validators.compose([Validators.required,Validators.pattern(this.emailPattern)])],
			labPassword: ['', Validators.compose([Validators.required])],
			labContactNo: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(15),Validators.pattern('[7-9]{1}[0-9]{9}|[0-9]{11,15}')])],
			labRegistrationId: ['', Validators.compose([Validators.required])],
			labTestIds: ['', Validators.compose([Validators.required])],
			termsConditions: [false, Validators.compose([Validators.pattern('true')])],
			other_test: ['', Validators.compose([Validators.required])],
			visit_type: ['', Validators.compose([Validators.required])]			
		});
		this.getLabTests();
	}
	
	errorMessagealert($message){
		let alert = this.alertCtrl.create({ title: "Invalid Details",
						message:$message, 
						buttons: [{ text: 'Ok'}] 
					}); 
		alert.present();
	}
	
	getLabTests(){
		this.restapiService.GetAllActiveLabTests().then(response => {
			if(response.responseStatus=true){
				this.labTests = response.response.labtests;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	changeLabTestByMultipleTest(labTest){
		if(!labTest){
			labTest = []; 
		}
		this.otherTestId	= labTest;
		if (labTest.indexOf('Other') > -1) {
			this.otherTest = true;
		} else{
			this.otherTest = false;;
		}
	}
	
	registerLab(lab){
		console.log(lab);
		if(lab.controls['labName'].errors){
			if(lab.controls['labName'].errors['required']){
				this.errorMessagealert("Please Enter Name");
				return false;
			}else if(lab.controls['labName'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Name");
				return false;
			}
		}else if(lab.controls['labContactNo'].errors){
			if(lab.controls['labContactNo'].errors['required']){
				this.errorMessagealert("Please Enter Contact No.");
				return false;
			} else if(lab.controls['labContactNo'].errors['minlength']){
				this.errorMessagealert("Please Enter Valid Contact No.");
				return false;
			} else if(lab.value.labContactNo.length == 10){
				if(lab.controls['labContactNo'].errors['pattern']){
					this.errorMessagealert("Please Enter Valid Contact No.");
					return false;
				}
			} 
		}else if(lab.controls['labEmail'].errors){
			if(lab.controls['labEmail'].errors['required']){
				this.errorMessagealert("Please Enter Email");
				return false;
			} else if(lab.controls['labEmail'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Email");
				return false;
			}
		}else if(lab.controls['labPassword'].errors){
			if(lab.controls['labPassword'].errors['required']){
				this.errorMessagealert("Please Enter Password");
				return false;
			}
			
		}else if(lab.controls['labRegistrationId'].errors){
			if(lab.controls['labRegistrationId'].errors['required']){
				this.errorMessagealert("Please Enter Registration Id");
				return false;
			}
		}else if(lab.controls['labTestIds'].errors){
			if(lab.controls['labTestIds'].errors['required']){
				this.errorMessagealert("Please Select Lab Tests");
				return false;
			}
		}else if(lab.controls['visit_type'].errors){
			//if(lab.controls['visit_type'].errors['required']){
				this.errorMessagealert("Please Select Visit Type");
				return false;
			//}
		}else if(lab.controls['termsConditions'].errors){
			//if(lab.controls['termsConditions'].errors['pattern']){
				this.errorMessagealert("Please Select Terms and Conditions.");
				return false;
			//}
		}
		if((this.otherTestId.indexOf('Other') > -1) && lab.controls['other_test'].errors){
			this.errorMessagealert("Please Enter Other Test");
			return false;
		}
		
		
				
		this.restapiService.registerLab(lab.value, '')
		.then(response => {
			if(response.responseStatus==true){
				if(response.response.labStatus==true){
					//userDetailMsg
					
					let alert = this.alertCtrl.create({ title: response.response.userUpdatetitle,
						message: response.response.labMsg, 
						buttons: [{ text: 'Ok', 
							handler: () => { 
								this.loginData['email']		= lab.value.labEmail;
								this.loginData['password']	= lab.value.labPassword;
								
								this.restapiService.userLogin(this.loginData)
								.then(responsedata => {
									// console.log(responsedata);
									//this.loader.dismiss();
									if(responsedata.responseStatus==true){
										if(responsedata.response.loginStatus==true){
											//this.loginservice.setAppLoginToken(responsedata.response.user.userToken);
											//this.loginservice.setAppLoginTokenReturnPromise(responsedata.response.user.userToken);
											this.loginservice.setAppLoginTokenReturnPromise(responsedata.response.user.userToken).then(resp=>{
												console.log("Login set:"+resp);
				
												this.events.publish('user:newlogin', "", Date.now());
											// this.loader.dismiss().then(() => {
												this.navCtrl.setRoot(LabViewReportsPage,{
													action:'uploadLabDocs'
												});
											});
												// this.navCtrl.setRoot(HomePage);
											// });
											//this.navCtrl.push(HomePage);
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
													buttons: [{ text: 'Ok'
														/* handler: () => { 
															this.platform.exitApp(); 
														} */ 
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
					let alert = this.alertCtrl.create({ title: "Invalid Details!",
						subTitle:response.response.labMsg, 
						buttons: [{ text: 'Ok', 
						}] 
					}); 
					alert.present();
				}
			}	
		});
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad LabRegisterPage');
	} */

}
