import { Component, EventEmitter, Output, Input } from '@angular/core';


@Component({
  selector: 'basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent {
  @Output() flags:EventEmitter<boolean[]> = new EventEmitter<boolean[]>();
 
  constructor(){}

  next(){
    this.flags.emit([false,true,false,false,false,false,false]);
  }
}
