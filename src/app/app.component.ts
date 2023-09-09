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
  items: IfacilitiesResponse[] = [];

  constructor( private service: FacilityService ) {}

  async ngOnInit() {
    const args: IfacilitiesInput = {
      statuses: ["IN_OPERATION"],
      ids: [992, 990, 755, 619]
    }

    this.service
    .watchFacilities(args)
    .pipe(take(1))
    .subscribe((facilities) => {
      this.items = facilities
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
