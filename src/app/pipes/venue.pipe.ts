import { Pipe, PipeTransform } from '@angular/core';
import { EventVenue } from '../interfaces/event';
@Pipe({
  standalone: true,
  name: 'displayVenue',
})
export class VenuePipe implements PipeTransform {
  transform(value: EventVenue): string {
    return [value.name, value.city?.name, value.state?.stateCode, value.country?.countryCode].filter(Boolean).join(', ');
  }
}
