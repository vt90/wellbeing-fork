import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import {RlTagInputModule} from 'angular2-tag-input';
import { IonicStorageModule } from '@ionic/storage';
//import { FileOpener } from '@ionic-native/file-opener';
import { Push } from '@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { InAppBrowser } from "@ionic-native/in-app-browser";

import { HttpModule } from '@angular/http'; 
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PatientRegisterPage } from '../pages/patient-register/patient-register';
import { AboutPage } from '../pages/about/about';
import { ProfilePage } from '../pages/profile/profile';
import { TermsPage } from '../pages/terms/terms';
import { LoginPage } from '../pages/login/login';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';

import { SearchDoctorPage } from '../pages/search-doctor/search-doctor';
import { DoctorListPage } from '../pages/doctor-list/doctor-list';
import { DoctorDetailPage } from '../pages/doctor-detail/doctor-detail';
import { BookAppointmentPage } from '../pages/book-appointment/book-appointment'; 
import { SuccessfulAppointmentPage } from '../pages/successful-appointment/successful-appointment';
import { NotificationPage } from '../pages/notification/notification';
import { PatientDetailPage } from '../pages/patient-detail/patient-detail';
import { PatientAddDetailPage } from '../pages/patient-add-detail/patient-add-detail';
import { SearchbarPage } from '../pages/searchbar/searchbar';

import { ActiveAppointmentPage } from '../pages/active-appointment/active-appointment';

import { SearchLabPage } from '../pages/search-lab/search-lab';
import { LabListPage } from '../pages/lab-list/lab-list';
import { LabDetailPage } from '../pages/lab-detail/lab-detail';
import { LabBookAppointmentPage } from '../pages/lab-book-appointment/lab-book-appointment';
import { LabSuccessfulAppointmentPage } from '../pages/lab-successful-appointment/lab-successful-appointment';

import { PharmacyPage } from '../pages/pharmacy/pharmacy';
import { ViewReportPage } from '../pages/view-report/view-report'; 
import { ReportsPage } from '../pages/reports/reports';
import { SharedReportsPage } from '../pages/shared-reports/shared-reports';
import { ShareReportDocListPage } from '../pages/share-report-doc-list/share-report-doc-list';
import { ViewSharedReportsPage } from '../pages/view-shared-reports/view-shared-reports';
import { ViewPrescriptionPage } from '../pages/view-prescription/view-prescription';

// role doctor pages
import { DoctorRegisterPage } from '../pages/doctor-register/doctor-register';
import { SelectClinicPage } from '../pages/select-clinic/select-clinic';
import { ManageClinicPage } from '../pages/manage-clinic/manage-clinic';
import { DocAddClinicPage } from '../pages/doc-add-clinic/doc-add-clinic';
import { DocCurrentAppointmentsPage } from '../pages/doc-current-appointments/doc-current-appointments';
import { DoctorProfilePage } from '../pages/doctor-profile/doctor-profile';
import { DoctorAppointmentScheduledPage } from '../pages/doctor-appointment-scheduled/doctor-appointment-scheduled';
import { DoctorAddAppointmentScheduledPage } from '../pages/doctor-add-appointment-scheduled/doctor-add-appointment-scheduled';
import { AssistantListPage } from '../pages/assistant-list/assistant-list';
import { CreateAssistantPage } from '../pages/create-assistant/create-assistant';
import { DoctorLeavePage } from '../pages/doctor-leave/doctor-leave';
import { DocRegisterPatientPage } from '../pages/doc-register-patient/doc-register-patient';
import { DocAddAppointmentPage } from '../pages/doc-add-appointment/doc-add-appointment';
import { MedicineListPage } from '../pages/medicine-list/medicine-list';
import { AddMedicinePage } from '../pages/add-medicine/add-medicine';
import { AppointmemtHistoryPage } from '../pages/appointmemt-history/appointmemt-history';
import { SharedDocReportsPage } from '../pages/shared-doc-reports/shared-doc-reports';
import { AddClinicImagesPage } from '../pages/add-clinic-images/add-clinic-images';

