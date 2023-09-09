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
    const args: IfacilitiesInput = {
      statuses: ["IN_OPERATION"],
      ids: [992, 990, 755, 619]
    }

    this.service.watchFacilities(args).subscribe((facilities) => { 
      this.service
      .fetchAllFacilityDetails(facilities.facilities) //TODO move all the logic behind this function
      .subscribe((facilityDetails) => {
        this.items = facilityDetails
      });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
