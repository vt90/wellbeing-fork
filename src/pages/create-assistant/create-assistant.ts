import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AssistantListPage } from '../assistant-list/assistant-list';
import { Validators, FormBuilder } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
import { SelectClinicPage } from '../select-clinic/select-clinic';
import { HomePage } from '../home/home';
/**
 * Generated class for the CreateAssistantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-assistant',
  templateUrl: 'create-assistant.html',
})
export class CreateAssistantPage {
	userDetails:any;
	userId:any;
	clinicList:any;
	Assistant:any;
	assistantId:any;
	requestStatus:any;
	assistantInfo:any;
	
	clinicName:any;
	assistantName:any;
	assistantEmail:any;
	assistantMobile:any;
	assistantPassword:any;
	action:any;
	
	namePattern="[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*";
	emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
	constructor(public navCtrl: NavController, public navParams: NavParams,public loginservice:Loginservice,public restapiService: AllserviceProvider,private formBuilder: FormBuilder,private  alertCtrl: AlertController) {
		this.action = navParams.get('action');
		
		this.assistantId = navParams.get('assistantId');
		if(!this.assistantId){
			this.assistantId = ""; 
		}
		console.log("this.assistantId",this.assistantId);
		this.Assistant = this.formBuilder.group({
			clinicName: ['', Validators.compose([Validators.required])],
			assistantName: ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
			assistantEmail: ['', Validators.compose([Validators.required,Validators.pattern(this.emailPattern)])],
			assistantMobile: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(15),Validators.pattern('[7-9]{1}[0-9]{9}|[0-9]{11,15}')])],
			//assistantMobile: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(15),Validators.pattern('[7-9]{1}[0-9]{9}')])],
			assistantPassword: ['', Validators.compose([Validators.required])]
			
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
						this.userDetails = response.response.userDetail;
						//this.userDetails = response.response.userDetail.id;
						this.userId=userId;
						if(!this.action){
                            this.action = response.response.userDetail.action;
                        }
						// console.log("app-login-token from getab:"+this.userId);
						this.getAllClinicList();	
						if(this.assistantId){
							this.getAssistantDetails(this.assistantId);	
						}
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
	
	getAssistantDetails(assistantId){
		console.log('userId',this.userId);
		this.restapiService.getAssistantDetails(this.userId,assistantId).then(response => {
			console.log('getAllClinicList',response);
			if(response.responseStatus=true){
				this.assistantInfo = response.response.assistantList;
				this.clinicName = response.response.assistantList.clinicId;
				this.assistantName = response.response.assistantList.assistantName;
				this.assistantEmail = response.response.assistantList.assistantEmail;
				this.assistantMobile = response.response.assistantList.assistantMobile;
				
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	getAllClinicList(){
		console.log('userId',this.userId);
		this.restapiService.getAllClinicList(this.userId).then(response => {
			console.log('getAllClinicList',response);
			if(response.responseStatus=true){
				this.clinicList = response.response.clinicList;
				this.requestStatus=1;
			} else{
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
	
	createAssistant(assistant){
		console.log(assistant);
		//return false;
		if(assistant.controls['clinicName'].errors){
			if(assistant.controls['clinicName'].errors['required']){
				this.errorMessagealert("Please Select Clinic");
				return false;
			}
		}else if(assistant.controls['assistantName'].errors){
			if(assistant.controls['assistantName'].errors['required']){
				this.errorMessagealert("Please Enter Name");
				return false;
			}else if(assistant.controls['assistantName'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Name");
				return false;
			}
		}else if(assistant.controls['assistantEmail'].errors){
			if(assistant.controls['assistantEmail'].errors['required']){
				this.errorMessagealert("Please Enter Email");
				return false;
			} else if(assistant.controls['assistantEmail'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Email");
				return false;
			}
		}else if(assistant.controls['assistantMobile'].errors){
			if(assistant.controls['assistantMobile'].errors['required']){
				this.errorMessagealert("Please Enter Contact No.");
				return false;
			} else if(assistant.controls['assistantMobile'].errors['minlength']){
				this.errorMessagealert("Please Enter Valid Contact No.");
				return false;
			} else if(assistant.controls['assistantMobile'].errors['maxlength']){
				this.errorMessagealert("Please Enter Valid Contact No.");
				return false;
			} else if(assistant.value.assistantMobile.length == 10){
				if(assistant.controls['assistantMobile'].errors['pattern']){
					this.errorMessagealert("Please Enter Valid Mobile No.");
					return false;
				}
			}
		}else if(assistant.controls['assistantPassword'].errors){
			if(!this.assistantId){
				if(assistant.controls['assistantPassword'].errors['required']){
					this.errorMessagealert("Please Enter Password");
					return false;
				}
			}
		} 
		
		//console.log(this.userId);
		
		this.restapiService.createAssistantByDoctor(assistant.value,this.userId,this.assistantId)
		  .then(response => {
			  console.log(response);
			   if(response.responseStatus==true){
					console.log(response.response);
					if(response.response.assistantStatus==true){
						//userDetailMsg
						
						let alert = this.alertCtrl.create({ /* title: response.response.userUpdatetitle, */
							message: response.response.assistantMsg, 
							buttons: [{ text: 'Ok', 
								handler: () => { 
									if(this.action == 'addAssistant'){
										this.navCtrl.setRoot(HomePage);
									}else{
										this.goToAssistantList();
									}
								} 
							}],
							enableBackdropDismiss: false
						}); 
						alert.present();
					}else{
						let alert = this.alertCtrl.create({ title: response.response.userUpdatetitle,
							message: response.response.assistantMsg, 
							buttons: [{ text: 'Ok', 
								handler: () => { 
									
								} 
							}] 
						}); 
						alert.present();
					}
			   }
				
		});
	}
	
	/* ionViewDidLoad() {
		console.log('ionViewDidLoad CreateAssistantPage');
	} */
	
	skipAssistant(){
		this.navCtrl.setRoot(SelectClinicPage);
		// this.navCtrl.push(HomePage);
		// this.navCtrl.setRoot(HomePage);
	}
	
	goToAssistantList(){
		this.navCtrl.setRoot(AssistantListPage);
	}
}
