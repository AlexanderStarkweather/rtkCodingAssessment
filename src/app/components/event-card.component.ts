import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEntry } from '../interfaces/event';
import { VenuePipe } from '../pipes/venue.pipe';

@Component({
  selector: 'event-card',
  standalone: true,
  templateUrl: './event-card.component.html',
  imports: [CommonModule, VenuePipe],
})
export class EventCard {
  @Input() event!: EventEntry;

  get imgUrl() {
    if (!this.event?.images) {
      return null;
    }
    let match = this.event.images.find((img) => {
      return img.ratio === '16_9' && img.width > 500;
    });
    return match ? match?.url : null;
  }

  get startDate() {
    if (!this.event?.dates) {
      return null;
    }
    return this.event.dates.start?.dateTime;
  }

  get hasAttractions() {
    if (!this.event?.attractions) {
      return false;
    }
    return this.event.attractions.length > 0;
  }
}
