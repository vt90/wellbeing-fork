import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

// import { LabAppointmentScheduledPage } from '../lab-appointment-scheduled/lab-appointment-scheduled';

/**
 * Generated class for the LabAddAppointmentScheduledPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-lab-add-appointment-scheduled',
	templateUrl: 'lab-add-appointment-scheduled.html',
})
export class LabAddAppointmentScheduledPage {
	msg:any="";
	userId:any="";
	userDetails:any="";
	appointmentEdit:any="";
	appointmentDay:any="";
	labAppScheduled:any="";
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
	mMinTo:any="00:00";
	mMaxTo:any="12:00";
	
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
		this.appointmentEdit = navParams.get('appointmentDay');
		// console.log("appointmentDay: ",this.appointmentEdit);
		if(this.appointmentEdit != '' && this.appointmentEdit != 'undefined' && this.appointmentEdit){
			this.scheduleId = 0;
			this.actionName = 'Update';
		}else{
			this.scheduleId = 1;			
			this.actionName = 'Create';
		}
		
		this.labAppScheduled = this.formBuilder.group({
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
						this.userId=userId;
						this.getScheduleLimitTimings();
						
						if(this.appointmentEdit != '' && this.appointmentEdit != 'undefined' && this.appointmentEdit){
							this.getScheduleDetailByDay();	
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
	
	getScheduleDetailByDay(){
		console.log('userId',this.userId);
		this.restapiService.getLabScheduleDetailByDay(this.userId,this.appointmentEdit).then(response => {
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
				console.log(response);
				this.mScheduleList = response.response.morningTiming;
				this.aScheduleList = response.response.afternoonTiming;
				this.eScheduleList = response.response.eveningTiming;
				this.nScheduleList = response.response.nightTiming;
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
		
	createScheduledAppoinment(labAppScheduled){
		console.log(labAppScheduled);
		//return false;
		if(labAppScheduled.controls['appointmentDay'].errors){
			if(labAppScheduled.controls['appointmentDay'].errors['required']){
				this.errorMessagealert("Please Select Day");
				return false;
			}
		} 
		if(labAppScheduled.value['monCheck']){
			if(labAppScheduled.controls['mFrom'].errors){
				if(labAppScheduled.controls['mFrom'].errors['required']){
					this.errorMessagealert("Please Select From Time");
					return false;
				}
			} else if(labAppScheduled.controls['mTo'].errors){
				if(labAppScheduled.controls['mTo'].errors['required']){
					this.errorMessagealert("Please Select To Time");
					return false;
				}
			} else if(labAppScheduled.controls['mAvTime'].errors){
				if(labAppScheduled.controls['mAvTime'].errors['required']){
					this.errorMessagealert("Please Select Average Time");
					return false;
				}
			}
		} 
		if(labAppScheduled.value['aftCheck']){
			if(labAppScheduled.controls['aFrom'].errors){
				if(labAppScheduled.controls['aFrom'].errors['required']){
					this.errorMessagealert("Please Select From Time");
					return false;
				}
			} else if(labAppScheduled.controls['aTo'].errors){
				if(labAppScheduled.controls['aTo'].errors['required']){
					this.errorMessagealert("Please Select To Time");
					return false;
				}
			} else if(labAppScheduled.controls['aAvTime'].errors){
				if(labAppScheduled.controls['aAvTime'].errors['required']){
					this.errorMessagealert("Please Select Average Time");
					return false;
				}
			}
		} 
		if(labAppScheduled.value['eveCheck']){
			if(labAppScheduled.controls['eFrom'].errors){
				if(labAppScheduled.controls['eFrom'].errors['required']){
					this.errorMessagealert("Please Select From Time");
					return false;
				}
			}else if(labAppScheduled.controls['eTo'].errors){
				if(labAppScheduled.controls['eTo'].errors['required']){
					this.errorMessagealert("Please Select To Time");
					return false;
				}
			}else if(labAppScheduled.controls['eAvTime'].errors){
				if(labAppScheduled.controls['eAvTime'].errors['required']){
					this.errorMessagealert("Please Select Average Time");
					return false;
				}
			}
		} 
		if(labAppScheduled.value['nightCheck']){
			if(labAppScheduled.controls['nFrom'].errors){
				if(labAppScheduled.controls['nFrom'].errors['required']){
					this.errorMessagealert("Please Select From Time");
					return false;
				}
			}else if(labAppScheduled.controls['nTo'].errors){
				if(labAppScheduled.controls['nTo'].errors['required']){
					this.errorMessagealert("Please Select To Time");
					return false;
				}
			}else if(labAppScheduled.controls['nAvTime'].errors){
				if(labAppScheduled.controls['nAvTime'].errors['required']){
					this.errorMessagealert("Please Select Average Time");
					return false;
				}
			}
		}
		
		if(labAppScheduled.value['monCheck'] == false && labAppScheduled.value['aftCheck'] == false && labAppScheduled.value['eveCheck'] == false && labAppScheduled.value['nightCheck'] == false){
			
			this.msg = "<br><b>Note</b>:Please select any day slot otherwise schedule gets closed on that day";
			
		} else{
			this.msg = "";
		}
		
		//console.log(this.userId);
		let alert = this.alertCtrl.create({ 
			message: "Are you sure you want to "+this.actionName+" Schedule with these details?"+this.msg,
			buttons: [{ text: 'Ok', 
				handler: () => {
					this.restapiService.createScheduleByLab(labAppScheduled.value,this.userId,this.scheduleId)
					.then(response => {
						console.log(response);
						if(response.responseStatus==true){
							console.log(response.response);
							if(response.response.scheduleStatus==true){
								//userDetailMsg
								
								let alert = this.alertCtrl.create({ 
									message: response.response.scheduleMsg, 
									buttons: [{ text: 'Ok', 
										handler: () => { 
											//this.navCtrl.push(LabAppointmentScheduledPage);
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
											//this.navCtrl.push(LabAppointmentScheduledPage);
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
		console.log('ionViewDidLoad LabAddAppointmentScheduledPage');
	} */

}
