import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  private routerInfo: BehaviorSubject<boolean[]>;
  flags: boolean[];
  
  constructor() { 
    this.routerInfo = new BehaviorSubject <boolean[]>(this.flags);
  }

  getFlags():Observable<boolean[]>{
    return this.routerInfo.asObservable();
  }

  setWindowFlags(w1:boolean, w2:boolean,w3:boolean,
                w4:boolean,w5:boolean,w6:boolean,w7:boolean): void{
    let flags = [];
    flags.push(w1);
    flags.push(w2);
    flags.push(w3);
    flags.push(w4); 
    flags.push(w5);
    flags.push(w6);
    flags.push(w7);
    this.routerInfo.next(flags);
  }
}
