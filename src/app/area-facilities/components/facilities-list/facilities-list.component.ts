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
  comparisonTime = dayjs().subtract(5, 'minute').format('DD.MM.YYYY HH:mm'); // TODO move this to own component

  constructor(private service: FacilityService, private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.facilityId = this.route.snapshot.paramMap.get('id') as string;

    this.service
    .fetchAreaFacilities(this.facilityId)
    .subscribe((facilityDetails) => {
      this.items = facilityDetails
    });
  }

  getDateFromString(timestamp: string): Date {
    const [day, month, year, hours, minutes] = timestamp.split(/[.: ]/);
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
  }
}
