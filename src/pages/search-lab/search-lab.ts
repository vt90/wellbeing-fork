import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder } from '@angular/forms';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';

import { LabListPage } from '../lab-list/lab-list';

/**
 * Generated class for the SearchLabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-search-lab',
	templateUrl: 'search-lab.html',
})
export class SearchLabPage {
	userName:any;
	userRole:any;
	userId:any;
	id:any;
	labtest:any;
	labtestId:any;
	showOtherLabTests:any=false;
	requestStatus:any;
	locations = [];
	name: string;
	searchLab:any;
	loader:any;
	talks = [];
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
	preparedTags:any=[];

	constructor(public restapiService: AllserviceProvider,public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice, private formBuilder: FormBuilder,private  alertCtrl: AlertController) {
		this.searchLab = this.formBuilder.group({
			lab_test: ['', Validators.compose([Validators.required])],
			other_labtest: ['', Validators.compose([Validators.required])],
			visit_type: ['', Validators.compose([Validators.required])],
			locations: ['', Validators.compose([Validators.required])]
		});
		this.checkuserloggedIn();
	}
	
	setLabTest(labtest){
		this.labtestId	= labtest;
		if (labtest == 'Other') {
			this.showOtherLabTests = false;
		} else{
			this.showOtherLabTests = false;
		}
	}
	
	changeLabLocationByLabTestAndVisitType(visit_type){
		this.getLabLocationsByLabTestAndVisitType(this.labtestId,visit_type);
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
						this.getLabTests();
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
	
	getLabTests(){
		this.restapiService.GetAllActiveLabTests().then(response => {
			if(response.responseStatus=true){
				this.labtest = response.response.labtests;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	getLabLocationsByLabTestAndVisitType(labtest, visit_type){
		this.restapiService.GetLabLocationsByLabTestAndVisitType(labtest, visit_type).then(response => {
			if(response.responseStatus=true){
				this.preparedTags = response.response.locations;
			} else{
				this.preparedTags = [''];
				this.requestStatus=2;
			}
			console.log("preparedTags: ",this.preparedTags);
		},() =>{
			this.requestStatus=3; 
		}); 
	}

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad SearchLabPage');
	} */
	
	findLabs(searchData) {
		
		this.loader = this.loadingCtrl.create({
			spinner:"circles"
			//content: "your message"
		});
		this.loader.present().then(()=>{
			if(searchData.controls['lab_test'].errors){
				if(searchData.controls['lab_test'].errors['required']){
					this.loader.dismiss();
					this.errorMessagealert("Please Select Lab Test");
					return false;
				}
			}/* else if(this.labtestId == 'Other' && searchData.controls['other_labtest'].errors){
				if(searchData.controls['other_labtest'].errors['required']){
					this.loader.dismiss();
					this.errorMessagealert("Please Enter Other Lab Test");
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
			this.navCtrl.push(LabListPage,{
				searchData:searchData
			});
			
			/* this.restapiService.searchLab(searchData.value,this.userId)
			.then(responsedata => {
				if(responsedata.responseStatus==true){
					if(responsedata.response.searchStatus==true){
						this.loader.dismiss().then(() => {
							this.navCtrl.push(LabListPage);
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

}
