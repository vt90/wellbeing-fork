import { Component,ElementRef,Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Loginservice } from '../../services/loginservice';
import { AllserviceProvider } from '../../providers/allservice/allservice'; //api service
import { LoginPage } from '../login/login';
import { DoctorListPage } from '../doctor-list/doctor-list';

/**
 * Generated class for the SearchbarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchbar',
  templateUrl: 'searchbar.html',
})
export class SearchbarPage {
	items: Array<string>;
	userDetails:any;
	userId:any;
	doctorList: Array<string>;
	requestStatus:any;
	ev:any="";
	constructor(public navCtrl: NavController, public navParams: NavParams, private elementRef:ElementRef,private renderer:Renderer, public loginservice:Loginservice, public restapiService: AllserviceProvider) {
		
		this.checkuserloggedIn();
		//this.ev:any="";
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
						this.getDoctorList("");
					}
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
		  //this.navCtrl.push(HomePage);  
		  //console.log("app-login-token from get:"+userId);
	    })
	}
	
	
	ngOnInit() {
		//this.getDoctorList();
	}
	
	getDoctorList(ev) {
		this.doctorList = [];
		//console.log('designation',designation);
		this.restapiService.getDoctorList(this.userId,ev).then(response => {
			console.log('doctorList',response);
			if(response.responseStatus=true){
				//if(response.response.userListStatus==true){
					this.doctorList = response.response.doctorList;
					//this.cpName = this.lead.cpId;
					this.requestStatus=1;
				//} else{
					//this.requestStatus=2; 
				//}
			} else{
				this.doctorList = [];
				this.requestStatus=2;
			}
		},() =>{
			this.doctorList = [];
			this.requestStatus=3; 
		}); 
		//this.doctorList = ["Orange", "Banana"];
	}
	filterItems(ev: any) {
		//console.log(ev);
		
		
		let val = ev.target.value;
		this.getDoctorList(val);

		if (val && val.trim() !== '') {
		  this.doctorList = this.doctorList.filter(function(item) {
			return item.toLowerCase().includes(val.toLowerCase());
		  });
		}
	}
	
	getDoctorDetails(item){
		this.navCtrl.push(DoctorListPage,{
			doctorName: item
		});
	}
  
	ngAfterViewInit() {
        const element = this.elementRef.nativeElement.querySelector('input');
        // we need to delay our call in order to work with ionic ...
        setTimeout(() => {
            this.renderer.invokeElementMethod(element, 'focus', []);
			//nativeKeyboard.showMessengerKeyboard();
			//alert();
			//console.log(Keyboard.show());
        }, 1000);
    }
	ionViewDidLoad() {
		console.log('ionViewDidLoad SearchbarPage');
	}
}
