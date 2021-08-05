import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthUser} from '../../../model/auth-user.model';
import {AuthService} from '../../../services/auth.service';
import { Subject } from 'rxjs';
import {
  debounceTime,
} from 'rxjs/operators';


interface SpecializationInfo {
  name: string;
  value: string;
  subspecializations?: SpecializationInfo;
}

@Component({
  selector: 'app-doctors-map',
  templateUrl: './doctors-map.component.html',
  styleUrls: ['./doctors-map.component.scss'],
})
export class DoctorsMapComponent {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() doctorsListForMap: any[];
  @Output() onChangeCoordinates: EventEmitter<any> = new EventEmitter();

  user: AuthUser;
  debouncer: Subject<any> = new Subject<any>();

  constructor(
    private authService: AuthService,
    private translate: TranslateService,
  ) {
    this.authService
      .observeUser()
      .subscribe((user) => {
        this.user = user;
      });

    this.debouncer
      .pipe(debounceTime(1000) )
      .subscribe((value) => this.onChangeCoordinates.emit(value));
  }

  onMapPositionChange({ lat, lng }) {
    this.debouncer.next({
      latitude: lat,
      longitude: lng,
    });
  }
}
