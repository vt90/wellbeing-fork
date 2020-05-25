import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LabDetailPage } from '../lab-detail/lab-detail';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';

/**
 * Generated class for the LabListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-lab-list',
	templateUrl: 'lab-list.html',
})
export class LabListPage {
	labs_list = [];
	labs_count:any;
	searchedLocations:any;
	searchData:any;
	userName:any;
	userRole:any;
	userId:any;
	id:any;
	NewLoader: any=true;

	constructor(public restapiService: AllserviceProvider, public navCtrl: NavController, public navParams: NavParams, public loginservice:Loginservice) {
		/* for (let i = 0; i < 5; i++) {
			this.items.push( this.items.length );
		} */
		this.searchData 	= navParams.get('searchData');	
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
						this.userName 	= response.response.userDetail.full_name;
						this.userRole 	= response.response.userDetail.userRole;
						this.id 		= response.response.userDetail.id;
						this.userId		= userId;
						this.getLabListing();
					}
					//this.requestStatus=1;
				}
			},() =>{

			});
	    })
	}

	getLabListing(){
		this.restapiService.SearchLab(this.searchData.value,this.userId)
		.then(responsedata => {
		console.log(responsedata);
			if(responsedata.responseStatus==true){
				if(responsedata.response.searchStatus==true){
					this.NewLoader = false;
					this.labs_list 			= responsedata.response.labDetails;
					this.labs_count 		= responsedata.response.labClinicCount;
					this.searchedLocations 	= responsedata.response.searchedLocations;
					// this.doctors_list.push( this.doctors_list.length );
				}
			}
			this.NewLoader = false;
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
	
	openLabDetail(labDetails) {
		this.navCtrl.push(LabDetailPage,{
			labDetails:labDetails,
			visit_type:this.searchData.value.visit_type
		});
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad LabListPage');
	}
	doInfinite(infiniteScroll) {
		console.log('Begin async operation');

		setTimeout(() => {
			/* for (let i = 0; i < 5; i++) {
				this.items.push( this.items.length );
			} */

			console.log('Async operation has ended');
			infiniteScroll.complete();
			/* if (this.items.length > 6) {
				infiniteScroll.enable(false);
			} */
		}, 500);
	}
}
