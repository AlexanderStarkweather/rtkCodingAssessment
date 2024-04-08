import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCard } from './event-card.component';
import { EventEntry } from '../interfaces/event';

@Component({
  selector: 'event-list',
  standalone: true,
  templateUrl: './event-list.component.html',
  imports: [CommonModule, EventCard],
})
export class EventList {
  @Input() events: EventEntry[] = [];
}
