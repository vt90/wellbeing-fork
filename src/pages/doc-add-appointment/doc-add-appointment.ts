import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookAppointmentPage } from '../book-appointment/book-appointment';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
/**
 * Generated class for the DocAddAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-doc-add-appointment',
	templateUrl: 'doc-add-appointment.html',
})
export class DocAddAppointmentPage {
	userId:any="";
	userDetails:any="";
	requestStatus:any="";
	patientListInfo:any="";
	clinicId:any=0;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, public restapiService: AllserviceProvider) {
		
		//this.clinicId = 1;
		
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
		  console.log("app-login-token from get:"+clinicId);

		   this.restapiService.CheckClinicValid(this.userId,clinicId)
			  .then(response => {
				  if(response.responseStatus==true){
					console.log(response.response);
					
						//this.clinicName = response.response.clinicDetails.clinicName;
						this.clinicId = response.response.clinicDetails.clinicId;
						this.getAllPatientList();
					
					//this.requestStatus=1;
				  }

			  },() =>{

			  });
	    })
	}
	
	getAllPatientList(){
		console.log('userId',this.userId);
		this.restapiService.getAllPatientListByDoctor(this.userId,this.clinicId).then(response => {
			console.log('getAllPatientListByDoctor',response);
			if(response.responseStatus=true){
				this.patientListInfo = response.response.patientList;				
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	/* ionViewDidLoad() {
		console.log('ionViewDidLoad DocAddAppointmentPage');
	} */
	bookAppointment(patientId,pUniqueId){
		console.log("patientId",patientId);
		console.log("pUniqueId",pUniqueId);
		this.navCtrl.push(BookAppointmentPage,{
			patientId:patientId,
			pUniqueId:pUniqueId,
			visit_type:'Clinic'
		});
	}

}
