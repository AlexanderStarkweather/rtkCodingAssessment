import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'event-filter',
  standalone: true,
  templateUrl: './event-filter.component.html',
  imports: [CommonModule, FormsModule],
})
export class EventFilter implements OnDestroy {
  @Output() filterEvent = new EventEmitter<string>();
  public keyword: string = '';
  public focused: boolean = false;
  private _keywordInput = new Subject<string>();

  constructor() {
    this._keywordInput.pipe(debounceTime(250)).subscribe((keyword: string) => {
      this.submitFilter(keyword);
    });
  }

  onKeywordChange() {
    this._keywordInput.next(this.keyword);
  }

  submitFilter(keyword: string) {
    console.log('event-filter.component.submitFilter: ' + keyword);
    this.filterEvent.emit(keyword);
  }

  clearFilter() {
    this.keyword = '';
    this.onKeywordChange();
  }

  ngOnDestroy() {
    this._keywordInput.complete();
  }
}
