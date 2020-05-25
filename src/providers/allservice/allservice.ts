import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/toPromise'

/*
  Generated class for the AllserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AllserviceProvider {

	public appKey:any = 'mEd!c@1';
	//public apiUrl = 'http://192.168.1.113/staging/php/medical/appApi';	//Local Link
	//public apiUrl = 'http://shareittofriends.com/demo/medical/appApi';	//staging Link
	public apiUrl = 'http://13.232.13.250/appApi';	//Live Link
	//public apiUrl = 'http://13.126.121.177/appApi';	//Testing Link
	
	constructor(public http: Http) {
		console.log('Hello AllserviceProvider Provider');
	}

	userLogin(userData) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		let paprams="userName="+userData.email+"&password="+userData.password;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/UserLogin.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
		
		
    }
	
	CheckUserValid(userId) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		let paprams="userToken="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/checkUserValidity.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
		
		
    }

	getUserById(userId) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		let paprams="userId="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getUserById.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }

	GetAllActiveSpecializations() {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		
		let paprams="";
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getAllActiveSpecializations.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }

	GetAllActiveSubSpecializationsBySpecialization(specialization) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		let paprams="specialization_id="+specialization;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getAllActiveSubSpecializationsBySpecialization.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }

	GetDocotorLocationBySpecializationAndVisitType(sub_specialization, visit_type) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		let paprams="sub_specialization_id="+sub_specialization+"&visit_type="+visit_type;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getDoctorLocationsBySpecializationAndVisitType.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }

	GetAllActiveLabTests() {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		let paprams="";
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getAllActiveLabTests.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }

	GetLabLocationsByLabTestAndVisitType(labtest, visit_type) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		let paprams="lab_test_id="+labtest+"&visit_type="+visit_type;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getLabLocationsByLabTestAndVisitType.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }
	
	getAllAssistantList(userId) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		let paprams="userToken="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getAllAssistant.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }
	
	getAllClinicList(userId) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		let paprams="userToken="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getAllClinicByDoctor.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }
	
	createAssistantByDoctor(formdata,userId,assistantId) {
		
		let paprams="userToken="+userId+"&assistantId="+assistantId+"&assistantName="+formdata.assistantName+"&assistantEmail="+formdata.assistantEmail+"&assistantMobile="+formdata.assistantMobile+"&assistantPassword="+formdata.assistantPassword+"&clinicName="+formdata.clinicName;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/createAssistantByDoctor.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	getAssistantDetails(userId,assistantId) {
		
		let paprams="userToken="+userId+"&assistantId="+assistantId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getAssistantDetails.php';
        return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	deleteAssistantById(userId,assistantId) {
		
		let paprams="userToken="+userId+"&assistantId="+assistantId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/deleteAssistantById.php';
        return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	SearchDoctor(searchData,userId) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		let paprams="userLoginToken="+userId+"&specialization="+searchData.specialization+"&other_specialization="+searchData.other_specialization+"&sub_specialization="+searchData.sub_specialization+"&other_sub_specialization="+searchData.other_sub_specialization+"&visit_type="+searchData.visit_type+"&locations="+searchData.locations;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/SearchDoctors.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();		
    }

	SearchLab(searchData,userId) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		let paprams="userLoginToken="+userId+"&labtest="+searchData.lab_test+"&other_labtest="+searchData.other_labtest+"&visit_type="+searchData.visit_type+"&locations="+searchData.locations;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/SearchLabs.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();		
    }

	ViewDoctorDetails(doctorData,userId) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		let paprams="userLoginToken="+userId+"&doctor_id="+doctorData.doctor_id+"&clinic_id="+doctorData.clinic_id+"&visit_type="+doctorData.visit_type;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/ViewDoctorDetails.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();		
    }

	ViewLabDetails(labData,userId,visit_type) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		let paprams="userLoginToken="+userId+"&lab_id="+labData.lab_id+"&visit_type="+visit_type;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/ViewLabDetails.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();		
    }
	
	createClinicScheduleByDoctor(formdata,userId,clinicId,scheduleId) {
		console.log("scheduleId",scheduleId);
		let paprams="userToken="+userId+"&clinicId="+clinicId+"&scheduleId="+scheduleId+"&appointmentDay="+formdata.appointmentDay+"&formdata="+JSON.stringify(formdata);
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/createClinicScheduleByDoctor.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	createScheduleByLab(formdata,userId,scheduleId) {
		console.log("scheduleId",scheduleId);
		let paprams="userToken="+userId+"&scheduleId="+scheduleId+"&appointmentDay="+formdata.appointmentDay+"&formdata="+JSON.stringify(formdata);
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/createScheduleByLab.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	getAllDoctorScheduleList(userId,clinicId) {
		
		let paprams="userToken="+userId+"&clinicId="+clinicId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getDoctorScheduledAppointments.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	getAllLabScheduleList(userId) {
		
		let paprams="userToken="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getLabScheduledAppointments.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	createLeaveByDoctor(formdata,userId,clinicId,doctorOnLeaveId) {
		let paprams="userToken="+userId+"&clinicId="+clinicId+"&doctorOnLeaveId="+doctorOnLeaveId+"&fromDate="+formdata.fromDate+"&toDate="+formdata.toDate+"&drName="+formdata.drName+"&drMobile="+formdata.drMobile;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/doctorLeave.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	clearLeaveByDoctor(formdata,userId,clinicId,doctorOnLeaveId) {
		let paprams="userToken="+userId+"&clinicId="+clinicId+"&doctorOnLeaveId="+doctorOnLeaveId+"&fromDate=&toDate=&drName="+formdata.drName+"&drMobile="+formdata.drMobile;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/doctorLeave.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetDoctorOnLeaveDetails(userId,clinicId) {
		let paprams="userToken="+userId+"&clinicId="+clinicId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getDoctorOnLeaveDetails.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	createClosedLab(formdata,userId,labClosedId) {
		let paprams="userToken="+userId+"&labClosedId="+labClosedId+"&fromDate="+formdata.fromDate+"&toDate="+formdata.toDate+"&leaveDetails="+encodeURIComponent(formdata.leaveDetails);
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/labClosed.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	clearClosedLab(formdata,userId,labClosedId) {
		let paprams="userToken="+userId+"&labClosedId="+labClosedId+"&fromDate=&toDate=&leaveDetails="+formdata.leaveDetails;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/labClosed.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetLabClosedDetails(userId) {
		let paprams="userToken="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getLabClosedDetails.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	createRegisterPatientByDoctor(formdata,userId,clinicId) {
		let paprams="userToken="+userId+"&clinicId="+clinicId+"&patientName="+formdata.pName+"&patientEmail="+formdata.pEmail+"&patientMobileNo="+formdata.pMobile+"&patientPassword="+formdata.pPassword;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/registerClinicPatient.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	getDoctorScheduleDetailByDay(userId,clinicId,appointmentDay) {
		
		let paprams="userToken="+userId+"&clinicId="+clinicId+"&appointmentDay="+appointmentDay;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getScheduleByDay.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	getLabScheduleDetailByDay(userId,appointmentDay) {
		
		let paprams="userToken="+userId+"&appointmentDay="+appointmentDay;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getLabScheduleByDay.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	deleteScheduleByDoctor(userId,clinicId,appointmentDay) {
		
		let paprams="userToken="+userId+"&clinicId="+clinicId+"&appointmentDay="+appointmentDay;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/deleteScheduleByDoctor.php';
        return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	deleteScheduleByLab(userId,appointmentDay) {
		
		let paprams="userToken="+userId+"&appointmentDay="+appointmentDay;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/deleteScheduleByLab.php';
        return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	getAllPatientListByDoctor(userId,clinicId){
		
		let paprams="userToken="+userId+"&clinicId="+clinicId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/patientListByClinic.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetClinicwiseDocAppointmentsList(userId,clinicId){
		
		let paprams="userToken="+userId+"&clinicId="+clinicId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/activeArchiveAppointment.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	ChangeDoctorAppointmentStatus(appointmentDetails,userId){
		
		let paprams="userToken="+userId+"&appointmentStatus="+appointmentDetails.appointment_status+"&appointmentId="+appointmentDetails.id;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/updateAppointmentStatus.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	CompleteDoctorAppointment(userId,appointment_status, id){
		
		let paprams="userToken="+userId+"&appointmentStatus="+appointment_status+"&appointmentId="+id;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/updateAppointmentStatus.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetLabAppointmentsList(userId){
		
		let paprams="userToken="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/activeArchiveLabAppointment.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	ChangeLabAppointmentStatus(appointmentDetails, userId){
		
		let paprams="userToken="+userId+"&appointmentStatus="+appointmentDetails.appointment_status+"&appointmentId="+appointmentDetails.id;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/updateLabAppointmentStatus.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	CompleteLabAppointmentStatus(userId, appointment_status, id){
		
		let paprams="userToken="+userId+"&appointmentStatus="+appointment_status+"&appointmentId="+id;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/updateLabAppointmentStatus.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	addDoctorImage(filedata, userId) {
		let headers = new Headers({ "Content-Type": undefined });
		const fd = new FormData();
        fd.append('userToken', userId);
        fd.append('filedata', filedata);
		console.log(fd);
		
        let options = new RequestOptions(/*{ headers: headers } */);
        var url = this.apiUrl+'/addDoctorImage.php';
         return this.http.post(url,fd,options)
			.map(res => res.json()) 
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	addPatientImage(filedata, userId) {
		let headers = new Headers({ "Content-Type": undefined });
		const fd = new FormData();
        fd.append('userToken', userId);
        fd.append('filedata', filedata);
		console.log("fd:"+fd);
		
        let options = new RequestOptions(/*{ headers: headers } */);
        var url = this.apiUrl+'/uploadPatientImage.php';
         return this.http.post(url,fd,options)
			.map(res => res.json()) 
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	addLabImage(filedata, userId) {
		let headers = new Headers({ "Content-Type": undefined });
		const fd = new FormData();
        fd.append('userToken', userId);
        fd.append('filedata', filedata);
		console.log(fd);
		
        let options = new RequestOptions(/*{ headers: headers } */);
        var url = this.apiUrl+'/uploadLabImage.php';
         return this.http.post(url,fd,options)
			.map(res => res.json()) 
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	registerPatient(formdata,patientId,doctorId) {
		
		let paprams="patientId="+patientId+"&doctorId="+doctorId+"&patientName="+formdata.patientName+"&patientEmail="+formdata.patientEmail+"&patientMobileNo="+formdata.patientMobileNo+"&patientPassword="+formdata.patientPassword;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/RegisterPatient.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	registerLab(formdata,labId) {
		
		let paprams="labId="+labId+"&labName="+formdata.labName+"&labEmail="+formdata.labEmail+"&labContactNo="+formdata.labContactNo+"&labPassword="+formdata.labPassword+"&labRegistrationId="+formdata.labRegistrationId+"&labTests="+formdata.labTestIds+"&visit_type="+formdata.visit_type+"&other_test="+formdata.other_test;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/RegisterLab.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	registerDoctor(formdata,doctorId) {
		
		let paprams="doctorId="+doctorId+"&doctorName="+formdata.doctorName+"&doctorEmail="+formdata.doctorEmail+"&doctorMobileNo="+formdata.doctorMobileNo+"&doctorPassword="+formdata.doctorPassword+"&doctorRegistrationId="+formdata.doctorRegistrationId+"&doctorSpecializationIds="+formdata.doctorSpecializationIds+"&doctorSubSpecializationIds="+formdata.doctorSubSpecializationIds+"&other_specialization="+formdata.other_specialization+"&other_sub_specialization="+formdata.other_sub_specialization;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/RegisterDoctor.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetAllActiveSubSpecializationsByMultipleSpecializations(specializations) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		let paprams="specialization_id="+specializations;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getAllActiveSubSpecializationsBySpecialization.php';
        return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }
	
	ForgetPassword(formdata) {
		
		let paprams="userEmail="+formdata.userEmail;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/forgetPassword.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	updateDoctorProfileInfo(formdata,userToken,doctorId) {
		
		let paprams="userToken="+userToken+"&doctorId="+doctorId+"&doctorName="+formdata.fullName+"&doctorEmail="+formdata.emailId+"&doctorMobileNo="+formdata.mobileNo+"&doctorPassword="+formdata.passwordUser+"&doctorRegistrationId="+formdata.registerId+"&doctorSpecializationIds="+formdata.doctorSpecializationIds+"&doctorSubSpecializationIds="+formdata.doctorSubSpecializationIds+"&aboutDoctor="+encodeURIComponent(formdata.aboutDoctor);
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/RegisterDoctor.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	updateLabProfileInfo(formdata,userToken,labId) {
		
		let paprams="userToken="+userToken+"&labId="+labId+"&labName="+formdata.fullName+"&labEmail="+formdata.emailId+"&labContactNo="+formdata.contactNo+"&labPassword="+formdata.passwordUser+"&labRegistrationId="+formdata.registerId+"&labTests="+formdata.labTestIds+"&address="+encodeURIComponent(formdata.address)+"&locationId="+formdata.locationId+"&otherLocation="+formdata.other_location+"&stateId="+formdata.stateId+"&cityId="+formdata.cityId+"&aboutDoctor="+encodeURIComponent(formdata.aboutLab)+"&maplink="+formdata.maplink+"&visit_type="+formdata.visit_type;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/RegisterLab.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	getAllTimeInterval(userId,clinicId,appointmentDate) {
		
		let paprams="userToken="+userId+"&clinicId="+clinicId+"&appointmentDate="+appointmentDate;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/timeIntervalList.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	createAppointmentByDoctor(formdata, userToken, clinicId, patientId, visit_type, appointmentId) {
		//console.log("formdata",formdata);
		let paprams="userToken="+userToken+"&clinicId="+clinicId+"&patientId="+patientId+"&visit_type="+visit_type+"&appointmentId="+appointmentId+"&patientUniqueId="+formdata.patientNumbar+"&appointmentDay="+formdata.minmDate+"&appointmentTime="+formdata.selectTime+"&appointmentFor="+formdata.membership+"&otherValue="+formdata.patientName;
		// console.log("paprams",paprams);
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/bookAppointment.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetDoctorwiseClinics(doctorId,type) {
		
		let paprams="doctorId="+doctorId+"&type="+type;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getDoctorwiseClinics.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetAssistantwiseClinics(assistantId) {
		
		let paprams="assistantId="+assistantId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getAssistantWiseClinic.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetStates() {
		
		let paprams="";
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getStates.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}

	GetCitiesByState(state_id) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		let paprams="state_id="+state_id;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getCitiesByState.php';
        return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }

	GetLocationsByCity(city_id) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		let paprams="city_id="+city_id;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getLocationsByCity.php';
        return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }
	
	registerClinic(formdata, userToken, clinicId, visitType){
		
		let paprams="userToken="+userToken+"&clinicId="+clinicId+"&clinicName="+formdata.clinicName+"&clinicContactNo="+formdata.clinicContactNo+"&stateId="+formdata.stateId+"&cityId="+formdata.cityId+"&locationId="+formdata.locationId+"&otherLocation="+formdata.other_location+"&clinicAddress="+encodeURIComponent(formdata.clinicAddress)+"&visit_type="+visitType+"&maplink="+formdata.maplink;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/RegisterClinicByDoctor.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
		
	}
	
	removeClinic(clinicDetails,userId) {
		
		let paprams="userToken="+userId+"&clinic_id="+clinicDetails.clinic_id;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/RemoveClinic.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	removeClinicByHome(clinic_id,userId) {
		
		let paprams="userToken="+userId+"&clinic_id="+clinic_id;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/RemoveClinic.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	CheckClinicValid(userId,clinicId) {
		
		let paprams="userToken="+userId+"&clinicId="+clinicId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/checkClinicValidity.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
			
    }
	
	addAppointmentDetail(formdata,userId,clinicId,appointmentId) {
		
		let paprams="userToken="+userId+"&clinicId="+clinicId+"&appointmentId="+appointmentId+"&appointmentDetail="+encodeURIComponent(formdata.appointmentDetail);
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/addAppointmentDetail.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	AddMedicine(formdata,userId,clinicId,appointmentId,medicineId) {
		
		let paprams="userToken="+userId+"&clinicId="+clinicId+"&appointmentId="+appointmentId+"&medicineId="+medicineId+"&medicineName="+formdata.medicineName+"&medicineTimings="+formdata.medicineTimings+"&medicineDays="+formdata.medicineDays+"&medicineStartDate="+formdata.minmDate;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/addMedicine.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}

	GetAppointmentwiseMedicinesList(formdata,userId,clinicId) {
		
		let paprams="userToken="+userId+"&clinicId="+clinicId+"&appointmentId="+formdata.id;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getMedicineList.php';
        return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }
	
	DeleteMedicine(userId,clinicId,formdata) {
		
		let paprams="userToken="+userId+"&clinicId="+clinicId+"&medicineId="+formdata.medicineId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/deleteMedicine.php';
        return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	getMedicineDetailsById(userId,medicineId) {
		
		let paprams="userToken="+userId+"&medicineId="+medicineId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getMedicineDetailById.php';
        return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetAppointmentHistoryList(userId,formdata) {
		
		let paprams="userToken="+userId+"&appointmentId="+formdata.id;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/viewMedicineHistory.php';
        return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetUploadedLabReportsList(userId,appointmentId) {
		
		let paprams="userToken="+userId+"&appointmentId="+appointmentId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getLabAppointmentReport.php';
        return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	DeleteLabReport(userId,formdata) {
		
		let paprams="userToken="+userId+"&reportId="+formdata.id;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/deleteLabReport.php';
        return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	getAllLabTimeInterval(userId,appointmentDate,labId) {
		
		let paprams="userToken="+userId+"&appointmentDate="+appointmentDate+"&labId="+labId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/labTimeIntervalList.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}

	GetAllActiveLabTestsByLab(userId,labId) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		let paprams="userToken="+userId+"&labId="+labId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getAllActiveLabTestsByLab.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }
	
	createLabAppointmentByPatient(formdata, userToken, labId, patientId, visit_type, appointmentId) {
		//console.log("formdata",formdata);
		let paprams="userToken="+userToken+"&labId="+labId+"&patientId="+patientId+"&visit_type="+visit_type+"&appointmentId="+appointmentId+"&labTests="+formdata.labTests+"&patientUniqueId="+formdata.patientNumbar+"&appointmentDay="+formdata.minmDate+"&appointmentTime="+formdata.selectTime+"&appointmentFor="+formdata.membership+"&otherValue="+formdata.patientName;
		// console.log("paprams",paprams);
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/bookLabAppointment.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}

	GetDoctorDetailsByClinicId(clinicId) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		let paprams="clinicId="+clinicId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getDoctorDetailsByClinicId.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }

	GetLabDetailsByLabId(labId) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		let paprams="labId="+labId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getLabDetailsById.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }

	GetClinicSlotwiseUpdatedActiveTurn(userId, clinicId) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		//console.log(productData);
		let paprams="userToken="+userId+"&clinicId="+clinicId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getClinicSlotwiseUpdatedActiveTurn.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
    }
	
	UpdateAppointmentTurn(userId, clinicId) {
		//console.log("formdata",formdata);
		let paprams="userToken="+userId+"&clinicId="+clinicId;
		console.log("paprams",paprams);
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/updateAppointmentTurn.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	updatePatientProfileInfo(formdata,userToken,patientId) {
		
		let paprams="userLoginToken="+userToken+"&patientId="+patientId+"&patientName="+formdata.fullName+"&patientEmail="+formdata.emailId+"&patientMobileNo="+formdata.mobileNo+"&patientPassword="+formdata.passwordUser+"&address="+encodeURIComponent(formdata.address)+"&locationId="+formdata.locationId+"&otherLocation="+formdata.other_location+"&stateId="+formdata.stateId+"&cityId="+formdata.cityId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/RegisterPatient.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetPatientActiveArchiveReportsList(userId){
		
		let paprams="userToken="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/viewPatientReportsList.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	MoveLabReportsToArchive(userId,appointmentId){
		
		let paprams="userToken="+userId+"&appointmentId="+appointmentId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/moveLabReportsToArchive.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetPatientDoctorList(userId){
		
		let paprams="userToken="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getPatientDoctorList.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	ShareLabReportsToDoctors(doctorId, userId, reportId, labBookAppointmentId){
		
		let paprams="userToken="+userId+"&reportId="+reportId+"&labBookAppointmentId="+labBookAppointmentId+"&doctorId="+doctorId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/shareLabReportToDoctors.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	ViewPatientListOfSharedReports(userId){
		
		let paprams="userToken="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/viewPatientListOfSharedReports.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	ViewDoctorListOfSharedReports(userId){
		
		let paprams="userToken="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/viewDoctorListOfSharedReports.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	ViewDoctorwiseSharedReports(userId, doctorId){
		
		let paprams="userToken="+userId+"&doctorId="+doctorId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/viewDoctorwiseSharedReports.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	ViewPatientwiseSharedReports(userId, patientId){
		
		let paprams="userToken="+userId+"&patientId="+patientId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/viewPatientwiseSharedReports.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetPatientActiveAppointmentsList(userId){
		
		let paprams="userToken="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getPatientActiveAppointmentsList.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	CancelDocAppointmentByPatient(userId,appointmentId){
		
		let paprams="userToken="+userId+"&appointmentId="+appointmentId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/cancelDocAppointmentByPatient.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	CancelLabAppointmentByPatient(userId,appointmentId){
		
		let paprams="userToken="+userId+"&appointmentId="+appointmentId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/cancelLabAppointmentByPatient.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetAppointmentDetailsById(userId,appointmentId){
		
		let paprams="userToken="+userId+"&appointmentId="+appointmentId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getAppointmentDetailsById.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetLabAppointmentDetailsById(userId,appointmentId){
		
		let paprams="userToken="+userId+"&appointmentId="+appointmentId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getLabAppointmentDetailsById.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	ViewAppointmentPrescription(userId,appointmentId){
		
		let paprams="userToken="+userId+"&appointmentId="+appointmentId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/viewAppointmentPrescription.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetUploadedDoctorDocumentsList(userId){
		
		let paprams="userToken="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getDocDocumentList.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetUploadedLabDocumentsList(userId){
		
		let paprams="userToken="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getLabDocumentList.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	UploadDoctorDocs(filedata, userId) {
		let headers = new Headers({ "Content-Type": undefined });
		const fd = new FormData();
        fd.append('userToken', userId);
        fd.append('doctorDocuments', filedata);
		console.log(fd);
		
        let options = new RequestOptions(/*{ headers: headers } */);
        var url = this.apiUrl+'/uploadDoctorDocuments.php';
         return this.http.post(url,fd,options)
			.map(res => res.json()) 
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	UploadLabDocs(filedata, userId) {
		// console.log("filedata: "+filedata);
		// console.log("userId: "+userId);
		let headers = new Headers({ "Content-Type": undefined });
		const fd = new FormData();
        fd.append('userToken', userId);
        fd.append('labDocuments', filedata);
		// console.log("fd: "+fd);
		
        let options = new RequestOptions(/*{ headers: headers } */);
        var url = this.apiUrl+'/uploadLabDocuments.php';
         return this.http.post(url,fd,options)
			.map(res => res.json()) 
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	UploadLabReport(filedata, userId, appointmentId) {
		let headers = new Headers({ "Content-Type": undefined });
		const fd = new FormData();
        fd.append('userToken', userId);
        fd.append('appointmentId', appointmentId);
        fd.append('labReport', filedata);
		console.log(fd);
		//console.log("helllooooooooooooooooooooooo"+fd);
        let options = new RequestOptions(/*{ headers: headers } */);
        var url = this.apiUrl+'/uploadLabReport.php';
         return this.http.post(url,fd,options)
			.map(res => res.json()) 
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}

	getDoctorList(userId,dName){
		
		let paprams="userToken="+userId+"&dName="+dName;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/doctorNameList.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	SearchDoctorByKeyword(searchData,userId) {
		//this.apiUrl="http://192.168.1.113/staging/php/medical";
		let paprams="userToken="+userId+"&searchDoctor="+searchData;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/searchDoctorByKeyword.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();		
    }
	
	UploadPrescriptionDocs(filedata, userId, appointmentId) {
		console.log("filedata: "+filedata);
		console.log("userId: "+userId);
		console.log("appointmentId: "+appointmentId);
		let headers = new Headers({ "Content-Type": undefined });
		const fd = new FormData();
        fd.append('userToken', userId);
        fd.append('medicinePrescription', filedata);
        fd.append('appointment_id', appointmentId);
		console.log("fd:"+fd);
		
        let options = new RequestOptions(/*{ headers: headers } */);
        var url = this.apiUrl+'/uploadPrescription.php';
         return this.http.post(url,fd,options)
			.map(res => res.json()) 
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	uploadClinicImagePage(filedata, userId, clinicId) {
		let headers = new Headers({ "Content-Type": undefined });
		const fd = new FormData();
        fd.append('userToken', userId);
        fd.append('clinic_image', filedata);
        fd.append('clinic_id', clinicId);
		console.log("fd-data:"+JSON.stringify(fd));
		
        let options = new RequestOptions(/*{ headers: headers } */);
        var url = this.apiUrl+'/uploadClinicImage.php';
         return this.http.post(url,fd,options)
			.map(res => res.json()) 
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetUploadedClinicImages(userId,clinicId){
		
		let paprams="userToken="+userId+"&clinic_id="+clinicId;;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getClinicImagesList.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	DeleteClinicImage(userId,clinicId,clinicImageId) {
		
		let paprams="userToken="+userId+"&clinicId="+clinicId+"&clinicImageId="+clinicImageId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/deleteClinicImage.php';
        return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	GetScheduleLimitTimings(userId){
		
		let paprams="userToken="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/getScheduleLimitTimings.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	setGcmToken(regId,userId) {
		//this.apiUrl="http://192.168.1.113/staging/php/crompton-ecomm";
		//console.log(productData);
		let paprams="userToken="+userId+"&gcmToken="+regId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/saveUserGCM.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}

	getNotificationList(userId){
		
		let paprams="userToken="+userId;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/notificationList.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
	}
	
	getHomeClinicDetails(userToken){
		
		let paprams="userToken="+userToken;
		let headers = new Headers({ "Content-Type":"application/x-www-form-urlencoded" });
        let options = new RequestOptions({ headers: headers });
        var url = this.apiUrl+'/homeClinicDetailByDoctor.php';
         return this.http.post(url,paprams,options).map(res => res.json())
			.map(data => data)  // You only return the .products from the server response right?
			.toPromise();
		
	}
	
}
