import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import packageJson from '../../../package.json';
import { FacilityService } from '../services/facility-service';
import dayjs from 'dayjs';

@Component({
  selector: 'app-user-facilities',
  templateUrl: './user-facilities.component.html',
  styleUrls: ['./user-facilities.component.scss']
})
export class UserFacilitiesComponent {
  appVersion: string = packageJson.version;
  private ngUnsubscribe = new Subject<void>;
  items: any = [] //TODO change any

  constructor( private service: FacilityService) {}

  ngOnInit() {
    this.service
    .fetchUserFacilityDetails()
    .subscribe((facilityDetails) => {
      this.items = facilityDetails
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
