import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
import { LabViewReportsPage } from '../lab-view-reports/lab-view-reports';
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';
/**
 * Generated class for the DoctorProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-doctor-profile',
	templateUrl: 'doctor-profile.html',
})
export class DoctorProfilePage {
	public base64Image: string;
	userDetails:any;
	loader:any;
	userId:any;
	doctorId:any;
	doctorSubSpecializations:any;
	doctorSpecializations:any;
	doctorSubSpecializationIds:any;
	doctorSpecializationIds:any;
	aboutDoctor:any;
	stateId:any;
	state_id:any;
	cityId:any;
	city_id:any;
	locationId:any;
	location_id:any;
	other_location:any;
	address:any;
	maplink:any;
	preparedTags:any;
	requestStatus:any;
	profilePage:any;
	fullName:any;
	mobileNo:any;
	emailId:any;
	passwordUser:any;
	registerId:any;
	namePattern = "[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*";
	emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
	states:any;
	cities:any;
	locations:any;
	test:any;
  
  
  
	constructor(public navCtrl: NavController, public navParams: NavParams, public actionsheetCtrl: ActionSheetController, public camera:Camera,public loginservice:Loginservice,public restapiService: AllserviceProvider, private formBuilder: FormBuilder,private  alertCtrl: AlertController,public loadingCtrl: LoadingController, public events: Events) {
		
		this.profilePage = this.formBuilder.group({
			fullName: ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
			mobileNo: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(15)/* ,Validators.pattern('[7-9]{1}[0-9]{9}') */])],
			emailId: ['', Validators.compose([Validators.required,Validators.pattern(this.emailPattern)])],
			passwordUser: ['', Validators.compose([Validators.required])],
			registerId: ['', Validators.compose([Validators.required])],
			doctorSpecializationIds: ['', Validators.compose([Validators.required])],
			doctorSubSpecializationIds: ['', Validators.compose([Validators.required])],
			aboutDoctor: ['', Validators.compose([Validators.required])],
			stateId: ['', Validators.compose([Validators.required])],
			cityId: ['', Validators.compose([Validators.required])],
			locationId: ['', Validators.compose([Validators.required])],
			other_location: ['', Validators.compose([Validators.required])],
			address: ['', Validators.compose([Validators.required])],
			maplink: ['', Validators.compose([Validators.required])]
		});
		
		
		this.checkuserloggedIn();
	
	}
	
	checkuserloggedIn(){
		this.events.publish('user:newlogin', "", Date.now());
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
						this.doctorId = this.userDetails.id;
						this.fullName = this.userDetails.full_name;
						this.mobileNo = this.userDetails.contact_no;
						this.emailId = this.userDetails.email;
						this.passwordUser = "";
						this.registerId = this.userDetails.registration_id;
						this.doctorSpecializationIds = this.userDetails.specialization;
						this.doctorSubSpecializationIds = this.userDetails.sub_specialization;
						this.aboutDoctor = this.userDetails.about;
						//this.stateId = this.userDetails.state_id;
						//this.cityId = this.userDetails.city_id;
						//this.locationId = this.userDetails.location_id;
						//this.other_location = this.userDetails.otherName;
						//this.address = this.userDetails.address;
						//this.maplink = this.userDetails.mapLink;
						// console.log("stateId",this.stateId);
						this.base64Image = this.userDetails.image_path;
						this.userId=userId;
						
						//this.getStates();
						//this.changeState(this.stateId);
						//this.changeCity(this.cityId);
						//this.changeLocation(this.locationId);
						
						// console.log("app-login-token from getab:"+this.userId);
						 this.getSpecializations();	
					}
				  }
				  
			  },() =>{
				 
			  });  
	    })
	}
	
	
	openPicOption() {
		let actionSheet = this.actionsheetCtrl.create({
		  //title: 'Albums',
		  //cssClass: 'action-sheets-basic-page',
		  buttons: [
			{
			  text: 'Take Picture',
			  icon: 'camera',
			  handler: () => {
				this.takePicture(1)
				console.log('Delete clicked');
			  }
			},
			{
			  text: 'Select from Gallery',
			  icon: 'image',
			  handler: () => {
				this.takePicture(0)
				console.log('Share clicked');
			  }
			},
			{
			  text: 'Cancel',
			  role: 'cancel', // will always sort to be on the bottom
			  icon: 'close',
			  handler: () => {
				console.log('Cancel clicked');
			  }
			}
		  ]
		});
		actionSheet.present();
	}
	
	takePicture(sourceType:number) {
		this.loader = this.loadingCtrl.create({
			spinner:"circles"
		});
		this.loader.present();
		const options: CameraOptions = {
		  quality: 50,
		  destinationType: this.camera.DestinationType.DATA_URL,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE,
		  correctOrientation: true,
		  sourceType:sourceType,
		}

		this.camera.getPicture(options).then((imageData) => {
		  //this.base64Image = 'data:image/jpeg;base64,' + imageData;
			console.log("imageData="+imageData);
			if(imageData){
				this.restapiService.addDoctorImage(imageData, this.userId)
				.then(response => {
					this.loader.dismiss();
					if(response.responseStatus==true){
						console.log('image response',response.response);
						if(response.response.uploadDoctorImageStatus==true){
							
							this.base64Image = response.response.imagePath;
							let alert = this.alertCtrl.create({ title: "Success",
									subTitle:"Successfully Updated", 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											this.checkuserloggedIn();
											//this.platform.exitApp(); 
											//this.navCtrl.setRoot(HomePage);
										} 
									}],
									enableBackdropDismiss: false 
								}); 
							alert.present();
							this.requestStatus=1;
						}else{
							let alert = this.alertCtrl.create({ title: "Failed",
									subTitle:"Successfully Not Updated", 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											this.checkuserloggedIn();
											//this.platform.exitApp(); 
											//this.navCtrl.setRoot(HomePage);
										} 
									}],
									enableBackdropDismiss: false 
								}); 
							alert.present();
							this.requestStatus=2;
						}
					}
				},() =>{
					this.loader.dismiss();
					let alert = this.alertCtrl.create({ title: "No Internet Connection",
									subTitle:"Please make sure you are connected to the internet", 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											//this.navCtrl.setRoot(HomePage);
											//this.platform.exitApp(); 
										} 
									}] 
								}); 
					alert.present();
					 this.requestStatus=3;
				});
				/* this.restapiService.addCustomerImage(imageData, this.userId)
				.then(response => {
					// console.log("responsedata");
					// console.log(responsedata);
					// console.log(JSON.stringify(responsedata));
					//this.loader.dismiss();
					if(response.responseStatus===true){
						console.log('sales funnel',response.response);
						if(response.response.loginStatus==true){
							let alert = this.alertCtrl.create({ title: "Success",
									subTitle:"Successfully uploaded on server", 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											//this.platform.exitApp(); 
										} 
									}] 
								}); 
							alert.present();
							this.requestStatus=1;
						}else{
							this.requestStatus=2;
						}
					}
					
				}, (errorData) =>{
					console.log("errorData");
					console.log("AS" + errorData);
					let alert = this.alertCtrl.create({ title: "No Internet Connection",
									subTitle:"Please make sure you are connected to the internet", 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											//this.platform.exitApp(); 
										} 
									}] 
								}); 
					alert.present();
				}); */
			}
		  
		  
		  
		}, (err) => {
			this.loader.dismiss();
		  // Handle error
		});
	}
	
	
	
	/* getStates(){
		this.restapiService.GetStates().then(response => {
			if(response.responseStatus==true){
				this.states = response.response.states;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	} */
	
	/* getCitiesByState(state_id){
		this.restapiService.GetCitiesByState(state_id).then(response => {
			if(response.responseStatus==true){
				this.cities = response.response.cities;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	} */
	
	/* getLocationsByCity(city_id){
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
	
	changeState(state_id){
		this.state_id	= state_id;
		this.getCitiesByState(state_id);
	} */
	
	/* changeCity(city_id){
		this.city_id	= city_id;
		this.getLocationsByCity(city_id);
	}
	
	changeLocation(location_id){
		this.location_id	= location_id;
		if (location_id == 'Other') {
			this.test = true;
		} else{
			this.test = false;
		}
	} */
	
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
	
	getSubSpecializationsByMultipleSpecializations(specializations){
		// console.log("special",specializations);
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
	
	changeSubSpecializationsByMultipleSpecialization(specializations){
		this.doctorSpecializationIds	= specializations;
		this.getSubSpecializationsByMultipleSpecializations(specializations);
	}
	
	getDoctorLocationsBySpecializationsAndVisitType(sub_specialization_id, visit_type){
		this.restapiService.GetDocotorLocationBySpecializationAndVisitType(sub_specialization_id, visit_type).then(response => {
			if(response.responseStatus=true){
				this.preparedTags = response.response.locations;
				console.log(this.preparedTags);
			} else {
				this.requestStatus=2;
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
	
	updateProfile(profilePage){
		console.log(profilePage);
		//return false;
		if(profilePage.controls['fullName'].errors){
			if(profilePage.controls['fullName'].errors['required']){
				this.errorMessagealert("Please Enter Name");
				return false;
			}else if(profilePage.controls['fullName'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Name");
				return false;
			}
		} else if(profilePage.controls['registerId'].errors){
			if(profilePage.controls['registerId'].errors['required']){
				this.errorMessagealert("Please Enter RegisterId");
				return false;
			}
		} else if(profilePage.controls['doctorSpecializationIds'].errors){
			if(profilePage.controls['doctorSpecializationIds'].errors['required']){
				this.errorMessagealert("Please Select Specialization");
				return false;
			}
		} /* else if(profilePage.controls['doctorSubSpecializationIds'].errors){
			if(profilePage.controls['doctorSubSpecializationIds'].errors['required']){
				this.errorMessagealert("Please Select Sub Specialization");
				return false;
			}
		} */ else if(profilePage.controls['aboutDoctor'].errors){
			if(profilePage.controls['aboutDoctor'].errors['required']){
				this.errorMessagealert("Please Enter About");
				return false;
			} /* else if(profilePage.controls['aboutDoctor'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid About");
				return false;
			}  */
		}if (profilePage.value.aboutDoctor && profilePage.value.aboutDoctor.trim() == '') {
			this.errorMessagealert("Please Enter Valid About");
			return false;
		}
		/*
		else if(profilePage.controls['stateId'].errors){
			if(profilePage.controls['stateId'].errors['required']){
				this.errorMessagealert("Please Select State");
				return false;
			}
		} else if(profilePage.controls['cityId'].errors){
			if(profilePage.controls['cityId'].errors['required']){
				this.errorMessagealert("Please Select City");
				return false;
			}
		} else if(profilePage.controls['locationId'].errors){
			if(profilePage.controls['locationId'].errors['required']){
				this.errorMessagealert("Please Select Location");
				return false;
			}
		} else if(profilePage.controls['address'].errors){
			if(profilePage.controls['address'].errors['required']){
				this.errorMessagealert("Please Enter Address");
				return false;
			}
		}  else if(profilePage.controls['maplink'].errors){
			if(profilePage.controls['maplink'].errors['required']){
				this.errorMessagealert("Please Enter Location Map Link");
				return false;
			}
		}  */
	
		console.log(profilePage.value);
			
		this.restapiService.updateDoctorProfileInfo(profilePage.value, this.userId, this.doctorId)
		  .then(response => {
			  console.log(response);
			   if(response.responseStatus==true){
					console.log(response.response);
					if(response.response.doctorStatus==true){
						//userDetailMsg
						
						let alert = this.alertCtrl.create({ 
							message: response.response.doctorMsg, 
							buttons: [{ text: 'Ok', 
								handler: () => { 
									//this.checkuserloggedIn();
									this.navCtrl.setRoot(HomePage);
								} 
							}],
							enableBackdropDismiss: false 
						}); 
						alert.present();
					}else{
						let alert = this.alertCtrl.create({ 
							message: response.response.doctorMsg, 
							buttons: [{ text: 'Ok', 
								handler: () => { 
									this.checkuserloggedIn();
								} 
							}],
							enableBackdropDismiss: false 
						}); 
						alert.present();
					}
			   }
				
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
		  //this.navCtrl.push(HomePage);  
		  //console.log("app-login-token from get:"+userId);
	    })
	}
	
	openDocumentPage(){
		this.navCtrl.push(LabViewReportsPage,{
			action:'uploadDoctorDocsByProfile'
		});
	}
		
	/* ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
	} */
}
