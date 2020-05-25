import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { SuccessfulAppointmentPage } from '../successful-appointment/successful-appointment';
import { Validators, FormBuilder } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

// import { ActiveAppointmentPage } from '../active-appointment/active-appointment';
// import { DocAddAppointmentPage } from '../doc-add-appointment/doc-add-appointment';
// import { HomePage } from '../home/home';

/**
 * Generated class for the BookAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-book-appointment',
	templateUrl: 'book-appointment.html',
})



export class BookAppointmentPage {
	minDate:any="";
	minmDate:any="";
	maxDate:any="";
	visit_type : any;
	membership : any;
	doctorId : any;
	Morning : any =[];
	Afternoon : any = []; 
	Evening : any = []; 
	Night : any = []; 
	value : any='';
	clinicId : any=0;
	userId:any="";
	userRole:any="";
	userDetails:any="";
	patientId:any="";
	pUniqueId:any="";
	bookAppointment:any="";
	requestStatus:any="";
	activeIndex:any="";
	appointmentId:any="";
	appointment_slot:any="";
	time_schedule:any="";
	appointment_date:any="";
	appointment_for:any="";
	patientName:any="";
 
	diseases = [
		{ title: "Morning"},
		{ title: "Afternoon"},
		{ title: "Evening"}, 
		{ title: "Night"}
	];

	//namePattern="[a-zA-Z0-9\s]+";
	namePattern="[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*";
	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider, private formBuilder: FormBuilder, private  alertCtrl: AlertController) {

        //this.clinicId = 1;
		this.patientId = navParams.get('patientId');
		this.pUniqueId = navParams.get('pUniqueId');
		this.doctorId = navParams.get('doctorId');
		this.clinicId = navParams.get('clinicId');
		this.visit_type = navParams.get('visit_type');
		this.appointmentId = navParams.get('appointmentId');
		// console.log(this.clinicId);
		// console.log(this.pUniqueId);
		
		this.bookAppointment = this.formBuilder.group({
			minmDate: ['', Validators.compose([Validators.required])],
			selectTime: ['', Validators.compose([Validators.required])],
			patientNumbar: ['', Validators.compose([Validators.required])],
			membership: ['', Validators.compose([Validators.required])],
			patientName: ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])]
		});
		
		var dateObj = new Date();
      	this.minDate = dateObj.getFullYear() + '-' +  ('0' + (dateObj.getMonth()+1)).slice(-2)  + '-' + ('0' + dateObj.getDate()).slice(-2);
      	this.minmDate = dateObj.getFullYear() + '-' +  ('0' + (dateObj.getMonth()+1)).slice(-2)  + '-' + ('0' + dateObj.getDate()).slice(-2);

        // var dateObjNew = new Date();
      	//this.maxDate = dateObjNew.getFullYear() + '-' +  ('0' + (dateObjNew.getMonth()+1)).slice(-2)  + '-' + ('0' + (dateObjNew.getDate()+7)).slice(-2);
		
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
						// console.log("userDetails: ",this.userDetails);
						this.userRole = response.response.userDetail.userRole;
						//this.userDetails = response.response.userDetail.id;
						this.userId=userId;
						if(this.userRole != 'patient'){
							this.checkClinicId();
						}else{
							this.pUniqueId = response.response.userDetail.unique_id;
							
							if(this.appointmentId){
								this.getAppointmentDetailsById();
							}else{
								this.appointmentId	= '';
								this.getAllTimeInterval(this.minmDate);								
							}
						}
						// console.log("app-login-token from getab:"+this.userId);
						
					}
				  }
				  
			  },() =>{
				 
			  });  
	    })
	}
	
	checkClinicId(){
		this.loginservice.getAppClinicId().then(clinicId=>{
		  // console.log("app-login-token from get:"+clinicId);

		   this.restapiService.CheckClinicValid(this.userId,clinicId)
			  .then(response => {
				  if(response.responseStatus==true){
					// console.log(response.response);
					
						//this.clinicName = response.response.clinicDetails.clinicName;
						this.clinicId = response.response.clinicDetails.clinicId;
						this.getAllTimeInterval(this.minmDate);
					
					//this.requestStatus=1;
				  }

			  },() =>{

			  });
	    })
	}
	
	changeAppoinmentDate(minDate){
		// console.log('minDate',minDate);
		this.getAllTimeInterval(minDate);
	}
	
	errorMessagealert($message){
		let alert = this.alertCtrl.create({ title: "Invalid Details",
						message:$message, 
						buttons: [{ text: 'Ok'}] 
					}); 
		alert.present();
	}
	
	createbookAppointment(bookAppointment){
		console.log(bookAppointment);
		if(bookAppointment.controls['minmDate'].errors){
			
			if(bookAppointment.controls['minmDate'].errors['required']){
				this.errorMessagealert("Please Select Date");
				return false;
			}
		} if(bookAppointment.controls['selectTime'].errors){
			// console.log("hello");
			if(bookAppointment.controls['selectTime'].errors['required']){
				this.errorMessagealert("Time Slot Not Available");
				return false;
			}
		} if(bookAppointment.controls['patientNumbar'].errors){
			if(bookAppointment.controls['patientNumbar'].errors['required']){
				this.errorMessagealert("Please Select Valid Patient Id");
				return false;
			}
		} if(bookAppointment.controls['membership'].errors){
			if(bookAppointment.controls['membership'].errors['required']){
				this.errorMessagealert("Please Select Appointment For");
				return false;
			}
		} if(bookAppointment.value['membership'] == 'Other'){
			if(bookAppointment.value['patientName'] == undefined || bookAppointment.value['patientName'] == null ){
				this.errorMessagealert("Please Enter Patient Name");
				return false;
			}else if(bookAppointment.controls['patientName'].errors){
				this.errorMessagealert("Please Enter Patient Name");
				return false;
			}
		} 
		
		//console.log(this.userId);
		
		let alert = this.alertCtrl.create({ message: "Are you sure you want to book this time for appointment?", 
		buttons: [{ text: 'Ok', 
				handler: () => { 		
					this.restapiService.createAppointmentByDoctor(bookAppointment.value,this.userId,this.clinicId,this.patientId,this.visit_type,this.appointmentId).then(response => {
						// console.log(response);
						if(response.responseStatus==true){
							// console.log(response.response);
							if(response.response.bookStatus==true){
								//userDetailMsg
								
								let alert = this.alertCtrl.create({ message: response.response.bookingMsg, 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											// this.navCtrl.setRoot(HomePage);
											this.navCtrl.setRoot(SuccessfulAppointmentPage,{
												bookAppointmentDetails: bookAppointment.value,
												clinicId: this.clinicId
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
			},{
				text: 'Cancel', 
				handler: () => { 
				}
			}]
		});
		alert.present();
	} 
	
	getAllTimeInterval(minDate){
		// console.log('userId',this.userId);
		// console.log('clinicId',this.clinicId);
		
		this.restapiService.getAllTimeInterval(this.userId,this.clinicId,minDate).then(response => {
			// console.log('getAllScheduleList',response);
			if(response.responseStatus==true){
				this.Morning = response.response.morningSchedule;
				this.Afternoon = response.response.afternoonSchedule;
				this.Evening = response.response.eveningSchedule;
				this.Night = response.response.nightSchedule;
				//this.is_booked = response.response.NightSchedule;
				if(response.response.doctorStatus==true){
					//this.errorMessagealert(response.response.doctorMsg);
					//return false;
					let alert = this.alertCtrl.create({ title: "Alert",
						message:response.response.doctorMsg, 
						buttons: [{ text: 'Ok'}] 
					}); 
					alert.present();
				}
				this.requestStatus=1;
			} else{
				this.Morning = [];
				this.Afternoon = [];
				this.Evening = [];
				this.Night = [];
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	getAppointmentDetailsById(){
		
		this.restapiService.GetAppointmentDetailsById(this.userId,this.appointmentId).then(response => {
			// console.log('getAllScheduleList',response);
			if(response.responseStatus==true){
				this.visit_type			= response.response.appointmentDetail.visit_type;
				this.doctorId			= response.response.appointmentDetail.doctorId;
				this.clinicId			= response.response.appointmentDetail.clinicId;
				this.patientId			= response.response.appointmentDetail.patientId;
				this.appointment_slot	= response.response.appointmentDetail.appointment_slot;
				this.time_schedule		= response.response.appointmentDetail.time_schedule;
				//this.minmDate			= response.response.appointmentDetail.appointment_date;
				this.membership			= response.response.appointmentDetail.appointment_for;
				
				var dateObj 	= new Date(this.minmDate);
				this.minDate 	= dateObj.getFullYear() + '-' +  ('0' + (dateObj.getMonth()+1)).slice(-2)  + '-' + ('0' + dateObj.getDate()).slice(-2);
				this.minmDate 	= dateObj.getFullYear() + '-' +  ('0' + (dateObj.getMonth()+1)).slice(-2)  + '-' + ('0' + dateObj.getDate()).slice(-2);
				
				this.getAllTimeInterval(this.minDate);
				
				if (this.membership == 'Self') {
					this.value = false;
				} else if (this.membership == 'Other'){
					this.patientName	= response.response.appointmentDetail.other;
					this.value = true;
				}
				
				this.requestStatus=1;
			} else{
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

	onChange(membership){
		if (this.membership == 'Self') {
			this.value = false;
		} else if (this.membership == 'Other'){
			this.value = true;
		}
	}

	
	/* ionViewDidLoad() {
		console.log('ionViewDidLoad BookAppointmentPage');
	} */
	
	toggleClass(event, i: number) {
		event.preventDefault();
		// console.log(event)
		this.activeIndex = i;

		// console.log(this.activeIndex);
	}
	
	
	goHome(){
		this.navCtrl.setRoot(HomePage);
	}
}
