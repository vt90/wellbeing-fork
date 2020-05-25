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
 * Generated class for the LabProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-lab-profile',
	templateUrl: 'lab-profile.html',
})
export class LabProfilePage {
	public base64Image: string;
	loader:any;
	userDetails:any;
	userId:any;
	labId:any;
	doctorId:any;
	labTests:any;
	labTestIds:any;
	aboutLab:any;
	stateId:any;
	state_id:any;
	cityId:any;
	city_id:any;
	locationId:any;
	location_id:any;
	other_location:any;
	address:any;
	maplink:any;
	visit_type:any;
	preparedTags:any;
	requestStatus:any;
	profilePage:any;
	fullName:any;
	contactNo:any;
	emailId:any;
	passwordUser:any;
	registerId:any;
	namePattern="[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*";
	emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
	states:any;
	cities:any;
	locations:any;
	test:any;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public actionsheetCtrl: ActionSheetController, public camera:Camera,public loginservice:Loginservice,public restapiService: AllserviceProvider, private formBuilder: FormBuilder,private  alertCtrl: AlertController,public loadingCtrl: LoadingController, public events: Events) {
		
		this.profilePage = this.formBuilder.group({
			fullName: ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
			contactNo: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(15)/* ,Validators.pattern('[7-9]{1}[0-9]{9}') */])],
			emailId: ['', Validators.compose([Validators.required,Validators.pattern(this.emailPattern)])],
			passwordUser: ['', Validators.compose([Validators.required])],
			registerId: ['', Validators.compose([Validators.required])],
			labTestIds: ['', Validators.compose([Validators.required])],
			aboutLab: ['', Validators.compose([Validators.required])],
			stateId: ['', Validators.compose([Validators.required])],
			cityId: ['', Validators.compose([Validators.required])],
			locationId: ['', Validators.compose([Validators.required])],
			other_location: ['', Validators.compose([Validators.required])],
			address: ['', Validators.compose([Validators.required])],
			visit_type: ['', Validators.compose([Validators.required])]
			//maplink: ['', Validators.compose([Validators.pattern('https:\/\/goo\.gl\/maps\/[a-zA-Z0-9]{10,12}')/* , Validators.required */])]
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
						this.labId = this.userDetails.id;
						this.fullName = this.userDetails.full_name;
						this.contactNo = this.userDetails.contact_no;
						this.emailId = this.userDetails.email;
						this.passwordUser = "";
						this.registerId = this.userDetails.registration_id;
						this.labTestIds = this.userDetails.labTests;
						this.aboutLab = this.userDetails.about;
						this.stateId = this.userDetails.state_id;
						this.cityId = this.userDetails.city_id;
						this.locationId = this.userDetails.location_id;
						this.address = this.userDetails.address;
						//this.maplink = this.userDetails.mapLink;
						this.visit_type = this.userDetails.visitType;
						// console.log("stateId",this.stateId);
						this.base64Image = this.userDetails.image_path;
						this.userId=userId;
						
						this.getStates();
						this.changeState(this.stateId);
						this.changeCity(this.cityId);
						this.changeLocation(this.locationId);
						
						// console.log("app-login-token from getab:"+this.userId);
						 this.getLabTests();	
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
				this.restapiService.addLabImage(imageData, this.userId)
				.then(response => {
					this.loader.dismiss();
					if(response.responseStatus==true){
						console.log('image response',response.response);
						if(response.response.uploadLabImageStatus==true){
							
							this.base64Image = response.response.imagePath;
							let alert = this.alertCtrl.create({ title: "Success",
									subTitle:"Successfully Updated", 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											this.checkuserloggedIn();
											//this.navCtrl.setRoot(HomePage);
											//this.platform.exitApp(); 
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
											//this.navCtrl.setRoot(HomePage);
											//this.platform.exitApp(); 
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
	
	changeState(state_id){
		this.state_id	= state_id;
		this.getCitiesByState(state_id);
	}
	
	changeCity(city_id){
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
	}
	
	errorMessagealert($message){
		let alert = this.alertCtrl.create({ title: "Invalid Details",
						message:$message, 
						buttons: [{ text: 'Ok'}] 
					}); 
		alert.present();
	}

	logoutUser(){
		this.loginservice.clearLogin().then(userId=>{
		  this.navCtrl.setRoot(LoginPage);
	    })
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
		} else if(profilePage.controls['labTestIds'].errors){
			if(profilePage.controls['labTestIds'].errors['required']){
				this.errorMessagealert("Please Select atleast one Lab Test");
				return false;
			}
		} else if(profilePage.controls['aboutLab'].errors){
			if(profilePage.controls['aboutLab'].errors['required']){
				this.errorMessagealert("Please Enter About");
				return false;
			}
		} else if(profilePage.controls['visit_type'].errors){
			if(profilePage.controls['visit_type'].errors['required']){
				this.errorMessagealert("Please Select Visit Type");
				return false;
			}
		}  else if(profilePage.controls['stateId'].errors){
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
		}else if (profilePage.value.aboutLab && profilePage.value.aboutLab.trim() == '') {
			this.errorMessagealert("Please Enter Valid About");
			return false;
		}
		
		/*  else if(profilePage.controls['maplink'].errors){
			if(profilePage.controls['maplink'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid URL");
				return false;
			}else if(profilePage.controls['maplink'].errors['required']){
				this.errorMessagealert("Please Enter Valid URL");
				return false;
			}
		} */
	
		// console.log(profilePage.value);
			
		this.restapiService.updateLabProfileInfo(profilePage.value, this.userId, this.labId)
		.then(response => {
			  // console.log(response);
			if(response.responseStatus==true){
				console.log(response.response);
				if(response.response.labStatus==true){
					//userDetailMsg
					
					let alert = this.alertCtrl.create({ 
						message: response.response.labMsg, 
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
						message: response.response.labMsg, 
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
	
	openDocumentPage(){
		this.navCtrl.push(LabViewReportsPage,{
			action:'uploadLabDocsByProfile'
		});
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
	} */
}
