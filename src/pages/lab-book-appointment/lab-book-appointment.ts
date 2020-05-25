import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Loginservice } from '../../services/loginservice';
import { Validators, FormBuilder } from '@angular/forms';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
import { LabSuccessfulAppointmentPage } from '../lab-successful-appointment/lab-successful-appointment';
import { HomePage } from '../home/home';
/**
 * Generated class for the LabBookAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-lab-book-appointment',
	templateUrl: 'lab-book-appointment.html',
})
export class LabBookAppointmentPage {
	minDate:any="";
	minmDate:any="";
	maxDate:any="";
	membership : any;
	Morning : any =[];
	Afternoon : any = []; 
	Evening : any = []; 
	Night : any = []; 
	value : any='';
	labId:any="";
	userId:any="";
	userRole:any="";
	userDetails:any="";
	labtestsList:any;
	labTests:any="";
	patientId:any="";
	pUniqueId:any="";
	bookAppointment:any="";
	requestStatus:any="";
	activeIndex:any="";
	shownGroup:any="";
	visit_type:any="";
	appointmentId:any="";
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
		
		this.patientId = navParams.get('patientId');
		this.pUniqueId = navParams.get('pUniqueId');
		this.labId = navParams.get('labId');
		//console.log("labiDDDDD",this.labId);
		this.visit_type = navParams.get('visit_type');
		this.appointmentId = navParams.get('appointmentId');
		
		this.bookAppointment = this.formBuilder.group({
			labTests: ['', Validators.compose([Validators.required])],
			minmDate: ['', Validators.compose([Validators.required])],
			selectTime: ['', Validators.compose([Validators.required])],
			patientNumbar: ['', Validators.compose([Validators.required])],
			membership: ['', Validators.compose([Validators.required])],
			patientName: ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])]
		});
		
		var dateObj = new Date();
		this.minDate = dateObj.getFullYear() + '-' +  ('0' + (dateObj.getMonth()+1)).slice(-2)  + '-' + ('0' + dateObj.getDate()).slice(-2);
      	this.minmDate = dateObj.getFullYear() + '-' +  ('0' + (dateObj.getMonth()+1)).slice(-2)  + '-' + ('0' + dateObj.getDate()).slice(-2);


		var dateObjNew = new Date();
		this.maxDate = dateObjNew.getFullYear() + '-' +  ('0' + (dateObjNew.getMonth()+1)).slice(-2)  + '-' + ('0' + (dateObjNew.getDate()+7)).slice(-2);

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
						console.log("userDetails: ",this.userDetails);
						this.userRole = response.response.userDetail.userRole;
						//this.userDetails = response.response.userDetail.id;
						this.userId=userId;
						
						// console.log("app-login-token from getab:"+this.userId);
						if(this.appointmentId){
							this.getAppointmentDetailsById();
						}else{
							this.appointmentId	= '';
							this.getAllTimeInterval(this.minmDate);
						}
							this.getAllActiveLabTestsByLab();						
						
						
						
					}
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
	
	getAllActiveLabTestsByLab(){
		this.restapiService.GetAllActiveLabTestsByLab(this.userId,this.labId).then(response => {
			if(response.responseStatus=true){
				this.labtestsList = response.response.labtestsList;
				console.log(this.labtestsList);
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	getAllTimeInterval(minDate){
		console.log('userId',this.userId);
		
		this.restapiService.getAllLabTimeInterval(this.userId, minDate,this.labId).then(response => {
			// console.log('getAllScheduleList',response);
			if(response.responseStatus==true){
				this.Morning = response.response.morningSchedule;
				this.Afternoon = response.response.afternoonSchedule;
				this.Evening = response.response.eveningSchedule;
				this.Night = response.response.nightSchedule;
				
				if(response.response.labStatus==true){
					//this.errorMessagealert(response.response.labMsg);
					//return false;
					let alert = this.alertCtrl.create({ title: "Alert",
						message:response.response.labMsg, 
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
	
	toggleClass(event, i: number) {
		event.preventDefault();
		// console.log(event)
		this.activeIndex = i;

		// console.log(this.activeIndex);
	}
	
	toggleGroup(group) {
		if (this.isGroupShown(group)) {
			this.shownGroup = null;
		} else {
			this.shownGroup = group;
		}
		};
		isGroupShown(group) {
		return this.shownGroup === group;
	}
	
	getAppointmentDetailsById(){
		
		this.restapiService.GetLabAppointmentDetailsById(this.userId,this.appointmentId).then(response => {
			// console.log('getAllScheduleList',response);
			if(response.responseStatus==true){
				this.visit_type			= response.response.appointmentDetail.visit_type;
				this.labId			= response.response.appointmentDetail.labId;
				this.pUniqueId			= response.response.appointmentDetail.patientUniqueId;
				this.patientId			= response.response.appointmentDetail.patientId;
				this.labTests = response.response.appointmentDetail.selectedTestList;
				//this.appointment_slot	= response.response.appointmentDetail.appointment_slot;
				//this.time_schedule		= response.response.appointmentDetail.time_schedule;
				//this.minmDate			= response.response.appointmentDetail.appointment_date;
				this.membership			= response.response.appointmentDetail.appointment_for;
				
				//var dateObj 	= new Date(this.minmDate);
				//this.minDate 	= dateObj.getFullYear() + '-' +  ('0' + (dateObj.getMonth()+1)).slice(-2)  + '-' + ('0' + dateObj.getDate()).slice(-2);
				//this.minmDate 	= dateObj.getFullYear() + '-' +  ('0' + (dateObj.getMonth()+1)).slice(-2)  + '-' + ('0' + dateObj.getDate()).slice(-2);
				
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
	
	
	createBookLabAppointment(bookAppointment){
		console.log("bookAppointment",bookAppointment);
		
		if(bookAppointment.controls['labTests'].errors){
			
			if(bookAppointment.controls['labTests'].errors['required']){
				this.errorMessagealert("Please Select Lab Test");
				return false;
			}
		} if(bookAppointment.controls['minmDate'].errors){
			
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
			}else if(bookAppointment.value['patientName'] == ""){
				this.errorMessagealert("Please Enter Patient Name");
				return false;
			}else if(bookAppointment.controls['patientName'].errors){
				this.errorMessagealert("Please Enter Valid Name");
				return false;
			}
		} 
		
		//console.log(this.userId);		
					
		let alert = this.alertCtrl.create({ message: "Are you sure you want to book this time for appointment?", 
		buttons: [{ text: 'Ok', 
				handler: () => {
					this.restapiService.createLabAppointmentByPatient(bookAppointment.value,this.userId,this.labId,this.patientId,this.visit_type,this.appointmentId)
					.then(response => {
							// console.log(response);
						   if(response.responseStatus==true){
								// console.log(response.response);
								if(response.response.bookStatus==true){
									//userDetailMsg
									
									let alert = this.alertCtrl.create({ message: response.response.bookingMsg, 
										buttons: [{ text: 'Ok', 
											handler: () => { 
												this.navCtrl.setRoot(LabSuccessfulAppointmentPage,{
													bookAppointmentDetails: bookAppointment.value,
													labId: this.labId
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
			}],
			enableBackdropDismiss: false 
		});
		alert.present();
	} 
	
	goHome(){
		this.navCtrl.setRoot(HomePage);
	}
	
	/* onChange(membership){
		if (this.membership == '1') {
		  this.value = 0;
		} else if (this.membership == '2'){
		  this.value = 1;
		}
	} */
	
	/* labSuccessAppointment() {
		this.navCtrl.push(LabSuccessfulAppointmentPage);
	} */

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad LabBookAppointmentPage');
	} */

}
