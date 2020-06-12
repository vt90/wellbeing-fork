import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoctorRegisterPage } from './doctor-register.page';

describe('DoctorRegisterPage', () => {
  let component: DoctorRegisterPage;
  let fixture: ComponentFixture<DoctorRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorRegisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
