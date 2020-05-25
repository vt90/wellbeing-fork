import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import {Validators, FormBuilder } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';

import { ManageClinicPage } from '../manage-clinic/manage-clinic';
import { CreateAssistantPage } from '../create-assistant/create-assistant';
import { AddClinicImagesPage } from '../add-clinic-images/add-clinic-images';

/**
 * Generated class for the DocAddClinicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-doc-add-clinic',
	templateUrl: 'doc-add-clinic.html',
})
export class DocAddClinicPage {
	clinicDetails:any;
	Clinic:any;
	userName:any;
	userRole:any;
	userId:any;
	id:any;
	loader:any;
	locationId:any;
	test:any=false;
	clinic_name:any;
	clinic_contact_no:any;
	states:any;
	state_id:any;
	cities:any;
	city_id:any;
	locations:any;
	location_id:any;
	clinicAddress:any;
	requestStatus:any;
	clinicId:any;
	action:any;
	homeClinic:any;
	doctor_clinic_name:any;
	maplink:any;
	namePattern="[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*";
	// visit:any;
	// test:any;
	
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public restapiService: AllserviceProvider, private formBuilder: FormBuilder, private  alertCtrl: AlertController, public loginservice:Loginservice, public loadingCtrl: LoadingController) {
		this.homeClinic = navParams.get('homeClinic');
		if(!this.homeClinic){
			this.homeClinic = "";
		}
		this.clinicDetails = navParams.get('clinicDetails');
		this.action = navParams.get('action');
		console.log("action1: "+this.action);
		if(this.clinicDetails){
			this.clinicId	= this.clinicDetails.clinic_id;
			this.clinic_name	= this.clinicDetails.clinic_name;
			this.clinic_contact_no	= this.clinicDetails.clinic_contact_no;
			this.state_id	= this.clinicDetails.clinic_state_id;
			this.city_id	= this.clinicDetails.clinic_city_id;
			this.location_id	= this.clinicDetails.clinic_location_id;
			this.clinicAddress	= this.clinicDetails.clinic_address;
			//this.maplink = this.clinicDetails.maplink;
		}
		
		if(!this.clinicId){
			this.clinicId	= 0;
		}
		if(!this.action){
			this.action	= '';
		}
		this.Clinic = this.formBuilder.group({
			clinicName: ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
			clinicContactNo: ['', Validators.compose([Validators.maxLength(15), Validators.minLength(10), Validators.pattern('[7-9]{1}[0-9]{9}|[0-9]{11,15}'), Validators.required ])],
			stateId: ['', Validators.compose([Validators.required])],
			cityId: ['', Validators.compose([Validators.required])],
			locationId: ['', Validators.compose([Validators.required])],
			other_location: ['', Validators.compose([Validators.required])],
			clinicAddress: ['', Validators.compose([Validators.required])]
			//maplink: ['', Validators.compose([Validators.pattern('https:\/\/goo\.gl\/maps\/[a-zA-Z0-9]{10,12}')/* , Validators.required  */])]
		});
		this.checkuserloggedIn();		
	}
	
	
	changeState(state_id){
		this.state_id	= state_id;
		this.getCitiesByState(state_id);
	}
	
	changeCity(city_id){
		this.city_id	= city_id;
		this.getLocationsByCity(city_id);
	}
	
	changeLocation(location_id){
		this.locationId	= location_id;
		if (location_id == 'Other') {
			this.test = true;
		} else{
			this.test = false;
		}
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
							this.doctor_clinic_name = response.response.userDetail.full_name;
							this.userRole = response.response.userDetail.userRole;
							this.id = response.response.userDetail.id;
							this.userId=userId;
							console.log("userId: "+this.userId);
							if(!this.action){
								this.action = response.response.userDetail.action;
							}
							if(this.homeClinic){
								console.log("action2 userId: "+this.userId);
								this.getHomeClinicDetails();
							}
							// console.log("action3: "+this.action);
							this.getStates();
						}
						//this.requestStatus=1;
					}

			  },() =>{

			  });
	    })
	}
	
	getHomeClinicDetails(){
		this.restapiService.getHomeClinicDetails(this.userId).then(response => {
			if(response.responseStatus==true){
				if(response.response.clinicDetailStatus==true){
					this.clinicDetails = response.response.clinicList;
					this.clinicId	= this.clinicDetails.clinicId;
					this.doctor_clinic_name	= this.clinicDetails.clinicName;
					this.clinic_contact_no	= this.clinicDetails.clinicContactNo;
					this.state_id	= this.clinicDetails.clinicState;
					this.city_id	= this.clinicDetails.clinicCity;
					this.location_id	= this.clinicDetails.clinicLocation;
				}else{
					
				}
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}

	logoutUser(){
		this.loginservice.clearLogin().then(userId=>{
		  // return email1;
		  //this.emailid=email1;
		  if(userId){
			  //this.isuserLoggedIn=false;
		  }
		  // this.viewCtrl.dismiss();
		  this.navCtrl.setRoot(LoginPage);
	    })
	}
	
	errorMessagealert(message){
		let alert = this.alertCtrl.create({ title: "Invalid Details",
						subTitle:message, 
						buttons: [{ text: 'Ok'
							/* handler: () => { 
								this.platform.exitApp(); 
							}  */
						}] 
					}); 
		alert.present();
	}
	
	getStates(){
		this.restapiService.GetStates().then(response => {
			if(response.responseStatus==true){
				this.states = response.response.states;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	getCitiesByState(state_id){
		this.restapiService.GetCitiesByState(state_id).then(response => {
			if(response.responseStatus==true){
				this.cities = response.response.cities;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	getLocationsByCity(city_id){
		this.restapiService.GetLocationsByCity(city_id).then(response => {
			if(response.responseStatus==true){
				this.locations = response.response.locations;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	
	addHomeClinic(clinicData){
		console.log(clinicData);
		//console.log("length",clinicData.value.clinicContactNo.length);
		if(clinicData.controls['clinicName'].errors){
			if(clinicData.controls['clinicName'].errors['required']){
				this.errorMessagealert("Please Enter Clinic Name");
				return false;
			}else if(clinicData.controls['clinicName'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Name");
				return false;
			}
		}else if(clinicData.controls['clinicContactNo'].errors){
			//console.log("1");
			if(clinicData.controls['clinicContactNo'].errors['required']){
				//console.log("2");
				this.errorMessagealert("Please Enter Contact No.");
				return false;
			}else if(clinicData.controls['clinicContactNo'].errors['minlength']){
				//console.log("3");
				this.errorMessagealert("Please Enter Valid Contact No.");
				return false;
			}  else if(clinicData.value.clinicContactNo.length == 10){
				if(clinicData.controls['clinicContactNo'].errors['pattern']){
					this.errorMessagealert("Please Enter Valid Contact No.");
					return false;
				}
			}
		}else if(clinicData.controls['stateId'].errors){
			//if(clinicData.controls['stateId'].errors['required']){
				this.errorMessagealert("Please Select State");
				return false;
			//}
		}else if(clinicData.controls['cityId'].errors){
			//if(clinicData.controls['cityId'].errors['required']){
				this.errorMessagealert("Please Select City");
				return false;
			//}
		}/* else if(clinicData.controls['locationId'].errors){
			if(clinicData.controls['stateId'].errors){
				this.errorMessagealert("Please Select Location");
				return false;
			}
		} */else if(clinicData.controls['locationId'].errors){
			//if(clinicData.controls['locationId'].errors['required']){
				this.errorMessagealert("Please Select Location");
				return false;
			//}
		}else if(this.locationId == 'Other' && clinicData.controls['other_location'].errors){
			//if(clinicData.controls['other_location'].errors['required']){
				this.errorMessagealert("Please Enter New Location");
				return false;
			//}
		}
		
		this.restapiService.registerClinic(clinicData.value, this.userId, this.clinicId,"Home")
		.then(response => {
			if(response.responseStatus==true){
				if(response.response.clinicStatus==true){
					if(this.action == 'addClinic'){
						this.navCtrl.setRoot(CreateAssistantPage,{
							action:"addAssistant"
						});						
					}else {
						let alert = this.alertCtrl.create({ message: "Successfully Created",
						buttons: [{ text: 'Ok', handler: () => { 
										this.navCtrl.setRoot(ManageClinicPage);
									}},{ text: 'Cancel'
									}],
									enableBackdropDismiss: false
								}); 
						alert.present();
						//this.navCtrl.setRoot(ManageClinicPage);
					}
				}else{
					let alert = this.alertCtrl.create({ title: "Invalid Details!",
								subTitle:response.response.clinicMsg, 
								buttons: [{ text: 'Ok', 
								}] 
							}); 
					alert.present();
				}
			}	
		});
	}
	

	addNewClinic(clinicData){
		console.log(clinicData);
		//console.log("length",clinicData.value.clinicContactNo.length);
		if(clinicData.controls['clinicName'].errors){
			if(clinicData.controls['clinicName'].errors['required']){
				this.errorMessagealert("Please Enter Clinic Name");
				return false;
			}else if(clinicData.controls['clinicName'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Name");
				return false;
			}
		}else if(clinicData.controls['clinicContactNo'].errors){
			//console.log("1");
			if(clinicData.controls['clinicContactNo'].errors['required']){
				//console.log("2");
				this.errorMessagealert("Please Enter Contact No.");
				return false;
			}else if(clinicData.controls['clinicContactNo'].errors['minlength']){
				//console.log("3");
				this.errorMessagealert("Please Enter Valid Contact No.");
				return false;
			}else if(clinicData.value.clinicContactNo.length == 10){
				//console.log("4");
				if(clinicData.controls['clinicContactNo'].errors['pattern']){
					this.errorMessagealert("Please Enter Valid Contact No.");
					return false;
				}
			}
		}else if(clinicData.controls['stateId'].errors){
			console.log("5");
			//if(clinicData.controls['stateId'].errors['required']){
				this.errorMessagealert("Please Select State");
				return false;
			//}
		}else if(clinicData.controls['cityId'].errors){
			console.log("6");
			//if(clinicData.controls['cityId'].errors['required']){
				this.errorMessagealert("Please Select City");
				return false;
			//}
			/* else if(clinicData.controls['locationId'].errors){
				if(clinicData.controls['stateId'].errors){
					this.errorMessagealert("Please Select Location");
					return false;
				}
			} */
		}else if(clinicData.controls['locationId'].errors){
			console.log("7");
			//if(clinicData.controls['locationId'].errors['required']){
				this.errorMessagealert("Please Select Location");
				return false;
			//}
		}else if(this.locationId == 'Other' && clinicData.controls['other_location'].errors){
			console.log("8");
			//if(clinicData.controls['other_location'].errors['required']){
				this.errorMessagealert("Please Enter New Location");
				return false;
			//}
		}else if(clinicData.controls['clinicAddress'].errors){
			console.log("9");
			//if(clinicData.controls['clinicAddress'].errors['required']){
				this.errorMessagealert("Please Enter Address");
				return false;
			//}
		}  
		
		/* if(clinicData.controls['maplink'].errors){
			if(clinicData.controls['maplink'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid URL");
				return false;
			}
		} */
		
		this.restapiService.registerClinic(clinicData.value, this.userId, this.clinicId,"Clinic")
		.then(response => {
			if(response.responseStatus==true){
				if(response.response.clinicStatus==true){
					if(this.action == 'addClinic'){
						this.navCtrl.setRoot(CreateAssistantPage,{
							action:"addAssistant"
						});						
					}else {
						//this.navCtrl.setRoot(ManageClinicPage);
						let alert = this.alertCtrl.create({ message: "Successfully Created",
						buttons: [{ text: 'Ok', handler: () => { 
										this.navCtrl.setRoot(ManageClinicPage);
									}},{ text: 'Cancel'}
									],
									enableBackdropDismiss: false 
								}); 
						alert.present();
					}
				}else{
					let alert = this.alertCtrl.create({ title: "Invalid Details!",
								subTitle:response.response.clinicMsg, 
								buttons: [{ text: 'Ok', 
								}] 
							}); 
					alert.present();
				}
			}	
		});
	}
	
	removeClinic(){
		let alert = this.alertCtrl.create({ message: "Are you sure you want to delete?",
		buttons: [{ text: 'Ok', handler: () => { 
						this.restapiService.removeClinicByHome(this.clinicId, this.userId)
						.then(responsedata => {
							if(responsedata.responseStatus==true){
								if(responsedata.response.clinicStatus==true){
									this.navCtrl.setRoot(ManageClinicPage);
									/* let alert = this.alertCtrl.create({ message: "Successfully Deleted",
									buttons: [{ text: 'Ok', handler: () => { 
													this.navCtrl.setRoot(ManageClinicPage);
												}},{ text: 'Cancel'}] 
											}); 
									alert.present(); */
								}
							}
						});
					} },{ text: 'Cancel'}],
					enableBackdropDismiss: false 
				}); 
		alert.present();
	}
	
	
	goToClinicImages(clinicId){
		//console.log("clinicId",clinicId);
		this.navCtrl.push(AddClinicImagesPage,{
			clinicId:clinicId
		});
	}
	/* ionViewDidLoad() {
		console.log('ionViewDidLoad DocAddClinicPage');
	} */
	/* goToClinic(){
		this.navCtrl.push(ManageClinicPage);
	} */
	/* onChange(visit){
		if (this.visit == '2') {
			this.test = 1;
		} else{
			this.test = 0; 
		}
	} */

}
