import { Component, OnInit } from '@angular/core';
import { FacilityService } from './services/facility-service';
import { Subject } from 'rxjs';
import packageJson from '../../package.json';
import { inject } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'Liipy';
  appVersion: string = packageJson.version;
  private ngUnsubscribe = new Subject<void>;
  items: any = [] //TODO change any

  constructor( private service: FacilityService ) {}

  async ngOnInit() {
    inject();
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
