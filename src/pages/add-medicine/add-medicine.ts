import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Validators, FormBuilder } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
import { AppointmemtHistoryPage } from '../appointmemt-history/appointmemt-history';
import { MedicineListPage } from '../medicine-list/medicine-list';
import { PatientDetailPage } from '../patient-detail/patient-detail';

/**
 * Generated class for the AddMedicinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-medicine',
  templateUrl: 'add-medicine.html',
})
export class AddMedicinePage {
	minDate:any="";
	minmDate:any="";
	maxDate:any="";
	userId:any="";
	userDetails:any="";
	requestStatus:any="";
	clinicId:any=0;
	clinicName:any="";
	Medicine:any="";
	appointmentId:any="";
	medicineId:any="";
	medicineName:any="";
	medicineTimings:any="";
	medicineDays:any="";
	appointmentDetails:any="";
	medicineDetails:any="";

public base64Image: string;
	constructor(public navCtrl: NavController, public navParams: NavParams, public actionsheetCtrl: ActionSheetController, public camera:Camera, public loginservice:Loginservice, public restapiService: AllserviceProvider, private formBuilder: FormBuilder, private  alertCtrl: AlertController) {
		this.Medicine = this.formBuilder.group({
			minmDate: ['', Validators.compose([Validators.required])],
			medicineName: ['', Validators.compose([Validators.required])],
			medicineTimings: ['', Validators.compose([Validators.required])],			
			medicineDays: ['', Validators.compose([Validators.required])]
		});

		this.medicineId = navParams.get('medicineId');
		if(!this.medicineId){
			this.medicineId = ""; 
		}
		/* this.medicineId	= '';
		this.medicineDetails = navParams.get('medicineDetails');
		if(this.medicineDetails){
			this.medicineId			= this.medicineDetails.id;
			this.medicineName		= this.medicineDetails.medicineName;
			this.medicineTimings	= this.medicineDetails.medicineTimings;
			this.medicineDays		= this.medicineDetails.medicineDays;
			this.minmDate			= this.medicineDetails.medicineStartDate;
		} */
		
		
		this.appointmentDetails 	= navParams.get('appointmentDetails');
		this.appointmentId			= this.appointmentDetails.id;
		
		var dateObj = new Date();
      	this.minDate = dateObj.getFullYear() + '-' +  ('0' + (dateObj.getMonth()+1)).slice(-2)  + '-' + ('0' + dateObj.getDate()).slice(-2);
      	this.minmDate = dateObj.getFullYear() + '-' +  ('0' + (dateObj.getMonth()+1)).slice(-2)  + '-' + ('0' + dateObj.getDate()).slice(-2);
		
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
						
					}
				  }
				  
			  },() =>{
				 
			  });  
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
					if(this.medicineId){
						this.getMedicineDetailsById(this.medicineId);	
					}
				}

			},() =>{

			});
	    })
	}
	
	getMedicineDetailsById(medicineId){
		this.restapiService.getMedicineDetailsById(this.userId,medicineId).then(response => {
			if(response.responseStatus=true){
				this.medicineName		= response.response.medicineList.medicineName;
				this.medicineTimings	= response.response.medicineList.medicineTimings;
				this.medicineDays		= response.response.medicineList.medicineDays;
				this.minmDate			= response.response.medicineList.medicineStartDate;
								
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
	
	logoutUser(){
		this.loginservice.clearLogin().then(userId=>{
			this.navCtrl.setRoot(LoginPage);
		})
	}
	
	addMedicine(medicine){
		// console.log(medicine);
		//return false;
		if(medicine.controls['medicineName'].errors){
			if(medicine.controls['medicineName'].errors['required']){
				this.errorMessagealert("Please Enter Medicine Name.");
				return false;
			}
		}else if(medicine.value.medicineName && medicine.value.medicineName.trim() == '') {
			this.errorMessagealert("Please Enter Valid Medicine Name");
			return false;
		}else if(medicine.controls['medicineTimings'].errors){
			if(medicine.controls['medicineTimings'].errors['required']){
				this.errorMessagealert("Please Select Timings.");
				return false;
			}
		}else if(medicine.controls['medicineDays'].errors){
			if(medicine.controls['medicineDays'].errors['required']){
				this.errorMessagealert("Please Select Days of Course.");
				return false;
			}
		}else if(medicine.controls['minmDate'].errors){
			
			if(medicine.controls['minmDate'].errors['required']){
				this.errorMessagealert("Please Select Date");
				return false;
			}
		}
		
		//console.log(this.userId);
		
		this.restapiService.AddMedicine(medicine.value,this.userId,this.clinicId,this.appointmentId,this.medicineId)
		.then(response => {
			console.log(response);
			if(response.responseStatus==true){
				console.log(response.response);
				if(response.response.medicineStatus==true){
					//userDetailMsg
					
					let alert = this.alertCtrl.create({ /* title: response.response.medicineTitle, */
						message: response.response.medicineMsg, 
						buttons: [{ text: 'Ok', 
							handler: () => { 
								/* this.navCtrl.push(MedicineListPage,{
									appointmentDetails:this.appointmentDetails
								}); */
								this.navCtrl.setRoot(PatientDetailPage,{
									appointmentDetails:this.appointmentDetails
								});
							} 
						}],
						enableBackdropDismiss: false
					}); 
					alert.present();
				}
			}				
		});
	}
	
	

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad AddMedicinePage');
	} */
	viewHistory(){
		this.navCtrl.push(AppointmemtHistoryPage);
	}

}
