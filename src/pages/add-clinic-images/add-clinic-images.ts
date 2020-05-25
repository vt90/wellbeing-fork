import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the AddClinicImagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-clinic-images',
  templateUrl: 'add-clinic-images.html',
})
export class AddClinicImagesPage {
	clinicId:any=0;
	loader:any;
	userDetails:any;
	userId:any;
	requestStatus:any;
	uploadedImageList:any=[];
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider, public actionsheetCtrl: ActionSheetController, public camera:Camera, private  alertCtrl: AlertController,private iab: InAppBrowser,public loadingCtrl: LoadingController) {
	  
		this.clinicId = navParams.get('clinicId');
		console.log("clinicId==: ",this.clinicId);
	  
		this.checkuserloggedIn();
	  
	  
	  
	  
	}
	
	
	checkuserloggedIn(){
		this.loginservice.getAppLoginToken().then(userId=>{
		  console.log("app-login-token from get:"+userId);
		  
			this.restapiService.CheckUserValid(userId)
			.then(response => {
			  if(response.responseStatus==true){
				// console.log(response.response);
				if(response.response.validityStatus==false){
					this.logoutUser();
					
				}else{
					this.userDetails = response.response.userDetail;
					//this.userDetails = response.response.userDetail.id;
					this.userId=userId;
					this.getUploadedClinicImagesList()
					//this.checkClinicId();
					// console.log("app-login-token from getab:"+this.userId);
						
					// if(this.assistantId){
						// this.getAssistantDetails(this.assistantId);	
					// }
				}
			  }
			  
			},() =>{
			 
			});  
	    })
	}
	
	getUploadedClinicImagesList(){
		this.restapiService.GetUploadedClinicImages(this.userId,this.clinicId).then(response => {
			// console.log('GetUploadedDoctorDocumentsList',response);
			if(response.responseStatus==true){
				if(response.response.documentListStatus==true){
					this.uploadedImageList = response.response.documentsList;			
					this.requestStatus=1;
				}else{
					this.requestStatus=2;					
				}
			} else{
				this.uploadedImageList = [];
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
  
	viewPrescription(path){
		console.log('path',path);
		//return false;
		this.iab.create(path,'_self',{location:'no'});
	}
  
	uploadClinicImage() {
		let actionSheet = this.actionsheetCtrl.create({
			//title: 'Albums',
			//cssClass: 'action-sheets-basic-page',
			buttons: [
				{
					text: 'Take Picture',
					icon: 'camera',
					handler: () => {
						this.uploadClinicPage(1)
						console.log('Delete clicked');
					}
				},
				{
					text: 'Select from Gallery',
					icon: 'image',
					handler: () => {
						this.uploadClinicPage(0)
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
	
	deleteClinicImages(clinicImageId){
		this.restapiService.DeleteClinicImage(this.userId,this.clinicId,clinicImageId).then(response => {
			if(response.responseStatus=true){
				let alert = this.alertCtrl.create({ //title: response.response.deleteTitle,
						message: response.response.deleteMsg, 
						buttons: [{ text: 'Ok', 
							handler: () => { 
								this.getUploadedClinicImagesList();
							} 
						}],
						enableBackdropDismiss: false 
					}); 
					alert.present();
				
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		});
	}
	
	uploadClinicPage(sourceType:number) {
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
			// this.base64Image = 'data:image/jpeg;base64,' + imageData;
			 console.log("imageData1="+imageData);
			 console.log("userId2="+this.userId);
			 console.log("clinicId3="+this.clinicId);
			
			if(imageData){
				this.restapiService.uploadClinicImagePage(imageData, this.userId, this.clinicId)
				.then(response => {
					this.loader.dismiss();
					if(response.responseStatus==true){
						console.log('sales funnel',response.response);
						if(response.response.uploadDocumentStatus == true){
							//this.base64Image = response.response.documentPath;
							let alert = this.alertCtrl.create({ title: "Success",
									subTitle:"Successfully Updated", 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											/* if(this.action == "uploadDoctorDocs"){
												this.navCtrl.setRoot(DocAddClinicPage,{
													action:"addClinic"
												});
												// this.navCtrl.setRoot(DocAddClinicPage);
											}else if(this.action == "uploadDoctorDocsByProfile"){
												this.navCtrl.setRoot(HomePage);
											} */
											this.getUploadedClinicImagesList();
											
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
											//this.platform.exitApp(); 
										} 
									}] 
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
											//this.platform.exitApp(); 
										} 
									}] 
								}); 
					alert.present();
					 this.requestStatus=3;
				});
			}
		  
		}, (err) => {
			this.loader.dismiss();
		  // Handle error
		});
	}
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddClinicImagesPage');
  }

}
