import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController,LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MedicineListPage } from '../medicine-list/medicine-list';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
import { PatientAddDetailPage } from '../patient-add-detail/patient-add-detail';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HomePage } from '../home/home';

/**
 * Generated class for the PatientDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-patient-detail',
	templateUrl: 'patient-detail.html',
})
export class PatientDetailPage {
	loader:any="";
	userId:any="";
	userDetails:any="";
	requestStatus:any="";
	clinicId:any=0;
	clinicName:any="";
	appointmentDetails:any="";
	patientName:any="";
	patientMobileNo:any="";
	patientLocation:any="";
	appointment_details:any="";
	base64Image:any="";
	imageName:any="";
	appointmentId:any="";

	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider, public actionsheetCtrl: ActionSheetController, public camera:Camera, private  alertCtrl: AlertController,private iab: InAppBrowser,public loadingCtrl: LoadingController) {
		this.appointmentDetails 	= navParams.get('appointmentDetails');
		console.log("appointmentDetails: ",this.appointmentDetails);
		this.patientName			= this.appointmentDetails.patient_name;
		this.patientMobileNo		= this.appointmentDetails.patient_mobile_no;
		this.patientLocation		= this.appointmentDetails.patient_location;
		this.appointment_details	= this.appointmentDetails.appointment_detail;
		this.base64Image	= this.appointmentDetails.imagePath;
		this.imageName	= this.appointmentDetails.prescription_image;
		this.appointmentId	= this.appointmentDetails.id;
		
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
					this.checkClinicId();
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
	
	logoutUser(){
		this.loginservice.clearLogin().then(userId=>{
			this.navCtrl.setRoot(LoginPage);
		})
	}
	
	checkClinicId(){
		this.loginservice.getAppClinicId().then(clinicId=>{
		  console.log("app-login-token from get:"+clinicId);

			this.restapiService.CheckClinicValid(this.userId,clinicId)
			.then(response => {
				if(response.responseStatus==true){
					console.log(response.response);
					
					this.clinicName = response.response.clinicDetails.clinicName;
					this.clinicId = response.response.clinicDetails.clinicId;
					// this.getAppointmentDetails();					
				}

			},() =>{

			});
	    })
	}
	
	/* getAppointmentDetails(){
		this.restapiService.GetAppointmentDetails(this.userId,this.clinicId,).then(response => {
			console.log('GetClinicwiseDocAppointmentsList',response);
			if(response.responseStatus=true){
				this.activeAppointmentListInfo = response.response.activeList;				
				this.archiveAppointmentListInfo = response.response.archiveList;				
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	} */

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad PatientDetailPage');
	} */
	addDetails(){
		this.navCtrl.push(PatientAddDetailPage,{
			appointmentDetails:this.appointmentDetails
		});
	}
	addMedicine(){
		this.navCtrl.push(MedicineListPage,{
			appointmentDetails:this.appointmentDetails
		});
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
						this.uploadPrescriptionPage(1)
						console.log('Delete clicked');
					}
				},
				{
					text: 'Select from Gallery',
					icon: 'image',
					handler: () => {
						this.uploadPrescriptionPage(0)
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
	
	uploadPrescriptionPage(sourceType:number) {
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
			
			if(imageData){
				this.restapiService.UploadPrescriptionDocs(imageData, this.userId, this.appointmentId)
				.then(response => {
					this.loader.dismiss();
					if(response.responseStatus==true){
						console.log('sales funnel',response.response);
						if(response.response.uploadDocumentStatus == true){
							this.base64Image = response.response.documentPath;
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
											//this.getUploadedDoctorDocumentsList();
											
										} 
									}] 
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
	
	viewPrescription(path){
		console.log('path',path);
		//return false;
		this.iab.create(path,'_self',{location:'no'});
	}
	
	openHome(){
		
		let alert = this.alertCtrl.create({ message: "Are you sure you want to complete prescription?", 
			buttons: [{ text: 'Ok', 
				handler: () => { 
					this.restapiService.CompleteDoctorAppointment(this.userId, 'Prescription Completed', this.appointmentId).then(response => {
						if(response.responseStatus==true){
							this.navCtrl.setRoot(HomePage);
							this.requestStatus=1;
						} else{
							let alert = this.alertCtrl.create({ /* title: "No Internet Connection", */
									subTitle:response.responseMsg, 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											//this.platform.exitApp(); 
										} 
									}] 
								}); 
							alert.present();
							this.requestStatus=2;
						}
					},() =>{
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
			},{
				text: 'Cancel', 
				handler: () => { 
				}
			}],
			enableBackdropDismiss: false  
		}); 
		alert.present();
		
	}
	
	goHome(){
		this.navCtrl.setRoot(HomePage);
	}
}
