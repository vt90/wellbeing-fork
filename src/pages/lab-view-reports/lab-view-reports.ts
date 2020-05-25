import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';

import { DocAddClinicPage } from '../doc-add-clinic/doc-add-clinic';
import { HomePage } from '../home/home';
import { DoctorProfilePage } from '../doctor-profile/doctor-profile';
import { LabProfilePage } from '../lab-profile/lab-profile';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the LabViewReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lab-view-reports',
  templateUrl: 'lab-view-reports.html',
})
export class LabViewReportsPage {
	public base64Image: string;
	action:any;
	loader:any;
	userName:any;
	userRole:any;
	id:any;
	userId:any;
	appointmentDetails:any;
	appointmentId:any;
	labReportsList:any;
	uploadedDocsList:any=[];
	requestStatus:any;

	constructor(public restapiService: AllserviceProvider, public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, private alertCtrl: AlertController, private camera: Camera, public actionsheetCtrl: ActionSheetController,private iab: InAppBrowser,public loadingCtrl: LoadingController) {
		this.action 			= navParams.get('action');
		this.appointmentDetails = navParams.get('appointmentDetails');
		this.appointmentId = navParams.get('appointmentId');
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
						if(!this.action){
							this.action = response.response.userDetail.action;
						}
						if(this.appointmentDetails){
							this.appointmentId = this.appointmentDetails.id;
							this.getUploadedLabReportsList();
						}
						if(this.appointmentId){
							
							this.getUploadedLabReportsList();
						}
						
						if(this.action == "uploadDoctorDocs" || this.action == "uploadDoctorDocsByProfile"){
							this.getUploadedDoctorDocumentsList();
						}
						if(this.action == "uploadLabDocs" || this.action == "uploadLabDocsByProfile"){
							this.getUploadedLabDocumentsList();
						}
					}
					//this.requestStatus=1;

				}

			},() =>{

			});
	    })
	}
	
	getUploadedLabReportsList(){
		this.restapiService.GetUploadedLabReportsList(this.userId,this.appointmentId).then(response => {
			console.log('GetUploadedLabReportsList',response);
			if(response.responseStatus==true){
				this.labReportsList = response.response.labReportsList;			
				this.requestStatus=1;
			} else{
				this.labReportsList =[];
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	getUploadedDoctorDocumentsList(){
		this.restapiService.GetUploadedDoctorDocumentsList(this.userId).then(response => {
			// console.log('GetUploadedDoctorDocumentsList',response);
			if(response.responseStatus==true){
				if(response.response.documentListStatus==true){
					this.uploadedDocsList = response.response.documentsList;			
					this.requestStatus=1;
				}else{
					this.requestStatus=2;					
				}
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	getUploadedLabDocumentsList(){
		this.restapiService.GetUploadedLabDocumentsList(this.userId).then(response => {
			// console.log('GetUploadedLabDocumentsList',response);
			if(response.responseStatus==true){
				if(response.response.documentListStatus==true){
					// console.log('documentsList',response.response.documentsList);
					this.uploadedDocsList = response.response.documentsList;			
					this.requestStatus=1;
				}else{
					this.requestStatus=2;					
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

	uploadDocuments(){
		if(this.action == "uploadDoctorDocs" || this.action == "uploadDoctorDocsByProfile"){
			
			let actionSheet = this.actionsheetCtrl.create({
				//title: 'Albums',
				//cssClass: 'action-sheets-basic-page',
				buttons: [
					{
						text: 'Take Picture',
						icon: 'camera',
						handler: () => {
							this.takeDoctorDocsPicture(1)
							console.log('Delete clicked');
						}
					},
					{
						text: 'Select from Gallery',
						icon: 'image',
						handler: () => {
							this.takeDoctorDocsPicture(0)
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
			
			// this.navCtrl.push(DocAddClinicPage,{
				// action:"addClinic"
			// });
			// this.navCtrl.setRoot(DocAddClinicPage);
		}else if(this.action == "uploadLabDocs" || this.action == "uploadLabDocsByProfile"){
			let actionSheet = this.actionsheetCtrl.create({
				//title: 'Albums',
				//cssClass: 'action-sheets-basic-page',
				buttons: [
					{
						text: 'Take Picture',
						icon: 'camera',
						handler: () => {
							this.takeLabDocsPicture(1)
							console.log('Delete clicked');
						}
					},
					{
						text: 'Select from Gallery',
						icon: 'image',
						handler: () => {
							this.takeLabDocsPicture(0)
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
			// this.navCtrl.push(HomePage);
			// this.navCtrl.setRoot(HomePage);
		}
	}
	
	attachFiles(){		
		let actionSheet = this.actionsheetCtrl.create({
			//title: 'Albums',
			//cssClass: 'action-sheets-basic-page',
			buttons: [
				{
					text: 'Take Picture',
					icon: 'camera',
					handler: () => {
						this.takeLabReportPicture(1)
						console.log('Delete clicked');
					}
				},
				{
					text: 'Select from Gallery',
					icon: 'image',
					handler: () => {
						this.takeLabReportPicture(0)
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
	
	takeDoctorDocsPicture(sourceType:number) {
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
			 console.log("imageData="+imageData);
			
			if(imageData){
				this.restapiService.UploadDoctorDocs(imageData, this.userId)
				.then(response => {
					this.loader.dismiss();
					if(response.responseStatus==true){
						console.log('sales funnel',response.response);
						if(response.response.uploadDocumentStatus==true){
							let alert = this.alertCtrl.create({ title: "Success",
									subTitle:"Successfully Uploaded", 
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
											this.getUploadedDoctorDocumentsList();
										} 
									}],
									enableBackdropDismiss: false  
								}); 
							alert.present();
							this.requestStatus=1;
						}else{
							let alert = this.alertCtrl.create({ title: "Failed",
									subTitle:"Successfully Not Uploaded", 
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
	
	takeLabDocsPicture(sourceType:number) {
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
			 console.log("imageData="+imageData);
			/* this.restapiService.getAllProspectList(this.userId)
			.then(response => {
				if(response.responseStatus==true){
					console.log('sales funnel',response.response);
					if(response.response.prospectStatus==true){
						this.prospectList = response.response.prospectList;
						this.requestStatus=1;
					}else{
						this.requestStatus=2;
					}
				}
			},() =>{
				 this.requestStatus=3;
			}); */
			if(imageData){
				this.restapiService.UploadLabDocs(imageData, this.userId)
				.then(response => {
					this.loader.dismiss();
					if(response.responseStatus==true){
						console.log('sales funnel',response.response);
						if(response.response.uploadDocumentStatus==true){
							let alert = this.alertCtrl.create({ title: "Success",
									subTitle:"Successfully Uploaded", 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											// this.navCtrl.setRoot(HomePage);
											this.getUploadedLabDocumentsList();
										} 
									}],
									enableBackdropDismiss: false  
								}); 
							alert.present();
							this.requestStatus=1;
						}else{
							let alert = this.alertCtrl.create({ title: "Failed",
									subTitle:"Successfully Not Uploaded", 
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
	
	takeLabReportPicture(sourceType:number) {
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
			// console.log("imageData="+imageData);
			/* this.restapiService.getAllProspectList(this.userId)
			.then(response => {
				if(response.responseStatus==true){
					console.log('sales funnel',response.response);
					if(response.response.prospectStatus==true){
						this.prospectList = response.response.prospectList;
						this.requestStatus=1;
					}else{
						this.requestStatus=2;
					}
				}
			},() =>{
				 this.requestStatus=3;
			}); */
			if(imageData){
				// console.log("imageData: "+imageData);
				// console.log("userId: "+this.userId);
				// console.log("appointmentDetails: "+this.appointmentDetails.id);
				this.restapiService.UploadLabReport(imageData, this.userId, this.appointmentDetails.id)
				.then(response => {
					this.loader.dismiss();
					if(response.responseStatus==true){
						console.log('sales funnel',response.response);
						if(response.response.labReportStatus==true){
							let alert = this.alertCtrl.create({ title: "Success",
									subTitle:"Successfully Uploaded", 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											this.getUploadedLabReportsList();
										} 
									}],
									enableBackdropDismiss: false  
								}); 
							alert.present();
							this.requestStatus=1;
						}else{
							let alert = this.alertCtrl.create({ title: "Failed",
									subTitle:"Successfully Not Uploaded", 
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
		
	deleteReport(reportDetails){
		this.restapiService.DeleteLabReport(this.userId,reportDetails).then(response => {
			if(response.responseStatus=true){
				let alert = this.alertCtrl.create({ title: response.response.deleteTitle,
						message: response.response.deleteMsg, 
						buttons: [{ text: 'Ok', 
							handler: () => { 
								this.getUploadedLabReportsList();
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
	
	viewPrescription(path){
		console.log('path',path);
		//return false;
		this.iab.create(path,'_self',{location:'no'});
	}
	
	gotoAddClinic(){
		this.navCtrl.setRoot(DocAddClinicPage,{
			action:"addClinic"
		});
	}
	
	gotoHome(){
		this.navCtrl.setRoot(HomePage);
	}
	
	gotoDoctorProfile(){
		this.navCtrl.setRoot(DoctorProfilePage);
	}
	
	gotoLabProfile(){
		this.navCtrl.setRoot(LabProfilePage);
	}
	
}
	
	/* ionViewDidLoad() {
		console.log('ionViewDidLoad LabViewReportsPage');
	} */