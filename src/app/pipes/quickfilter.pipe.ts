import { Pipe, PipeTransform } from '@angular/core';
import { EventEntry } from '../interfaces/event';
import { DatePipe } from '@angular/common';
@Pipe({
  standalone: true,
  name: 'quickFilter',
})
export class QuickFilterPipe implements PipeTransform {
  transform(events: EventEntry[], query: string): EventEntry[] {
    if (query.length > 0) {
      let pattern = '(?=.*' + query.trim().replace(/\s/g, ')(?=.*') + ')';
      let regex = new RegExp(pattern, 'i');
      return events.filter((e: EventEntry) => {
        let date = new DatePipe('en-US').transform(e.dates?.start?.dateTime, 'fullDate');
        return e.name?.match(regex) || date?.match(regex) || e.aliases?.match(regex);
      });
    }
    return events;
  }
}
