import { Component, Input } from '@angular/core';
import dayjs from 'dayjs';

@Component({
  selector: 'app-timestamp',
  templateUrl: './timestamp.component.html',
  styleUrls: ['./timestamp.component.scss']
})
export class TimestampComponent {
  @Input() timestamp!: string;
    /* Need to compare timestamp to current time with 5 minute timerange if the data is too old to trust*/
  comparisonTime = dayjs().subtract(5, 'minute').format('DD.MM.YYYY HH:mm');

  getDateFromString(timestamp: string): Date {
    const [day, month, year, hours, minutes] = timestamp.split(/[.: ]/);
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
  }
}
