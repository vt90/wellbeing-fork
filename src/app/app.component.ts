import { Component, ViewChild } from '@angular/core';
//import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Loginservice } from '../services/loginservice';
import { AllserviceProvider } from '../providers/allservice/allservice';
import { Platform,AlertController, Nav } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';
import { TermsPage } from '../pages/terms/terms';

// role doctor
import { SelectClinicPage } from '../pages/select-clinic/select-clinic';
import { DoctorProfilePage } from '../pages/doctor-profile/doctor-profile';
import { ManageClinicPage } from '../pages/manage-clinic/manage-clinic';
import { AssistantListPage } from '../pages/assistant-list/assistant-list';

// role lab
import { LabProfilePage } from '../pages/lab-profile/lab-profile';
 
import { LoginPage } from '../pages/login/login';

import { LabViewReportsPage } from '../pages/lab-view-reports/lab-view-reports';
import { DocAddClinicPage } from '../pages/doc-add-clinic/doc-add-clinic';
import { CreateAssistantPage } from '../pages/create-assistant/create-assistant';
//import { Push, PushObject, PushOptions} from '@ionic-native/push';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

	rootPage: any;
	userId: any;
	userName: any;
	uniqueId: any;
	userRole: any;
	imagePath: any;
	action: any;
	myAlert: any;

	pages: Array<{title: string, component: any}>;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public loginservice:Loginservice,public restapiService: AllserviceProvider,private  alertCtrl: AlertController, public events: Events/* , public push: Push */) {
		this.checkuserloggedIn();
		this.initializeApp();
	
		this.platform.registerBackButtonAction(() => {
		
			 /* let activePortal = ionicApp._loadingPortal.getActive() ||
			 ionicApp._modalPortal.getActive() ||
			 ionicApp._toastPortal.getActive() ||
			 ionicApp._overlayPortal.getActive();
			 if (activePortal) {
				 ready = false;
				 activePortal.dismiss();
				 activePortal.onDidDismiss(() => { ready = true; });
				 return;
			  } */
			 /*  if (menuCtrl.isOpen()) {
				 menuCtrl.close();
				 return;
			   } */
				//let view = this.navCtrl.getActive();
				//let page = view ? this.navCtrl.getActive().instance : null;
				if(this.myAlert){
					//this.platform.exitApp(); //Exit from app
					this.myAlert.dismiss(); 
					this.showAlert();
				}else{
					this.showAlert();
				}	
		}, 1);
    // used for an example of ngFor and navigation
	
		events.subscribe('user:newlogin', (user, time) => {
			// user and time are the same arguments passed in `events.publish(user, time)`
			// console.log('Welcome', user, 'at', time);
			console.log('new user logged in!!');
			this.checkuserloggedIn();
		});

	}
	
	showAlert() {
		 console.log("exit app done");
		 
		 this.myAlert = this.alertCtrl.create({
			title: "Confirm exit",
			message: "Are you sure you want to exit?",
			buttons: [
			  {
				text: 'Cancel',
				role: 'cancel',
				handler: () => {
				  this.myAlert.dismiss(); 
				}
			  },
			  {
				text: 'Exit',
				handler: () => {
				  this.platform.exitApp(); //Exit from app
				}
			  }
			]
		});
		this.myAlert.present();    
    }
	
  initializeApp() {
	this.statusBar.overlaysWebView(false);
	this.statusBar.backgroundColorByHexString('#054b7e');
    this.statusBar.styleLightContent();
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.splashScreen.hide();
	 // this.pushsetup();
	  setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);
	   // this.checkuserloggedIn();
    });
  }

	openPage(page) {
		console.log('page opened!');
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
		if(page.title == 'Logout'){
			this.logoutUser();
		}else{
			this.nav.setRoot(page.component);
		}
	}

	checkuserloggedIn(){
		//this.loader.present();
	 
	  this.loginservice.getAppLoginToken().then(userId=>{
		  console.log("app component login-token == :"+userId);
		  if(userId){
			  this.restapiService.CheckUserValid(userId)
			  .then(response => {
				  console.log("check login===++="+response);
					if(response.responseStatus==true){
						if(response.response.validityStatus==false){
							this.logoutUser();
							this.rootPage=LoginPage;
						}else{
							//this.latestAppVersion = response.response.userDetail.latestAndroidVersion;
							console.log('###preparing menu###');
							this.userId=userId;
							this.userName = response.response.userDetail.full_name;
							this.uniqueId = response.response.userDetail.unique_id;
							this.userRole = response.response.userDetail.userRole;
							
							if(this.userRole == 'patient'){
								this.pages = [
								  { title: 'Home', component: HomePage },
								  { title: 'Profile', component: ProfilePage },
								  { title: 'About', component: AboutPage }, 
								  { title: 'Terms & Services', component: TermsPage },
								  { title: 'Logout', component: LoginPage }
								  //{ title: 'List', component: ListPage }
								];
							}else if(this.userRole == 'doctor'){
								this.pages = [
								  { title: 'Home', component: HomePage },
								  { title: 'Doctor Profile', component: DoctorProfilePage },
								  { title: 'Manage Clinic', component: ManageClinicPage },
								  { title: 'Manage Assistant', component: AssistantListPage },
								  { title: 'Select Clinic', component: SelectClinicPage },
								  { title: 'About', component: AboutPage }, 
								  { title: 'Terms & Services', component: TermsPage },
								  { title: 'Logout', component: LoginPage }
								  //{ title: 'List', component: ListPage }
								];
								
							}else if(this.userRole == 'assistant'){
								this.pages = [
								  { title: 'Home', component: HomePage },
								  { title: 'Select Clinic', component: SelectClinicPage },
								  { title: 'About', component: AboutPage }, 
								  { title: 'Terms & Services', component: TermsPage },
								  { title: 'Logout', component: LoginPage }
								  //{ title: 'List', component: ListPage }
								];
								
							}else if(this.userRole == 'lab'){
								this.pages = [
								  { title: 'Home', component: HomePage },
								  { title: 'Lab Profile', component: LabProfilePage },
								  { title: 'About', component: AboutPage }, 
								  { title: 'Terms & Services', component: TermsPage },
								  { title: 'Logout', component: LoginPage }
								  //{ title: 'List', component: ListPage }
								];
								
							}
							/* this.pages = [
							  { title: 'Home', component: HomePage },
							  { title: 'Profile', component: ProfilePage },
							  { title: 'Doctor Profile', component: DoctorProfilePage },
							  { title: 'Manage Clinic', component: ManageClinicPage },
							  { title: 'Manage Assistant', component: AssistantListPage },
							  { title: 'Select Clinic', component: SelectClinicPage },
							  { title: 'Lab Profile', component: LabProfilePage },
							  { title: 'About', component: AboutPage }, 
							  { title: 'Terms & Services', component: TermsPage },
							  { title: 'Logout', component: LoginPage }
							  //{ title: 'List', component: ListPage }
							]; */
							
							this.imagePath = response.response.userDetail.image_path;
							//this.rootPage=HomePage;
							if(response.response.userDetail.action == 'uploadDoctorDocs'){
								this.action = 'uploadDoctorDocs';
								this.rootPage=LabViewReportsPage;
							}else if(response.response.userDetail.action == 'addClinic'){
								this.action = 'addClinic';
								this.rootPage=DocAddClinicPage;
							}else if(response.response.userDetail.action == 'addAssistant'){
								this.action = 'addAssistant';
								this.rootPage=CreateAssistantPage;
							}else if(response.response.userDetail.action == 'uploadLabDocs'){
								this.action = 'uploadLabDocs';
								this.rootPage=LabViewReportsPage;
							}else if(response.response.userDetail.action == 'dashboard'){
								this.action = 'dashboard';
								this.rootPage=SelectClinicPage;
							}else if(response.response.userDetail.action == 'assistantDashboard'){
								this.action = 'assistantDashboard';
								this.rootPage=SelectClinicPage;
							}else {
								this.action = '';
								this.rootPage=HomePage;
							}
						}
					}
					  
				  
			  },() =>{
				  let alert = this.alertCtrl.create({ title: "No Internet Connection",
									subTitle:"Please make sure you are connected to the internet", 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											this.platform.exitApp(); 
										} 
									}] 
								}); 
					alert.present();
				  //this.requestStatus=3; 
				
			  });
			  
		  }else{
			  this.rootPage=LoginPage;
		  }
		
		  //console.log("app-login-token from get:"+userId);
	    })
	}
	
	logoutUser(){
		console.log('logout');
		console.log("app-login-token from get:"+this.userId);	
		this.loginservice.clearLogin().then(userId=>{
		  // return email1;
		  //this.emailid=email1;
			/* if(this.userId){
				this.navCtrl.push(HomePage);  
			}else{
			} */
			this.nav.setRoot(LoginPage);
			
			//this.rootPage=LoginPage;
			//this.nav.setRoot(LoginPage);  
		  //this.viewCtrl.dismiss();
		  //this.navCtrl.push(HomePage);  
			console.log("app-login-token from after:"+this.userId);	
		  //console.log("app-login-token from get:"+userId);
	    })
	}

}
