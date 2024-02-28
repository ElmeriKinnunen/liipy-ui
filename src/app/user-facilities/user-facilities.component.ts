import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import packageJson from '../../../package.json';
import { FacilityService } from '../services/facility-service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user-facilities',
  templateUrl: './user-facilities.component.html',
  styleUrls: ['./user-facilities.component.scss']
})
export class UserFacilitiesComponent {
  appVersion: string = packageJson.version;
  private ngUnsubscribe = new Subject<void>;
  items: any = [] //TODO change any

  constructor( private service: FacilityService, @Inject(DOCUMENT) private _document: Document ) {}

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

  refreshPage() {
    this._document.defaultView?.location.reload();
  }
}
