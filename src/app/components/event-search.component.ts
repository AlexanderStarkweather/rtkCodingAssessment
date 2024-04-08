import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'event-search',
  standalone: true,
  templateUrl: './event-search.component.html',
  imports: [CommonModule, FormsModule],
})
export class EventSearch {
  @Output() searchEvent = new EventEmitter<string>();

  public focused: boolean = false;
  public keyword: string = '';

  clearSearch() {
    this.keyword = '';
  }

  submitSearch() {
    this.searchEvent.emit(this.keyword);
  }
}
