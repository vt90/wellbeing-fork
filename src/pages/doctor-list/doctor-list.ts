import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';

import { DoctorDetailPage } from '../doctor-detail/doctor-detail';

/**
 * Generated class for the DoctorListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-doctor-list',
	templateUrl: 'doctor-list.html',
})
export class DoctorListPage {
	doctors_list = [];
	doctors_count:any;
	searchedLocations:any;
	searchData:any;
	userName:any;
	userRole:any;
	userId:any;
	id:any;
	doctorName:any;
	visitType:any;
	NewLoader: any=true;

	constructor(public restapiService: AllserviceProvider, public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice) {
		/* for (let i = 0; i < 5; i++) {
			this.items.push( this.items.length );
		} */
		this.searchData 	= navParams.get('searchData');	
		this.doctorName = navParams.get('doctorName');		
		this.checkuserloggedIn();
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
						if(this.doctorName){
							this.getDoctorListingByKeyword(this.doctorName);
							this.visitType = "Clinic";
						}else{
							this.getDoctorListing();
							this.visitType = this.searchData.value.visit_type;
						}
					}
					//this.requestStatus=1;

				  }

			  },() =>{

			  });
	    })
	}
	
	getDoctorListingByKeyword(doctorName){
		this.restapiService.SearchDoctorByKeyword(doctorName,this.userId)
		.then(responsedata => {
			if(responsedata.responseStatus==true){
				if(responsedata.response.searchStatus==true){
					this.doctors_list 		= responsedata.response.doctorDetails;
					this.doctors_count 		= responsedata.response.doctorClinicCount;
					this.searchedLocations 	= responsedata.response.searchedLocations;
					// this.doctors_list.push( this.doctors_list.length );
				}
			}
		});
	}

	getDoctorListing(){
		this.restapiService.SearchDoctor(this.searchData.value,this.userId)
		.then(responsedata => {
			if(responsedata.responseStatus==true){
				if(responsedata.response.searchStatus==true){
					this.NewLoader = false;
					this.doctors_list 		= responsedata.response.doctorDetails;
					this.doctors_count 		= responsedata.response.doctorClinicCount;
					this.searchedLocations 	= responsedata.response.searchedLocations;
					// this.doctors_list.push( this.doctors_list.length );
				}else{
					this.NewLoader = false;
				}
			}else{
				this.NewLoader = false;
			}
			
		});
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

	/* ionViewDidLoad() {
		console.log('ionViewDidLoad DoctorListPage');
	} */
	openDocDetail(doctorDetails) {
		console.log("doctorDetails: ",doctorDetails);
		this.navCtrl.push(DoctorDetailPage,{
			doctorDetails:doctorDetails,
			visit_type:this.visitType
		});
	}

	doInfinite(infiniteScroll) {
		console.log('Begin async operation');

		setTimeout(() => {
			// for (let i = 0; i < 5; i++) {
				// this.doctors_list.push( this.doctors_list.length );
			// }
			// this.doctors_list.push( this.doctors_list.length );
			console.log('Async operation has ended');
			infiniteScroll.complete();
			if (this.doctors_list.length > 6) {
				infiniteScroll.enable(false);
			}
		}, 500);
	}
}
