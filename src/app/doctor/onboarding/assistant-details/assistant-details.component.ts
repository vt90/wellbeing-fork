import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Doctor} from '../../../model/doctor.model';
import {Assistant} from '../../../model/assistant.model';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'assistant-details',
  templateUrl: './assistant-details.component.html',
  styleUrls: ['./assistant-details.component.scss'],
})
export class AssistantDetailsComponent implements OnInit{
  @Output() step: EventEmitter<number> = new EventEmitter<number>();
  name: string;
  email: string = '';
  contact: number;
  gender: string;
  doctor: Doctor;
  assistant: Assistant;

  constructor(private storage: Storage,
              private authService: AuthService) { }

  ngOnInit(){
  }
  next(){
    this.step.emit(4);
    this.doctor = new Doctor;
    this.assistant = new Assistant();
    this.assistant.fullname = this.name;
    this.assistant.email = this.email;
    this.assistant.gender = this.gender;
    this.assistant.contact = this.contact;
    //this.doctor.assistants.push(this.assistant);
    if(this.email !== '') {
      this.authService.signupAssistant(this.email).then(r => console.log(r));
    }
  }

  prev() {
    this.step.emit(2);
  }
}
