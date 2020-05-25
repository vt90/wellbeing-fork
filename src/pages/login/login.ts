import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,AlertController, LoadingController,ModalController,ViewController, MenuController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { HomePage } from '../home/home';
// import { CustomValidator } from  '../../validators/customvalidator';
import { Loginservice } from '../../services/loginservice';
import { Push,PushObject,PushOptions} from '@ionic-native/push';
import { PatientRegisterPage } from '../patient-register/patient-register';
import { DoctorRegisterPage } from '../doctor-register/doctor-register';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { LabRegisterPage } from '../lab-register/lab-register';

import { LabViewReportsPage } from '../lab-view-reports/lab-view-reports';
import { DocAddClinicPage } from '../doc-add-clinic/doc-add-clinic';
import { CreateAssistantPage } from '../create-assistant/create-assistant';
import { SelectClinicPage } from '../select-clinic/select-clinic';
import { Events } from 'ionic-angular';
//import { NotificationPage } from '../notification/notification';
import { LocalNotifications } from '@ionic-native/local-notifications';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	private login : FormGroup;
	userId:any;
	loader:any;
	pwd:any;
	

	constructor(public platform: Platform,public restapiService: AllserviceProvider,public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, private formBuilder: FormBuilder,private  alertCtrl: AlertController,public loadingCtrl: LoadingController,public modalCtrl: ModalController,public loginservice:Loginservice,public viewCtrl:ViewController, public events: Events,private push:Push, private localNotifications: LocalNotifications) {
		this.login = this.formBuilder.group({
			email: ['', Validators.compose([Validators.required/* ,CustomValidator.validateEmail */])],
			password: ['', Validators.compose([Validators.required])]
		});
		this.checkuserloggedIn();
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
						this.userId=userId;
						/* this.navCtrl.push(HomePage).then(() => {
							const index = this.navCtrl.getActive().index;
							this.navCtrl.remove(0, index);
						}); */
						
						if(response.response.userDetail.action == 'uploadDoctorDocs'){
							this.navCtrl.setRoot(LabViewReportsPage,{
								action:'uploadDoctorDocs'
							});
							//this.navCtrl.setRoot(DocAddClinicPage);
						}else if(response.response.userDetail.action == 'addClinic'){
							this.navCtrl.setRoot(DocAddClinicPage,{
								action:"addClinic"
							});	
							//this.navCtrl.setRoot(DocAddClinicPage);
						}else if(response.response.userDetail.action == 'addAssistant'){
							this.navCtrl.setRoot(CreateAssistantPage,{
								action:"addAssistant"
							});
							// this.navCtrl.setRoot(CreateAssistantPage);
						}else if(response.response.userDetail.action == 'uploadLabDocs'){
							this.navCtrl.setRoot(LabViewReportsPage,{
								action:'uploadLabDocs'
							});
							// this.navCtrl.setRoot(LabViewReportsPage);
						} else if(response.response.userDetail.action == 'dashboard'){
							this.navCtrl.setRoot(SelectClinicPage,{
								action:'dashboard'
							});
							//this.navCtrl.setRoot(SelectClinicPage);
						}else if(response.response.userDetail.action == 'assistantDashboard'){
							this.navCtrl.setRoot(SelectClinicPage,{
								action:'assistantDashboard'
							});
							//this.navCtrl.setRoot(SelectClinicPage);
						}else {									
							this.navCtrl.setRoot(HomePage).then(() => {
								const index = this.navCtrl.getActive().index;
								this.navCtrl.remove(0, index);
							});
							//this.navCtrl.setRoot(HomePage);
						}
					}
				}
			},() =>{
				let alert = this.alertCtrl.create({ title: "No Internet Connection",
					subTitle:"Please make sure you are connected to the internet", 
					buttons: [{ text: 'Ok', 
						handler: () => { 
							// this.platform.exitApp(); 
						} 
					}] 
				}); 
				alert.present();
			});  
	    })
	}

	logoutUser(){
		this.loginservice.clearLogin().then(userId=>{
		  if(userId){
			  //this.isuserLoggedIn=false;
		  }
		  //this.viewCtrl.dismiss();
		  //this.navCtrl.push(HomePage);  
		  //console.log("app-login-token from get:"+userId);
	    })
	}
	
	errorMessagealert(message){
		let alert = this.alertCtrl.create({ title: "Invalid Details",
						subTitle:message, 
						buttons: [{ text: 'Ok', 
							/* handler: () => { 
								this.platform.exitApp(); 
							}  */
						}] 
					}); 
		alert.present();
	}
	
	loginSubmit(loginData){
	   console.log(loginData);
		this.loader = this.loadingCtrl.create({
			spinner:"circles"
			//content: "your message"
		});
		
		this.loader.present().then(()=>{
			if(loginData.controls['email'].errors){
				//if(loginData.controls['email'].errors['required']){
					this.errorMessagealert("Please Enter Email-Id Or Mobile");
					this.loader.dismiss();
					return false;
				//}
				/* else if(loginData.controls['email'].errors['email']){
					this.errorMessagealert("Please Enter Valid Email-Id");
					this.loader.dismiss();
					return false;
				} */
			}else if(loginData.controls['password'].errors){
				//if(loginData.controls['password'].errors['required']){
					this.errorMessagealert("Please Enter Password");
					this.loader.dismiss();
					return false;
				//}
			}
			//this.loader.present();
			this.restapiService.userLogin(loginData.value)
				.then(responsedata => {
					// console.log(responsedata);
					this.loader.dismiss();
					if(responsedata.responseStatus==true){
						if(responsedata.response.loginStatus==true){
							// this.loginservice.setAppLoginToken(responsedata.response.user.userToken);
							
								this.loginservice.setAppLoginTokenReturnPromise(responsedata.response.user.userToken).then(resp=>{
								console.log("Login set:"+resp);
				
								this.events.publish('user:newlogin', "", Date.now());
								
								//this.pushsetup(responsedata.response.user.userToken);
								this.pushsetup(responsedata.response.user);
							
								/* this.loader.dismiss().then(() => {
									this.navCtrl.push(HomePage);
									this.navCtrl.setRoot(HomePage);
								}); */
								
								//working //
								/* this.loader.dismiss().then(() => {
									if(responsedata.response.user.action == 'uploadDoctorDocs'){
										
										this.navCtrl.setRoot(LabViewReportsPage,{
											action:'uploadDoctorDocs'
										});
										// this.navCtrl.setRoot(LabViewReportsPage);
										// this.navCtrl.push(DocAddClinicPage,{
											// action:"addClinic"
										// });	 
										// this.navCtrl.setRoot(DocAddClinicPage);
									}else if(responsedata.response.user.action == 'addClinic'){
										this.navCtrl.setRoot(DocAddClinicPage,{
											action:"addClinic"
										});	
										//this.navCtrl.setRoot(DocAddClinicPage);
									}else if(responsedata.response.user.action == 'addAssistant'){
										this.navCtrl.setRoot(CreateAssistantPage,{
											action:"addAssistant"
										});
										this.navCtrl.setRoot(CreateAssistantPage);
									}else if(responsedata.response.user.action == 'uploadLabDocs'){
										this.navCtrl.push(LabViewReportsPage,{
											action:'uploadLabDocs'
										});
										this.navCtrl.setRoot(LabViewReportsPage);
									} else if(responsedata.response.user.action == 'dashboard'){
										this.navCtrl.setRoot(SelectClinicPage,{
											action:'dashboard'
										});
										//this.navCtrl.setRoot(SelectClinicPage);
									}else if(responsedata.response.user.action == 'assistantDashboard'){
										this.navCtrl.setRoot(SelectClinicPage,{
											action:'assistantDashboard'
										});
										//this.navCtrl.setRoot(SelectClinicPage);
									}else {									
										this.navCtrl.setRoot(HomePage);
										//this.navCtrl.setRoot(HomePage);
									} 
									// this.navCtrl.push(HomePage);
									// this.navCtrl.setRoot(HomePage);
								}); */
								//working
								
								//this.navCtrl.push(HomePage);
			
			
							});
							
							
						}else{
							//this.loader.dismiss();
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
						//this.loader.dismiss();
						let alert = this.alertCtrl.create({ title: "Invalid Details!",
									subTitle:responsedata.responseMsg, 
									buttons: [{ text: 'Ok', 
									}] 
								}); 
						alert.present();
					}
				},() =>{
					//this.loader.dismiss();
					let alert = this.alertCtrl.create({ title: "No Internet Connection",
									subTitle:"Please make sure you are connected to the internet", 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											// this.platform.exitApp(); 
										} 
									}] 
								}); 
					alert.present();
				});	
		});
	}
	
	/* ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	} */
	/*  loginDone(){
		this.nav.push(HomePage);
		this.nav.setRoot(HomePage);
	} */
	forgotPassword() {
		this.navCtrl.push(ForgotPasswordPage);
	}
	registerPatient() {
		this.navCtrl.push(PatientRegisterPage);
	}
	registerDoctor() {
		this.navCtrl.push(DoctorRegisterPage);
	}
	registerLab() {
		this.navCtrl.push(LabRegisterPage);
	}
	
	
	pushsetup(userResponse){
		/* this.loader = this.loadingCtrl.create({
			spinner:"circles"
			//content: "your message"
		}); */
		//this.loader.present();
		  
		  
		const options:PushOptions={
			 android: {
				senderID: '805076178213',
				forceShow: true,
				sound:true,
				icon: "notification_white_24px"
			 },
			 ios: {
				alert: "true",
				badge: true,
				sound: 'false'
			 },
			 windows: {}
		}
		
		const pushObject: PushObject = this.push.init(options);
		
		/* pushObject.on('onRead').subscribe((data : any) => {
			alert('ok ok!')
			console.log('ok i will read !!');
		}); */
		
		// pushObject.on('onMessage', (data) => {
			// console.log('ok i will message !!!');
		// });
		pushObject.on('notification').subscribe((notification: any) => {
			console.log('Received a notification', notification);
			console.log('notification data: '+ JSON.stringify(notification));

			// {"title":"Assistant List","message":"Hello Anil, This Notification is for Testing purpose.","additionalData":{"content-available":"1","no-cache":"1","id":"5","type":"Doctor","coldstart":true,"visibility":"1","foreground":false}}
			// Schedule a single notification
			this.localNotifications.schedule({
			  id: notification.id,
			  title: notification.title,
			  text: notification.message,
			 // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
			  // data: { secret: key }
			});
		});
		
		
		
		pushObject.on('registration').subscribe((registration: any) => {
				//alert(registration.registrationId);
				//this.loader.present().then(()=>{
				//prompt("Id",registration.registrationId);
				//prompt("Type",registration.registrationType);
				this.loginservice.getGcmToken().then(regId=>{
					if(regId){
						console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
						//alert("old if");
						if(regId!=registration.registrationId){
							
							console.log("ppppppppppppppppppppppppppppppppp");
							this.loginservice.setGcmToken(registration.registrationId);
							this.restapiService.setGcmToken(registration.registrationId,userResponse.userToken)
							.then(responsedata => {
								//prompt("if setgcm",JSON.stringify(responsedata));
								if(responsedata.responseStatus==true){
									//prompt("if responseStatus",responsedata.responseStatus);
									if(responsedata.response.gcmDetailStatus==true){
										//prompt("if gcmDetailStatus",responsedata.response.gcmDetailStatus);
										//this.viewCtrl.dismiss();
										//this.loader.dismiss().then(() => {
											if(userResponse.action == 'uploadDoctorDocs'){
												
												this.navCtrl.setRoot(LabViewReportsPage,{
													action:'uploadDoctorDocs'
												});
												// this.navCtrl.setRoot(LabViewReportsPage);
												// this.navCtrl.push(DocAddClinicPage,{
													// action:"addClinic"
												// });	 
												// this.navCtrl.setRoot(DocAddClinicPage);
											}else if(userResponse.action == 'addClinic'){
												this.navCtrl.setRoot(DocAddClinicPage,{
													action:"addClinic"
												});	
												//this.navCtrl.setRoot(DocAddClinicPage);
											}else if(userResponse.action == 'addAssistant'){
												this.navCtrl.setRoot(CreateAssistantPage,{
													action:"addAssistant"
												});
												//this.navCtrl.setRoot(CreateAssistantPage);
											}else if(userResponse.action == 'uploadLabDocs'){
												this.navCtrl.push(LabViewReportsPage,{
													action:'uploadLabDocs'
												});
												//this.navCtrl.setRoot(LabViewReportsPage);
											}else if(userResponse.action == 'dashboard'){
												this.navCtrl.setRoot(SelectClinicPage,{
													action:'dashboard'
												});
												//this.navCtrl.setRoot(SelectClinicPage);
											}else if(userResponse.action == 'assistantDashboard'){
												this.navCtrl.setRoot(SelectClinicPage,{
													action:'assistantDashboard'
												});
												//this.navCtrl.setRoot(SelectClinicPage);
											}else {									
												this.navCtrl.setRoot(HomePage);
												//this.navCtrl.setRoot(HomePage);
											} 
											// this.navCtrl.push(HomePage);
											// this.navCtrl.setRoot(HomePage);
										//});
									}else{
										//this.loader.dismiss().then(() => {
											let alert = this.alertCtrl.create({ title: responsedata.response.gcmDetailMsgTitle,
												subTitle:responsedata.response.gcmDetailMsg, 
												buttons: [{ text: 'Ok', 
												}] 
											}); 
											alert.present();
										//});
									}
								}else{
									//this.loader.dismiss().then(() => {
										let alert = this.alertCtrl.create({ title: "No Internet Connection",
											subTitle:"Please make sure you are connected to the internet", 
											buttons: [{ text: 'Ok', 
												handler: () => { 
													//this.platform.exitApp(); 
												} 
											}] 
										}); 
										alert.present();
									//});
								}
							});	
						}else{
							console.log("lllllllllllllllllllllllllllllll");
							//alert("oldelse");
							//this.viewCtrl.dismiss();
							//this.loader.dismiss().then(() => {
								if(userResponse.action == 'uploadDoctorDocs'){		
									this.navCtrl.setRoot(LabViewReportsPage,{
										action:'uploadDoctorDocs'
									});
									// this.navCtrl.setRoot(LabViewReportsPage);
									// this.navCtrl.push(DocAddClinicPage,{
										// action:"addClinic"
									// });	 
									// this.navCtrl.setRoot(DocAddClinicPage);
								}else if(userResponse.action == 'addClinic'){
									this.navCtrl.setRoot(DocAddClinicPage,{
										action:"addClinic"
									});	
									//this.navCtrl.setRoot(DocAddClinicPage);
								}else if(userResponse.action == 'addAssistant'){
									this.navCtrl.setRoot(CreateAssistantPage,{
										action:"addAssistant"
									});
									//this.navCtrl.setRoot(CreateAssistantPage);
								}else if(userResponse.action == 'uploadLabDocs'){
									this.navCtrl.push(LabViewReportsPage,{
										action:'uploadLabDocs'
									});
									//this.navCtrl.setRoot(LabViewReportsPage);
								}else if(userResponse.action == 'dashboard'){
									this.navCtrl.setRoot(SelectClinicPage,{
										action:'dashboard'
									});
									//this.navCtrl.setRoot(SelectClinicPage);
								}else if(userResponse.action == 'assistantDashboard'){
									this.navCtrl.setRoot(SelectClinicPage,{
										action:'assistantDashboard'
									});
									//this.navCtrl.setRoot(SelectClinicPage);
								}else {									
									this.navCtrl.setRoot(HomePage);
									//this.navCtrl.setRoot(HomePage);
								} 
									/* this.navCtrl.push(HomePage); */
							//});
							/* this.navCtrl.push(HomePage).then(() => {
							  //const index = this.navCtrl.getActive().index;
							  //this.navCtrl.remove(index);
							}); */
						}
					}else{
						console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
						//alert("else new if");
						this.loginservice.setGcmToken(registration.registrationId);
						//alert("else new if2");
						this.restapiService.setGcmToken(registration.registrationId,userResponse.userToken)
						.then(responsedata => {
							//prompt("else setgcm",JSON.stringify(responsedata));
							if(responsedata.responseStatus==true){
								//prompt("else responseStatus",responsedata.responseStatus);
								if(responsedata.response.gcmDetailStatus==true){
									//prompt("else gcmDetailStatus",responsedata.response.gcmDetailStatus);
									//this.viewCtrl.dismiss();
									//this.loader.dismiss().then(() => {
										// this.navCtrl.setRoot(HomePage);
										
										if(userResponse.action == 'uploadDoctorDocs'){		
											this.navCtrl.setRoot(LabViewReportsPage,{
												action:'uploadDoctorDocs'
											});
										}else if(userResponse.action == 'addClinic'){
											this.navCtrl.setRoot(DocAddClinicPage,{
												action:"addClinic"
											});	
											//this.navCtrl.setRoot(DocAddClinicPage);
										}else if(userResponse.action == 'addAssistant'){
											this.navCtrl.setRoot(CreateAssistantPage,{
												action:"addAssistant"
											});
											//this.navCtrl.setRoot(CreateAssistantPage);
										}else if(userResponse.action == 'uploadLabDocs'){
											this.navCtrl.push(LabViewReportsPage,{
												action:'uploadLabDocs'
											});
											//this.navCtrl.setRoot(LabViewReportsPage);
										}else if(userResponse.action == 'dashboard'){
											this.navCtrl.setRoot(SelectClinicPage,{
												action:'dashboard'
											});
											//this.navCtrl.setRoot(SelectClinicPage);
										}else if(userResponse.action == 'assistantDashboard'){
											this.navCtrl.setRoot(SelectClinicPage,{
												action:'assistantDashboard'
											});
											//this.navCtrl.setRoot(SelectClinicPage);
										}else {									
											this.navCtrl.setRoot(HomePage);
											//this.navCtrl.setRoot(HomePage);
										}
										
										
									//});
								}else{
									//this.loader.dismiss().then(() => {
										let alert = this.alertCtrl.create({ title: responsedata.response.gcmDetailMsgTitle,
											subTitle:responsedata.response.gcmDetailMsg, 
											buttons: [{ text: 'Ok', 
											}] 
										}); 
										alert.present();
									//});
								}
							}else{
								//this.loader.dismiss().then(() => {
									let alert = this.alertCtrl.create({ title: "No Internet Connection",
										subTitle:"Please make sure you are connected to the internet", 
										buttons: [{ text: 'Ok', 
											handler: () => { 
												this.platform.exitApp(); 
											} 
										}] 
									}); 
									alert.present();
								//});
							}
						});	
					}
				});	
			//});
		});  
		pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
		  
		 
	}
	/* pushsetup() {
        const options: PushOptions = {
            android: {
                senderID: '805076178213'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {}
        };

        const pushObject: PushObject = this.push.init(options);

        pushObject.on('notification').subscribe((notification: any) => {
            if (notification.additionalData.foreground) {
                let youralert = this.alertCtrl.create({
                    title: 'New Push notification',
                    message: notification.message
                });
                youralert.present();
            }
        });

        pushObject.on('registration').subscribe((registration: any) => {
            //do whatever you want with the registration ID
        });

        pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
    } */
}
