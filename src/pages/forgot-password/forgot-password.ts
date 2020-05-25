import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Validators, FormBuilder } from '@angular/forms';

import { LoginPage } from '../login/login';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
	forgetPasswordField:any;
	requestStatus:any;
	userEmail:any;

	emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
	constructor(public restapiService: AllserviceProvider, public navCtrl: NavController, public navParams: NavParams, private  alertCtrl: AlertController, private formBuilder: FormBuilder) {
		this.forgetPasswordField = this.formBuilder.group({
			userEmail: ['', Validators.compose([Validators.required,Validators.pattern(this.emailPattern)])]
		});
	}
	
	errorMessagealert($message){
		let alert = this.alertCtrl.create({ title: "Invalid Details",
						message:$message, 
						buttons: [{ text: 'Ok'}] 
					}); 
		alert.present();
	}
	
	forgetPassword(forgetPasswordDetail){
		if(forgetPasswordDetail.controls['userEmail'].errors){
			if(forgetPasswordDetail.controls['userEmail'].errors['required']){
				this.errorMessagealert("Please Enter Email");
				return false;
			} else if(forgetPasswordDetail.controls['userEmail'].errors['pattern']){
				this.errorMessagealert("Please Enter Valid Email");
				return false;
			}
		}
				
		this.restapiService.ForgetPassword(forgetPasswordDetail.value)
		.then(response => {
			if(response.responseStatus==true){
				if(response.response.forgetPasswordStatus==true){
					//userDetailMsg
					
					let alert = this.alertCtrl.create({ title: response.response.forgetPasswordTitle,
						message: response.response.forgetPasswordMsg, 
						buttons: [{ text: 'Ok', 
							handler: () => { 							
								this.navCtrl.setRoot(LoginPage);
								// this.navCtrl.setRoot(LoginPage);									
							} 
						}],
						enableBackdropDismiss: false 
					}); 
					alert.present();
				}else{
					let alert = this.alertCtrl.create({ title: response.response.forgetPasswordTitle,
							subTitle:response.response.forgetPasswordMsg, 
							buttons: [{ text: 'Ok'
							}] 
						}); 
					alert.present();
				}
			}	
		});
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad ForgotPasswordPage');
	} */

}
