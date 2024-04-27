import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import packageJson from '../../../package.json';
import { FacilityService } from '../services/facility-service';
import * as dayjs from 'dayjs'

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent {
  appVersion: string = packageJson.version;
  private ngUnsubscribe = new Subject<void>;
  items: any = [] // TODO change any

  constructor( private service: FacilityService ) {}

  ngOnInit() {
    this.service
    .fetchAllFacilityDetails()
    .subscribe((facilityDetails) => {
      this.items = facilityDetails
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
