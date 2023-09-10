import { Component, OnInit } from '@angular/core';
import { FacilityService } from './services/facility-service';
import { Subject, take, takeUntil } from 'rxjs';
import { IfacilitiesInput, IfacilitiesResponse } from 'src/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'liipy-ui';
  private ngUnsubscribe = new Subject<void>;
  items: any = [] //TODO change any

  constructor( private service: FacilityService ) {}

  async ngOnInit() {
    this.service
    .fetchAllFacilityDetails() //TODO move all the logic behind this function
    .subscribe((facilityDetails) => {
      this.items = facilityDetails
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