// role lab pages
import { LabRegisterPage } from '../pages/lab-register/lab-register';
import { LabProfilePage } from '../pages/lab-profile/lab-profile';
import { LabClosedPage } from '../pages/lab-closed/lab-closed';
import { LabAppointmentScheduledPage } from '../pages/lab-appointment-scheduled/lab-appointment-scheduled';
import { LabAddAppointmentScheduledPage } from '../pages/lab-add-appointment-scheduled/lab-add-appointment-scheduled';
import { LabCurrentAppointmentsPage } from '../pages/lab-current-appointments/lab-current-appointments';
import { LabViewReportsPage } from '../pages/lab-view-reports/lab-view-reports';
import { LabViewAppointmentHistoryPage } from '../pages/lab-view-appointment-history/lab-view-appointment-history';
  
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AllserviceProvider } from '../providers/allservice/allservice';

import { Loginservice } from '../services/loginservice';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	PatientRegisterPage,
    AboutPage,
    ProfilePage,
    TermsPage,
    LoginPage,
    ForgotPasswordPage,
    NotificationPage,
	PatientDetailPage,
	PatientAddDetailPage,
	SearchbarPage,
    SearchDoctorPage,
    DoctorListPage,
    DoctorDetailPage,
    BookAppointmentPage,
    SuccessfulAppointmentPage,
    ActiveAppointmentPage,
	PharmacyPage,
	SharedReportsPage,
	SharedDocReportsPage,
	ShareReportDocListPage,
	ViewSharedReportsPage,
	ViewPrescriptionPage,
	ReportsPage,
	ViewReportPage,
	SearchLabPage,
	LabListPage,
	LabDetailPage,
	LabBookAppointmentPage,
	LabSuccessfulAppointmentPage,
	DocCurrentAppointmentsPage,
	DoctorProfilePage,
	DoctorRegisterPage,
	SelectClinicPage,
	ManageClinicPage,
	DocAddClinicPage,
	DoctorAppointmentScheduledPage,
	DoctorAddAppointmentScheduledPage,
	AssistantListPage,
	CreateAssistantPage,
	DoctorLeavePage,
	DocRegisterPatientPage,
	DocAddAppointmentPage,
	MedicineListPage,
	AddMedicinePage,
	AppointmemtHistoryPage,
	LabRegisterPage,
	LabProfilePage,
	LabClosedPage,
	LabAppointmentScheduledPage,
	LabAddAppointmentScheduledPage,
	LabCurrentAppointmentsPage,
	LabViewReportsPage,
	LabViewAppointmentHistoryPage,
	AddClinicImagesPage
  ],
  imports: [
    BrowserModule,
	HttpModule,
	RlTagInputModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule,
	IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	PatientRegisterPage,
    AboutPage,
    ProfilePage,
    TermsPage,
    LoginPage,
    ForgotPasswordPage,
    NotificationPage,
	PatientDetailPage,
	PatientAddDetailPage,
	SearchbarPage,
    SearchDoctorPage,
    DoctorListPage,
    DoctorDetailPage,
    BookAppointmentPage,
    SuccessfulAppointmentPage,
    ActiveAppointmentPage,
	PharmacyPage,
	SharedReportsPage,
	SharedDocReportsPage,
	ShareReportDocListPage,
	ViewSharedReportsPage,
	ViewPrescriptionPage,
	ReportsPage,
	ViewReportPage,
	SearchLabPage,
	LabListPage,
	LabDetailPage,
	LabBookAppointmentPage,
	LabSuccessfulAppointmentPage,
	DocCurrentAppointmentsPage,
	DoctorProfilePage,
	DoctorRegisterPage,
	SelectClinicPage,
	ManageClinicPage,
	DocAddClinicPage,
	DoctorAppointmentScheduledPage,
	DoctorAddAppointmentScheduledPage,
	AssistantListPage,
	CreateAssistantPage,
	DoctorLeavePage,
	DocRegisterPatientPage,
	DocAddAppointmentPage,
	MedicineListPage,
	AddMedicinePage,
	AppointmemtHistoryPage,
	LabRegisterPage,
	LabProfilePage,
	LabClosedPage,
	LabAppointmentScheduledPage,
	LabAddAppointmentScheduledPage,
	LabCurrentAppointmentsPage,
	LabViewReportsPage,
	LabViewAppointmentHistoryPage,
	AddClinicImagesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	Loginservice,
	Camera,
	Push,
	LocalNotifications,
	InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AllserviceProvider
  ]
})
export class AppModule {}