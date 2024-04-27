import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import dayjs from 'dayjs';
import { FacilityService } from 'src/app/services/facility-service';

@Component({
  selector: 'app-facilities-list',
  templateUrl: './facilities-list.component.html',
  styleUrls: ['./facilities-list.component.scss']
})
export class FacilitiesListComponent {
  items: any = []
  facilityId!: string;

  constructor(private service: FacilityService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.facilityId = this.route.snapshot.paramMap.get('id') as string;

    this.service
    .fetchAreaFacilities(this.facilityId)
    .subscribe((facilityDetails) => {
      this.items = facilityDetails
    });
  }
}
