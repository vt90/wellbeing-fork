import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { Loginservice } from '../../services/loginservice';
import { LoginPage } from '../login/login';
/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

	userRole:any;
	userId:any;
	notificationList:any=[];

	constructor(public navCtrl: NavController, public navParams: NavParams,public restapiService: AllserviceProvider,  public loginservice:Loginservice) {
	  
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
						//this.userName = response.response.userDetail.full_name;
						//this.userRole = response.response.userDetail.userRole;
						//this.userUniqueId = response.response.userDetail.unique_id;
						//this.id = response.response.userDetail.id;
						this.userId=userId;
						this.getNotificationDetails();
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
	
	getNotificationDetails(){
		
		this.restapiService.getNotificationList(this.userId)
		.then(responsedata => {
			console.log("responsedata: ",responsedata);
			if(responsedata.responseStatus==true){
				if(responsedata.response.notificationStatus==true){
					this.notificationList 		= responsedata.response.notificationDetail;
				}
			}
		});
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad NotificationPage');
	}

}
