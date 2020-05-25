import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Storage } from '@ionic/storage'

/*
  Generated class for the AllServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Loginservice {
	

  constructor(public http: Http,private storage:Storage) {
    console.log('Hello LoginService for storage');
  }
  
  setEmail(email){
	  this.storage.ready().then(() => {
		this.storage.set('email1',email).then(resp=>{
			console.log("email set:"+resp);
			
		});
	  });
	  
  }
  // Clinic Id//
	setAppClinicId(clinicId){
	  this.storage.ready().then(() => {
		this.storage.set('clinicId',clinicId).then(resp=>{
			console.log("clinic set:"+resp);
			
		});
	  });
	  
	}
	getAppClinicId(){
	  return this.storage.ready().then(() => {
		return this.storage.get('clinicId');
	  });
	  
	}
  // login Token// 
  setAppLoginToken(app_login_token){
	  this.storage.ready().then(() => {
		this.storage.set('appLoginToken',app_login_token).then(resp=>{
			console.log("Login set:"+resp);
			
		});
	  });
	  
  }
  setAppLoginTokenReturnPromise(app_login_token){
	  return this.storage.ready().then(() => {
		return this.storage.set('appLoginToken',app_login_token);
	  });
  }
  
  getAppLoginToken(){
	  return this.storage.ready().then(() => {
		return this.storage.get('appLoginToken');
	  });
	  
  }
  
  removeAppLoginToken(){
	  return this.storage.ready().then(() => {
		return this.storage.remove('appLoginToken').then(resp=>{
			return this.storage.get('appLoginToken');
		});
	  });
  }
  
  setGcmToken(registrationId){
	  //alert(registrationId);
	  this.storage.ready().then(() => {
		this.storage.set('registrationId',registrationId).then(resp=>{
			console.log("Login set:"+resp);
			
		});
	  });
	  
  }
  
   getGcmToken(){
	  return this.storage.ready().then(() => {
		return this.storage.get('registrationId');
	  });
	  
  }
  
  clearLogin(){
	  return this.storage.ready().then(() => {
		return this.storage.clear().then(resp=>{
			return this.storage.get('appLoginToken');
		});
	  });
  }
  
  getEmail(){
	  return this.storage.ready().then(() => {
		return this.storage.get('email1');
	  });
	  
  }
  
	
}
