import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';

// import { DoctorAppointmentScheduledPage } from '../doctor-appointment-scheduled/doctor-appointment-scheduled';
import { HomePage } from '../home/home';

/**
 * Generated class for the DoctorAddAppointmentScheduledPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-doctor-add-appointment-scheduled',
	templateUrl: 'doctor-add-appointment-scheduled.html',
})
export class DoctorAddAppointmentScheduledPage {
	msg:any="";
	userId:any="";
	userDetails:any="";
	clinicId:any="";
	appointmentEdit:any="";
	appointmentDay:any="";
	drAppScheduled:any="";
	scheduleInfo:any="";
	scheduleId:any="";
	requestStatus:any="";
	
	actionName:any;
	
	monCheck:any=false;
	aftCheck:any=false;
	eveCheck:any=false;
	nightCheck:any=false;
	
	mScheduleList:any;
	aScheduleList:any;
	eScheduleList:any;
	nScheduleList:any;
	
	mFrom:any="";
	mTo:any="";
	mAvTime:any="";
	
	aFrom:any="";
	aTo:any="";
	aAvTime:any="";
	
	eFrom:any="";
	eTo:any="";
	eAvTime:any="";
	
	nFrom:any="";
	nTo:any="";
	nAvTime:any="";
	
	fromHr:any;
	fromMin:any;
	toHr:any;
	toMin:any;
	
	chkTimeValidity:any=0;
	
	/* mMinFrom:any="00:00";
	mMaxFrom:any="12:00";
	mMinTo:any="04:00:00";
	mMaxTo:any="12:00:00";
	
	aMinFrom:any="12:00";
	aMaxFrom:any="17:00";
	aMinTo:any="12:00";
	aMaxTo:any="17:00";
	
	eMinFrom:any="17:00";
	eMaxFrom:any="20:00";
	eMinTo:any="17:00";
	eMaxTo:any="20:00";
	
	nMinFrom:any="20:00";
	nMaxFrom:any="00:00";
	nMinTo:any="20:00";
	nMaxTo:any="00:00"; */
	

	constructor(public navCtrl: NavController, public navParams: NavParams,public loginservice:Loginservice,public restapiService: AllserviceProvider,private formBuilder: FormBuilder,private  alertCtrl: AlertController) {
	  
	  
		//this.clinicId = navParams.get('clinicId');
		//this.clinicId = 1;
		this.appointmentEdit = navParams.get('appointmentDay');
		// console.log("appointmentDay: ",this.appointmentEdit);
		if(this.appointmentEdit != '' && this.appointmentEdit != 'undefined' && this.appointmentEdit){
			this.scheduleId = 0;
			this.actionName = 'Update';
		}else{
			this.scheduleId = 1;			
			this.actionName = 'Create';
		}
		// console.log("scheduleId",this.scheduleId);
		
		// console.log("this.clinicId",this.clinicId);
		// console.log("this.appointmentDay",this.appointmentDay);
		/* this.mMinFrom="04:00";
		this.mMaxFrom="10:00";
		
		this.mMinTo="04:00";
		this.mMaxFrom="10:00"; */
	
		/* this.aMaxFrom="10:00";
		this.aMinTo="16:00";
		
		this.eMaxFrom="16:00";
		this.eMinTo="22:00";
		
		this.nMaxFrom="22:00";
		this.nMinTo="04:00"; */
	
		
		this.drAppScheduled = this.formBuilder.group({
			appointmentDay: ['', Validators.compose([Validators.required])],
			monCheck: [false, Validators.compose([Validators.required])],
			aftCheck: [false, Validators.compose([Validators.required])],
			eveCheck: [false, Validators.compose([Validators.required])],
			nightCheck: [false, Validators.compose([Validators.required])],
			mFrom: ['', Validators.compose([Validators.required])],
			mTo: ['', Validators.compose([Validators.required])],
			mAvTime: ['', Validators.compose([Validators.required])],
			aFrom: ['', Validators.compose([Validators.required])],
			aTo: ['', Validators.compose([Validators.required])],
			aAvTime: ['', Validators.compose([Validators.required])],
			eFrom: ['', Validators.compose([Validators.required])],
			eTo: ['', Validators.compose([Validators.required])],
			eAvTime: ['', Validators.compose([Validators.required])],
			nFrom: ['', Validators.compose([Validators.required])],
			nTo: ['', Validators.compose([Validators.required])],
			nAvTime: ['', Validators.compose([Validators.required])]
		});
		
		this.checkuserloggedIn();
	}
	
	/* checkTimeFormat(fromTime,dayType){
		console.log("from time"+ fromTime + "day="+dayType);
		if(dayType  == 'mondayFrom'){
			this.mMinTo = fromTime;
			//this.mMaxTo = "04:00";
		}
		if(dayType  == 'mondayTo'){
			//this.mMinFrom = "10:00";
			this.mMaxFrom = fromTime;
		}
		
		
	} */
	
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
	
	checkClinicId(){
		this.loginservice.getAppClinicId().then(clinicId=>{
		  console.log("app-clinicId:"+clinicId);

		   this.restapiService.CheckClinicValid(this.userId,clinicId)
			  .then(response => {
				  if(response.responseStatus==true){
					console.log(response.response);
						this.getScheduleLimitTimings();
						//this.clinicName = response.response.clinicDetails.clinicName;
						this.clinicId = response.response.clinicDetails.clinicId;
						// console.log(this.appointmentEdit);
						if(this.appointmentEdit != '' && this.appointmentEdit != 'undefined' && this.appointmentEdit){
							this.getScheduleDetailByDay();	
						}
					
					//this.requestStatus=1;
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
	
	getScheduleDetailByDay(){
		// console.log('userId',this.userId);
		this.restapiService.getDoctorScheduleDetailByDay(this.userId,this.clinicId,this.appointmentEdit).then(response => {
			console.log('getAllScheduleList',response);
			if(response.responseStatus=true){
				this.scheduleInfo = response.response.scheduleList;
				
				this.appointmentDay = this.scheduleInfo[0].dayName;
				
				this.monCheck = this.scheduleInfo[0].morningClosed;
				this.mFrom = this.scheduleInfo[0].morningDetail.appointmentStartTime;
				this.mTo = this.scheduleInfo[0].morningDetail.appointmentEndTime;
				this.mAvTime = this.scheduleInfo[0].morningDetail.appointmentAvgTime;
				
				this.aftCheck = this.scheduleInfo[0].afternoonClosed;
				this.aFrom = this.scheduleInfo[0].afternoonDetail.appointmentStartTime;
				this.aTo = this.scheduleInfo[0].afternoonDetail.appointmentEndTime;
				this.aAvTime = this.scheduleInfo[0].afternoonDetail.appointmentAvgTime;
				
				this.eveCheck = this.scheduleInfo[0].eveningClosed;
				this.eFrom = this.scheduleInfo[0].eveningDetail.appointmentStartTime;
				this.eTo = this.scheduleInfo[0].eveningDetail.appointmentEndTime;
				this.eAvTime = this.scheduleInfo[0].eveningDetail.appointmentAvgTime;
				
				this.nightCheck = this.scheduleInfo[0].nightClosed;
				this.nFrom = this.scheduleInfo[0].nightDetail.appointmentStartTime;
				this.nTo = this.scheduleInfo[0].nightDetail.appointmentEndTime;
				this.nAvTime = this.scheduleInfo[0].nightDetail.appointmentAvgTime;
				
				// console.log("nighttttttttttttttttttt",this.nightCheck);
				// this.assistantName = response.response.assistantList.assistantName;
				// this.assistantEmail = response.response.assistantList.assistantEmail;
				// this.assistantMobile = response.response.assistantList.assistantMobile;
				
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	getScheduleLimitTimings(){
		this.restapiService.GetScheduleLimitTimings(this.userId).then(response => {
			if(response.responseStatus=true){
				this.mScheduleList = response.response.morningTiming;
				this.aScheduleList = response.response.afternoonTiming;
				this.eScheduleList = response.response.eveningTiming;
				this.nScheduleList = response.response.nightTiming;
				console.log(this.mScheduleList);
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
	
	
	createScheduledAppoinment(drAppScheduled){
		console.log("appointmentDay-->",drAppScheduled.value.appointmentDay);
		//return false;
		if(drAppScheduled.controls['appointmentDay'].errors){
			if(drAppScheduled.controls['appointmentDay'].errors['required']){
				this.errorMessagealert("Please Select Day");
				return false;
			}
		} 
		if(drAppScheduled.value['monCheck']){
			if(drAppScheduled.controls['mFrom'].errors){
				if(drAppScheduled.controls['mFrom'].errors['required']){
					this.errorMessagealert("Please Select From Time");
					return false;
				}
			} else if(drAppScheduled.controls['mTo'].errors){
				if(drAppScheduled.controls['mTo'].errors['required']){
					this.errorMessagealert("Please Select To Time");
					return false;
				}
			} else if(drAppScheduled.controls['mAvTime'].errors){
				if(drAppScheduled.controls['mAvTime'].errors['required']){
					this.errorMessagealert("Please Select Average Time");
					return false;
				}
			}
		} 
		if(drAppScheduled.value['aftCheck']){
			if(drAppScheduled.controls['aFrom'].errors){
				if(drAppScheduled.controls['aFrom'].errors['required']){
					this.errorMessagealert("Please Select From Time");
					return false;
				}
			} else if(drAppScheduled.controls['aTo'].errors){
				if(drAppScheduled.controls['aTo'].errors['required']){
					this.errorMessagealert("Please Select To Time");
					return false;
				}
			} else if(drAppScheduled.controls['aAvTime'].errors){
				if(drAppScheduled.controls['aAvTime'].errors['required']){
					this.errorMessagealert("Please Select Average Time");
					return false;
				}
			}
		} 
		if(drAppScheduled.value['eveCheck']){
			if(drAppScheduled.controls['eFrom'].errors){
				if(drAppScheduled.controls['eFrom'].errors['required']){
					this.errorMessagealert("Please Select From Time");
					return false;
				}
			}else if(drAppScheduled.controls['eTo'].errors){
				if(drAppScheduled.controls['eTo'].errors['required']){
					this.errorMessagealert("Please Select To Time");
					return false;
				}
			}else if(drAppScheduled.controls['eAvTime'].errors){
				if(drAppScheduled.controls['eAvTime'].errors['required']){
					this.errorMessagealert("Please Select Average Time");
					return false;
				}
			}
		} 
		if(drAppScheduled.value['nightCheck']){
			if(drAppScheduled.controls['nFrom'].errors){
				if(drAppScheduled.controls['nFrom'].errors['required']){
					this.errorMessagealert("Please Select From Time");
					return false;
				}
			}else if(drAppScheduled.controls['nTo'].errors){
				if(drAppScheduled.controls['nTo'].errors['required']){
					this.errorMessagealert("Please Select To Time");
					return false;
				}
			}else if(drAppScheduled.controls['nAvTime'].errors){
				if(drAppScheduled.controls['nAvTime'].errors['required']){
					this.errorMessagealert("Please Select Average Time");
					return false;
				}
			}
		} 
		
		if(drAppScheduled.value['monCheck'] == false && drAppScheduled.value['aftCheck'] == false && drAppScheduled.value['eveCheck'] == false && drAppScheduled.value['nightCheck'] == false){
			
			this.msg = "<br><b>Note</b>:Please select any day slot otherwise schedule gets closed on that day";
			
		} else{
			this.msg = "";
		}
		
		
		//console.log(this.userId);
		let alert = this.alertCtrl.create({ 
			message: "Are you sure you want to "+this.actionName+" Schedule with these details?"+this.msg, 
			buttons: [{ text: 'Ok', 
				handler: () => { 
					this.restapiService.createClinicScheduleByDoctor(drAppScheduled.value,this.userId,this.clinicId,this.scheduleId)
					.then(response => {
						console.log(response);
						//this.drAppScheduled.reset()
						if(response.responseStatus==true){
							console.log(response.response);
							if(response.response.scheduleStatus==true){
								//userDetailMsg
								
								let alert = this.alertCtrl.create({ 
									message: response.response.scheduleMsg, 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											// this.navCtrl.push(DoctorAppointmentScheduledPage);
											this.navCtrl.setRoot(HomePage);
										} 
									}],
									enableBackdropDismiss: false 
								}); 
								alert.present();
							}else{
								let alert = this.alertCtrl.create({ 
									message: response.response.scheduleMsg, 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											// this.navCtrl.push(DoctorAppointmentScheduledPage);
											this.navCtrl.setRoot(HomePage);
										} 
									}],
									enableBackdropDismiss: false 
								}); 
								alert.present();
							}
						}
							
					}); 
				}				
			},
			{ text: 'Cancel', 
				handler: () => {
				}
			}],
			enableBackdropDismiss: false 
		}); 
		alert.present();
	}
	
	checkValidTime(fromTime, toTime,schedule){
		if(fromTime != '' && toTime != ''){
			this.fromHr		= fromTime.split(":")[0];
			this.fromMin	= fromTime.split(":")[1];
			this.toHr		= toTime.split(":")[0];
			this.toMin		= toTime.split(":")[1];
			this.chkTimeValidity	= 0;
			if(this.fromHr > this.toHr){
				this.chkTimeValidity	= 1;
			}else if(this.fromHr == this.toHr){
				if(this.fromMin >= this.toMin){
					this.chkTimeValidity	= 1;
				}
			}
			
			if(this.chkTimeValidity == 1){
				let alert = this.alertCtrl.create({ 
					//title: "Invalid Timing Selection", 
					message: "Enter appropriate time slot", 
					buttons: [{ text: 'Ok', 
						handler: () => {
							this.setAppointmentTime(schedule);
						} 
					}],
					enableBackdropDismiss: false					
				}); 
				alert.present();
			}
		}
	}
	
	setAppointmentTime(schedule){
		//console.log("schedule",schedule);
		if(schedule == 'morning'){
			this.mFrom = "";
			this.mTo = "";
		}else if(schedule == 'after'){
			this.aFrom = "";
			this.aTo = "";
		}else if(schedule == 'evening'){
			this.eFrom = "";
			this.eTo = "";
		}else if(schedule == 'night'){
			this.nFrom = "";
			this.nTo = "";
		}
	}
	
	setAppointmentDay(dayName){
		this.appointmentDay	= dayName;
		console.log(this.appointmentDay);
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad DoctorAddAppointmentScheduledPage');
	} */

}
