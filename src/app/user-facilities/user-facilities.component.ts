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
  /* Need to compare timestamp to current time with 5 minute timerange if the data is too old to trust*/
  comparisonTime = dayjs().subtract(5, 'minute').format('DD.MM.YYYY HH:mm'); // TODO move this to own component

  constructor( private service: FacilityService) {}

  ngOnInit() {
    this.service
    .fetchUserFacilityDetails()
    .subscribe((facilityDetails) => {
      this.items = facilityDetails
    });
  }

  getDateFromString(timestamp: string): Date {
    const [day, month, year, hours, minutes] = timestamp.split(/[.: ]/);
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
