import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import {Validators, FormBuilder } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { Events } from 'ionic-angular';
import { LabViewReportsPage } from '../lab-view-reports/lab-view-reports';
// import { DocAddClinicPage } from '../doc-add-clinic/doc-add-clinic';

/**
 * Generated class for the DoctorRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-register',
  templateUrl: 'doctor-register.html',
})
export class DoctorRegisterPage {
	Doctor:any;
	requestStatus:any;
	test:any=false;
	test1:any=false;
	doctorName:any;
	doctorMobileNo:any;
	doctorEmail:any;
	doctorPassword:any;
	specialization_id:any;
	sub_specialization_id:any;
	doctorRegistrationId:any;
	doctorSpecializations:any;
	doctorSpecializationIds:any;
	doctorSubSpecializations:any;
	doctorSubSpecializationIds:any;
	termsConditions:any=false;
	loginData	= [];
	
	namePattern="[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*";
	emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
	constructor(public navCtrl: NavController, public navParams: NavParams, public restapiService: AllserviceProvider, private formBuilder: FormBuilder, private  alertCtrl: AlertController, public loginservice:Loginservice, public events: Events) {		
		this.Doctor = this.formBuilder.group({
			doctorName: ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
			doctorEmail: ['', Validators.compose([Validators.required,Validators.pattern(this.emailPattern)])],
			doctorPassword: ['', Validators.compose([Validators.required])],
			doctorMobileNo: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(15),Validators.pattern('[7-9]{1}[0-9]{9}|[0-9]{11,15}')])],
			doctorRegistrationId: ['', Validators.compose([Validators.required])],
			doctorSpecializationIds: ['', Validators.compose([Validators.required])],
			other_specialization: ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
			doctorSubSpecializationIds: ['', Validators.compose([Validators.required])],
			other_sub_specialization: ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
			termsConditions: [false, Validators.compose([Validators.pattern('true')])]		
		});
		this.getSpecializations();
	}
	
	errorMessagealert($message){
		let alert = this.alertCtrl.create({ title: "Invalid Details",
						message:$message, 
						buttons: [{ text: 'Ok'}] 
					}); 
		alert.present();
	}
	
	getSpecializations(){
		this.restapiService.GetAllActiveSpecializations().then(response => {
			if(response.responseStatus==true){
				this.doctorSpecializations = response.response.specializations;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	changeSubSpecializationsByMultipleSpecialization(specializations){
		if(!specializations){
			specializations = []; 
		}
		
		console.log("Other Other Other",specializations.indexOf('Other') > -1);
			
		
		
		this.specialization_id	= specializations;
		if (specializations.indexOf('Other') > -1) {
			this.getSubSpecializationsByMultipleSpecializations(specializations);
			this.test = true;
			this.test1 = true;
		} else{
			this.getSubSpecializationsByMultipleSpecializations(specializations);
			this.test = false;
			this.test1 = false;
			this.doctorSubSpecializationIds = '';
		}
	}
	
	getSubSpecializationsByMultipleSpecializations(specializations){
		this.restapiService.GetAllActiveSubSpecializationsByMultipleSpecializations(specializations).then(response => {
			if(response.responseStatus==true){
				this.doctorSubSpecializations = response.response.sub_specializations;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	setSubSpecialization(sub_specialization){
		/* if (sub_specialization == 'Other') {
			this.test1 = true;
		}else{
			this.test1 = false;
			this.sub_specialization_id	= sub_specialization;
		} */
		//this.sub_specialization_id	= sub_specialization;
		if (sub_specialization.indexOf('Other') > -1) {
			this.test1 = true;
		}else{
			this.test1 = false;
			this.sub_specialization_id	= sub_specialization;
		}
	}
	
	registerDoctor(doctor){
		console.log(doctor);
		if(doctor.controls['doctorName'].errors){
			if(doctor.controls['doctorName'].errors['required']){
				this.errorMessagealert("Please Enter Name");
				return false;
			}else if(doctor.controls['doctorName'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Name");
				return false;
			}
		}else if(doctor.controls['doctorMobileNo'].errors){
			//console.log("1");
			if(doctor.controls['doctorMobileNo'].errors['required']){
				//console.log("2");
				this.errorMessagealert("Please Enter Contact No.");
				return false;
			} else if(doctor.controls['doctorMobileNo'].errors['minlength']){
				//console.log("3");
				this.errorMessagealert("Please Enter Valid Contact No.");
				return false;
			} else if(doctor.value.doctorMobileNo.length == 10){
				if(doctor.controls['doctorMobileNo'].errors['pattern']){
					this.errorMessagealert("Please Enter Valid Contact No.");
					return false;
				}
			} 
		}else if(doctor.controls['doctorEmail'].errors){
			if(doctor.controls['doctorEmail'].errors['required']){
				this.errorMessagealert("Please Enter Email");
				return false;
			} else if(doctor.controls['doctorEmail'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Email");
				return false;
			}
		}else if(doctor.controls['doctorPassword'].errors){
			if(doctor.controls['doctorPassword'].errors['required']){
				this.errorMessagealert("Please Enter Password");
				return false;
			}
		}else if(doctor.controls['doctorRegistrationId'].errors){
			if(doctor.controls['doctorRegistrationId'].errors['required']){
				this.errorMessagealert("Please Enter Registration Id");
				return false;
			}
		}else if(doctor.controls['doctorSpecializationIds'].errors){
			if(doctor.controls['doctorSpecializationIds'].errors['required']){
				this.errorMessagealert("Please Select atleast one Specialization");
				return false;
			}
		}/* else if(doctor.controls['doctorSubSpecializationIds'].errors){
			if(doctor.controls['doctorSubSpecializationIds'].errors['required']){
				this.errorMessagealert("Please Select atleast one Sub Specialization");
				return false;
			}
		}else if((this.sub_specialization_id.indexOf('Other') > -1) && (this.specialization_id.indexOf('Other') > -1) && doctor.controls['other_sub_specialization'].errors){
			if(doctor.controls['other_sub_specialization'].errors['required']){
				//this.loader.dismiss();
				this.errorMessagealert("Please Enter Other Sub Specialization");
				return false;
			} else if(doctor.controls['other_sub_specialization'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Sub Specialization");
				return false;
			}
		} */else if((this.specialization_id.indexOf('Other') > -1) && doctor.controls['other_specialization'].errors){
			if(doctor.controls['other_specialization'].errors['required']){
				//this.loader.dismiss();
				this.errorMessagealert("Please Enter Other Specialization");
				return false;
			}else if(doctor.controls['other_specialization'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Specialization");
				return false;
			}
		}else if(doctor.controls['termsConditions'].errors){
			//if(doctor.controls['termsConditions'].errors['pattern']){
				this.errorMessagealert("Please Select Terms and Conditions.");
				return false;
			//}
		}
		
		
				
		this.restapiService.registerDoctor(doctor.value, '')
		.then(response => {
			if(response.responseStatus==true){
				if(response.response.doctorStatus==true){
					//userDetailMsg
					
					let alert = this.alertCtrl.create({ title: response.response.userUpdatetitle,
						message: response.response.doctorMsg, 
						buttons: [{ text: 'Ok', 
							handler: () => { 
								this.loginData['email']		= doctor.value.doctorEmail;
								this.loginData['password']	= doctor.value.doctorPassword;
								
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
													action:'uploadDoctorDocs'
												});
											});
												// this.navCtrl.setRoot(ManageClinicPage);
											// });
											//this.navCtrl.push(HomePage);
											/* this.navCtrl.setRoot(DocAddClinicPage,{
												action:"addClinic"
											}); */
											// this.navCtrl.setRoot(DocAddClinicPage);
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
						subTitle:response.response.doctorMsg, 
						buttons: [{ text: 'Ok', 
						}] 
					}); 
					alert.present();
				}
			}	
		});
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad DoctorRegisterPage');
	} */

}
