import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BookAppointmentPage } from '../book-appointment/book-appointment';
import { DocAddAppointmentPage } from '../doc-add-appointment/doc-add-appointment';
import { Validators, FormBuilder } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
/**
 * Generated class for the DocRegisterPatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doc-register-patient',
  templateUrl: 'doc-register-patient.html',
})
export class DocRegisterPatientPage {
	userId:any="";
	userDetails:any="";
	drRegisterPatient:any="";
	clinicId:any="";
	emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
	namePattern="[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*";
	constructor(public navCtrl: NavController, public navParams: NavParams,public loginservice:Loginservice,public restapiService: AllserviceProvider,private formBuilder: FormBuilder,private  alertCtrl: AlertController) {
		
		//this.clinicId = 1;
		this.drRegisterPatient = this.formBuilder.group({
			pName: ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
			pPassword: ['', Validators.compose([Validators.required])],
			pEmail: ['', Validators.compose([Validators.required,Validators.pattern(this.emailPattern)])],
			pMobile: ['', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(15),Validators.pattern('[7-9]{1}[0-9]{9}|[0-9]{11,15}')])],
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
						this.checkClinicId();
						// console.log("app-login-token from getab:"+this.userId);
						//this.getAllClinicList();	
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
					
						//this.clinicName = response.response.clinicDetails.clinicName;
						this.clinicId = response.response.clinicDetails.clinicId;
					
					//this.requestStatus=1;
				  }

			  },() =>{

			  });
	    })
	}
	
	errorMessagealert($message){
		let alert = this.alertCtrl.create({ title: "Invalid Details",
						message:$message, 
						buttons: [{ text: 'Ok'}] 
					}); 
		alert.present();
	}
	
	createRegisterPatientByDoctor(drRegisterPatient){
		console.log(drRegisterPatient);
		//return false;
		if(drRegisterPatient.controls['pName'].errors){
			if(drRegisterPatient.controls['pName'].errors['required']){
				this.errorMessagealert("Please Enter Name");
				return false;
			}else if(drRegisterPatient.controls['pName'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Name");
				return false;
			}
		} else if(drRegisterPatient.controls['pMobile'].errors){
			if(drRegisterPatient.controls['pMobile'].errors['required']){
				this.errorMessagealert("Please Enter Mobile No.");
				return false;
			} else if(drRegisterPatient.controls['pMobile'].errors['minlength']){
				this.errorMessagealert("Please Enter Valid Mobile No.");
				return false;
			} else if(drRegisterPatient.controls['pMobile'].errors['maxlength']){
				this.errorMessagealert("Please Enter Valid Mobile No");
				return false;
			} else if(drRegisterPatient.value.pMobile.length == 10){
				if(drRegisterPatient.controls['pMobile'].errors['pattern']){
					this.errorMessagealert("Please Enter Valid Mobile No.");
					return false;
				}
			}	
		} else if(drRegisterPatient.controls['pEmail'].errors){
			if(drRegisterPatient.controls['pEmail'].errors['required']){
				this.errorMessagealert("Please Enter Email");
				return false;
			} else if(drRegisterPatient.controls['pEmail'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Email");
				return false;
			}
		} else if(drRegisterPatient.controls['pPassword'].errors){
			if(drRegisterPatient.controls['pPassword'].errors['required']){
				this.errorMessagealert("Please Enter Password");
				return false;
			}
			
		} 
		
		this.restapiService.createRegisterPatientByDoctor(drRegisterPatient.value,this.userId,this.clinicId)
		  .then(response => {
			  console.log(response);
			   if(response.responseStatus==true){
					console.log(response.response);
					if(response.response.patientStatus==true){
						//userDetailMsg
						this.drRegisterPatient.reset();
						let alert = this.alertCtrl.create({ 
							//message: response.response.patientMsg, 
							message: "Would you like to book appointment for the this patient", 
							buttons: [{ text: 'Yes', 
								handler: () => { 
									
									this.navCtrl.push(BookAppointmentPage,{										
										patientId:response.response.patientId,
										pUniqueId:response.response.pUniqueId,
										visit_type:'Clinic'
									});
								} 
							},{ text: 'No', 
								handler: () => { 
									 this.navCtrl.push(DocAddAppointmentPage);
								} 
							}],
							enableBackdropDismiss: false 
						}); 
						alert.present();
					}else{
						let alert = this.alertCtrl.create({ title: "Invalid Details!",
							subTitle:response.response.patientMsg, 
							buttons: [{ text: 'Ok', 
							}] 
						}); 
						alert.present();
					}
			   }	
		}); 
	}
	
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad DocRegisterPatientPage');
	}
	/* showConfirm() {
		let confirm = this.alertCtrl.create({
		title: 'Would you like to book appointment for the this patient',
		//message: 'Would you like to book appointment for the this patient',
		buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.push(BookAppointmentPage);
          }
        },
        {
          text: 'No',
          handler: () => {
            this.navCtrl.push(DocAddAppointmentPage);
          }
        }
		]	 
    });
    confirm.present();
	} */

}
