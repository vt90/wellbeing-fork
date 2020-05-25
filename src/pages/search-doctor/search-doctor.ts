import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';

import { DoctorListPage } from '../doctor-list/doctor-list';

/**
 * Generated class for the SearchDoctorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-search-doctor',
	templateUrl: 'search-doctor.html',
})
export class SearchDoctorPage {
	userName:any;
	userRole:any;
	userId:any;
	id:any;
	loader:any;
	special:any;
	sub_special:any;
	specialization:any;
	specialization_id:any;
	sub_specialization:any;
	sub_specialization_id:any;
	showOtherSpecial:any;
	showSubSpecial:any;
	showOtherSubSpecial:any;
	requestStatus:any;
	locationStr:any;
	locations = [];
	name: string;
	talks = [];
	searchDoctor:any;
	/* preparedTags = [
		'Virar',
		'Nalla Sopara',
		'Vasai Road',
		'Naigaon',
		'Bhayandar',
		'Mira Road',
		'Dahisar',
		'Borivali',
		'Kandivali',
		'Malad',
		'Goregaon',
		'Ram Mandir',
		'Jogeshwari',
		'Andheri',
		'Vile Parle',
		'Santacruz',
		'Khar',
		'Bandra',
		'Mahim',
		'Matunga',
		'Dadar',
		'Lower Parel',
		'Mahalakshmi',
		'Mumbai Central',
		'Grant Road',
		'Charni Road',
		'Marine Lines',
		'Churchgate'
	] */
	preparedTags = [];
	//namePattern="[a-zA-Z0-9\s]+";
	namePattern="[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*";
	constructor(public restapiService: AllserviceProvider, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams,public loginservice:Loginservice, private formBuilder: FormBuilder,private  alertCtrl: AlertController) {
		this.searchDoctor = this.formBuilder.group({
			specialization: ['', Validators.compose([Validators.required])],
			other_specialization: ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
			sub_specialization: ['', Validators.compose([Validators.required])],
			other_sub_specialization: ['', Validators.compose([Validators.required,Validators.pattern(this.namePattern)])],
			visit_type: ['', Validators.compose([Validators.required])],
			locations: ['', Validators.compose([Validators.required])]
		});
		this.checkuserloggedIn();
	}
	
	changeSubSpecializationsBySpecialization(specialization){
		// console.log("specialization",specialization);
		this.specialization_id	= specialization;
		if (specialization == 'Other') {
			this.showOtherSpecial = true;
			this.showSubSpecial = false;
			this.showOtherSubSpecial = true;
		} else{
			this.showOtherSpecial = false;
			this.showSubSpecial = true;
			this.showOtherSubSpecial = false;
			this.sub_special	= '';
			//this.showSubSpecial = false;
			this.getSubSpecializationsBySpecialization(specialization);
		}
		// console.log("this.showOtherSpecial",this.showOtherSpecial);
		// console.log("this.showSubSpecial",this.showSubSpecial);
		// console.log("this.showOtherSubSpecial",this.showOtherSubSpecial);
	}
	setSubSpecialization(sub_specialization){
		// console.log("sub_specialization",sub_specialization);
		if (sub_specialization == 'Other') {
			this.showSubSpecial = false;
			this.showOtherSubSpecial = true;
		}else{
			this.showSubSpecial = true;
			this.showOtherSubSpecial = false;
			this.sub_specialization_id	= sub_specialization;
		}
		// console.log("this.showOtherSpecial",this.showOtherSpecial);
		// console.log("this.showSubSpecial",this.showSubSpecial);
		// console.log("this.showOtherSubSpecial",this.showOtherSubSpecial);
	}
	
	getSubSpecializationsBySpecialization(specialization){
		this.restapiService.GetAllActiveSubSpecializationsBySpecialization(specialization).then(response => {
			if(response.responseStatus==true){
				this.sub_specialization = response.response.sub_specializations;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	
	changeDoctorLocationBySpecialization(visit_type){
		this.getDoctorLocationsBySpecializationsAndVisitType(this.sub_specialization_id,visit_type);
	}
	
	checkuserloggedIn(){
	  this.loginservice.getAppLoginToken().then(userId=>{
		   this.restapiService.CheckUserValid(userId)
			  .then(response => {
				  if(response.responseStatus==true){
					if(response.response.validityStatus==false){
						this.logoutUser();
					}else{
						this.userName = response.response.userDetail.full_name;
						this.userRole = response.response.userDetail.userRole;
						this.id = response.response.userDetail.id;
						this.userId=userId;
						this.showOtherSpecial = false;
						this.showSubSpecial = true;
						this.showOtherSubSpecial = false;
						this.getSpecializations();
						this.getSubSpecializationsBySpecialization('All');
					}
					//this.requestStatus=1;

				  }

			  },() =>{

			  });
	    })
	}

	logoutUser(){
		this.loginservice.clearLogin().then(userId=>{
		  // return email1;
		  //this.emailid=email1;
		  if(userId){
			  //this.isuserLoggedIn=false;
		  }
		  // this.viewCtrl.dismiss();
		  this.navCtrl.setRoot(LoginPage);
	    })
	}
	
	errorMessagealert(message){
		let alert = this.alertCtrl.create({ title: "Invalid Details",
						subTitle:message, 
						buttons: [{ text: 'Ok' /* , 
							handler: () => { 
								this.platform.exitApp(); 
							}  */
						}] 
					}); 
		alert.present();
	}
	
	getSpecializations(){
		this.restapiService.GetAllActiveSpecializations().then(response => {
			if(response.responseStatus==true){
				this.specialization = response.response.specializations;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	
	
	getDoctorLocationsBySpecializationsAndVisitType(sub_specialization_id, visit_type){
		this.restapiService.GetDocotorLocationBySpecializationAndVisitType(sub_specialization_id, visit_type).then(response => {
			if(response.responseStatus==true){
				this.preparedTags = response.response.locations;
			} else{
				this.preparedTags = [''];
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	
	/* ionViewDidLoad() {
		console.log('ionViewDidLoad SearchDoctorPage');
	} */
	
	findDoctors(searchData) {
		
		this.loader = this.loadingCtrl.create({
			spinner:"circles"
			//content: "your message"
		});
		this.loader.present().then(()=>{
			if(searchData.controls['specialization'].errors){
				if(searchData.controls['specialization'].errors['required']){
					this.loader.dismiss();
					this.errorMessagealert("Please Select Specialization");
					return false;
				}
			//}else if(this.specialization_id != 'Other' && searchData.controls['sub_specialization'].errors){
			}/* else if(searchData.controls['sub_specialization'].errors){
				if(searchData.controls['sub_specialization'].errors['required']){
					this.loader.dismiss();
					this.errorMessagealert("Please Select Sub Specialization");
					return false;
				}
			} *//* else if(this.specialization_id == 'Other' && searchData.controls['other_specialization'].errors){
				if(searchData.controls['other_specialization'].errors){
					this.loader.dismiss();
					this.errorMessagealert("Please Enter Other Specialization");
					return false;
				}else if(searchData.value['other_specialization'] == undefined || searchData.value['other_specialization'] == null){
					this.loader.dismiss();
					this.errorMessagealert("Please Enter Other Specialization");
					return false;
				}else if(searchData.value['other_specialization'] == ""){
					this.loader.dismiss();
					this.errorMessagealert("Please Enter Other Specialization");
					return false;
				}
			} else if(this.specialization_id == 'Other' && this.sub_specialization_id == 'Other' && searchData.controls['other_sub_specialization'].errors){
				if(searchData.controls['other_sub_specialization'].errors){
					this.loader.dismiss();
					this.errorMessagealert("Please Enter Other Sub Specialization");
					return false;
				}else if(searchData.value['other_sub_specialization'] == undefined || searchData.value['other_sub_specialization'] == null){
					this.loader.dismiss();
					this.errorMessagealert("Please Enter Other Sub Specialization");
					return false;
				}else if(searchData.value['other_sub_specialization'] == ""){
					this.loader.dismiss();
					this.errorMessagealert("Please Enter Other Sub Specialization");
					return false;
				}
			} */else if(searchData.controls['visit_type'].errors){
				if(searchData.controls['visit_type'].errors['required']){
					this.loader.dismiss();
					this.errorMessagealert("Please Select Visit Type");
					return false;
				}
			} else if(searchData.value.visit_type == 'Home' ){
				if(searchData.controls['locations'].errors){
					this.loader.dismiss();
					this.errorMessagealert("Please Enter Location");
					return false;
				}
			} 
			this.loader.dismiss();
			this.navCtrl.push(DoctorListPage,{
				searchData: searchData
			});
			
			/* this.restapiService.searchDoctor(searchData.value,this.userId)
			.then(responsedata => {
				if(responsedata.responseStatus==true){
					if(responsedata.response.searchStatus==true){
						this.loader.dismiss().then(() => {
							this.navCtrl.push(DoctorListPage);
						});
					}else{							
						this.loader.dismiss();
						let alert = this.alertCtrl.create({ title: responsedata.response.searchMsgTitle,
								subTitle:responsedata.response.searchMsg,
								buttons: [{ text: 'Ok', 
								}] 
							}); 
						alert.present();
					}
				}else{
					this.loader.dismiss();
					//this.alertbox("Invalid",responsedata.responseMsg,false);
					let alert = this.alertCtrl.create({ title: "Invalid Details!",
								subTitle:responsedata.responseMsg, 
								buttons: [{ text: 'Ok', 
								}] 
							}); 
					alert.present();
				}
			}); */
		});
	}
  /* addTalk() {
    //this.talks.push({name: this.name, topics: this.topics});
  } */
}
