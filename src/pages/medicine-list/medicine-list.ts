import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';

import { AddMedicinePage } from '../add-medicine/add-medicine';
import { HomePage } from '../home/home';
/**
 * Generated class for the MedicineListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-medicine-list',
	templateUrl: 'medicine-list.html'
})
export class MedicineListPage {
	userId:any="";
	userDetails:any="";
	requestStatus:any="";
	clinicId:any=0;
	clinicName:any="";
	appointmentDetails:any="";
	medicineListInfo = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider, private  alertCtrl: AlertController) {
		this.appointmentDetails 	= navParams.get('appointmentDetails');
		this.checkuserloggedIn();
	}
	
	checkuserloggedIn(){
		this.loginservice.getAppLoginToken().then(userId=>{
		  // console.log("app-login-token from get:"+userId);
		  
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
		  // console.log("app-login-token from get:"+clinicId);

			this.restapiService.CheckClinicValid(this.userId,clinicId)
			.then(response => {
				if(response.responseStatus==true){
					// console.log(response.response);
					
					this.clinicName = response.response.clinicDetails.clinicName;
					this.clinicId = response.response.clinicDetails.clinicId;
					this.getAppointmentwiseMedicinesList();
					
				}

			},() =>{

			});
	    })
	}
	
	getAppointmentwiseMedicinesList(){
		// console.log("success:",this.appointmentDetails);
		this.restapiService.GetAppointmentwiseMedicinesList(this.appointmentDetails, this.userId,this.clinicId).then(response => {
			// console.log('GetClinicwiseDocAppointmentsList',response);
			if(response.responseStatus=true){
				this.medicineListInfo = response.response.medicineList;
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad MedicineListPage');
	} */
	addNewMedicine(){
		this.navCtrl.push(AddMedicinePage,{
			appointmentDetails:this.appointmentDetails
		});
	}
	
	editMedicine(medicineId){
		this.navCtrl.push(AddMedicinePage,{
			medicineId:medicineId,
			appointmentDetails:this.appointmentDetails
		});
	}
	
	deleteMedicine(medicineDetails){
		this.restapiService.DeleteMedicine(this.userId,this.clinicId,medicineDetails).then(response => {
			if(response.responseStatus=true){
				let alert = this.alertCtrl.create({ title: response.response.deleteTitle,
						message: response.response.deleteMsg, 
						buttons: [{ text: 'Ok', 
							handler: () => { 
								this.getAppointmentwiseMedicinesList();
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
	
	goHome(){
		this.navCtrl.setRoot(HomePage);
	}
}
