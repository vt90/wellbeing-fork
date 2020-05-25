import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { CreateAssistantPage } from '../create-assistant/create-assistant';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
/**
 * Generated class for the AssistantListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assistant-list',
  templateUrl: 'assistant-list.html',
})
export class AssistantListPage {
	userDetails:any;
	userId:any;
	assistantList:any;
	requestStatus:any;
	doctorId:any;
	constructor(public navCtrl: NavController, public navParams: NavParams,public loginservice:Loginservice,public restapiService: AllserviceProvider,private  alertCtrl: AlertController) {
		//console.log("hej");
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
						// console.log("app-login-token from getab:"+this.userId);
						 this.getAllAssistantList();	
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
	
	getAllAssistantList(){
		console.log('userId',this.userId);
		this.restapiService.getAllAssistantList(this.userId).then(response => {
			console.log('AllAssistantList',response);
			if(response.responseStatus=true){
				this.assistantList = response.response.assistantList;
				
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	confirmDeleteAssistant(assistantId){
		console.log("assistantId",assistantId);
		let alert = this.alertCtrl.create({ message: "Are you sure you want to delete?",
						buttons: [{ text: 'Ok', handler: () => { 
									this.deleteAssistant(assistantId);
								} },{ text: 'Cancel'
								}],
								enableBackdropDismiss: false 
					}); 
		alert.present();
	}
	
	deleteAssistant(assistantId){
		console.log("assistantIdnow",assistantId);
		this.restapiService.deleteAssistantById(this.userId,assistantId).then(response => {
			console.log('getAllClinicList',response);
			if(response.responseStatus=true){
				this.getAllAssistantList();
				
				this.requestStatus=1;
			} else{
				this.requestStatus=2;
			}
		},() =>{
			this.requestStatus=3; 
		}); 
	}
	
	createAssistant(){
		this.navCtrl.push(CreateAssistantPage);
	}
	
	editAssistant(assistantId){
		this.navCtrl.push(CreateAssistantPage,{
			assistantId:assistantId
		});
	}
	
	goHome(){
		this.navCtrl.setRoot(HomePage);
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad AssistantListPage');
	}
	

}
