import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss']
})
export class FacilityComponent implements OnInit {
  facilityId!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.facilityId = this.route.snapshot.paramMap.get('id') as string;
    // You can use this.facilityId to fetch data related to this facility ID from a service or API
  }
}
