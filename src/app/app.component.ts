import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { EventEntry } from './interfaces/event';
import { BehaviorSubject } from 'rxjs';
import { EventFilter } from './components/event-filter.component';
import { EventList } from './components/event-list.component';
import { EventSearch } from './components/event-search.component';
import { AlertList } from './components/alert-list.component';
import { SearchService } from './services/search.service';
import { Pager } from './components/pager.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, EventFilter, EventList, EventSearch, AlertList, Pager],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private searchService: SearchService, private viewportScroller: ViewportScroller) {
    this.searchService.searchResult$.subscribe(() => {
      console.log('searchResults$.subscription triggered change');
      this.updateResults(this._filterKeyword$.value);
    });
    this._filterKeyword$.subscribe((keyword) => {
      console.log('_filterKeyword$.subscription triggered change');
      this.updateResults(keyword);
    });
    this.searchService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
      this.updateEmpty();
    });
  }
  private _filterKeyword$ = new BehaviorSubject<string>('');
  public filteredResults: EventEntry[] = [];
  public isLoading: boolean = false;
  public isEmpty: boolean = false;

  ngOnInit() {
    this.resetSearch();
  }

  resetSearch() {
    this.search('');
  }

  updateResults(keyword: string) {
    this.filteredResults = this.searchService.getFilteredResults(keyword);
    this.updateEmpty();
  }

  updateEmpty() {
    this.isEmpty = !this.isLoading && this.filteredResults.length < 1;
  }

  scrollToTop() {
    this.viewportScroller.scrollToAnchor('pageTop');
  }

  search(keyword: string) {
    console.log('app.component.search');
    this.scrollToTop();
    this.searchService.search(keyword);
  }

  filter(keyword: string) {
    console.log('app.component.filter');
    this.scrollToTop();
    this._filterKeyword$.next(keyword);
  }
}
