import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from './alert.service';
import { QuickFilterPipe } from '../pipes/quickfilter.pipe';
import { EventEntry } from '../interfaces/event';
import { Attraction } from '../interfaces/attraction';
import { PageInfo } from '../interfaces/pageinfo';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _apiKey: string = 'RIneAGVTcgXSCQUBp0AQivpuXkGms2dC';
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public searchResult$ = new BehaviorSubject<EventEntry[]>([]);
  public pageInfo$ = new BehaviorSubject<PageInfo>({ size: 0, totalElements: 0, totalPages: 0, number: 0 });

  constructor(private http: HttpClient, private alertService: AlertService) {}

  showError(error: any) {
    console.error(error);
    this.alertService.addAlert({
      type: error.type,
      message: error.message,
      fault: error.error?.fault?.faultstring,
      name: error.name,
      status: error.status,
      statusText: error.statusText,
    });
  }

  getEvents(keyword?: string): any {
    let params = new HttpParams().set('apikey', this._apiKey);
    params = params.set('size', 50);

    if (keyword) {
      params = params.set('keyword', keyword);
    }
    return this.http.get<any>('/api', { params });
  }

  search(keyword: string) {
    console.log('search.service.search: ' + keyword);
    this.isLoading$.next(true);
    this.getEvents(keyword).subscribe(
      (data: any) => {
        if (data._embedded) {
          let results = data._embedded.events;
          results.forEach((e: any) => {
            /*Break out embedded data to access venues and performers (aka attractions)*/
            e.venues = e._embedded?.venues;
            e.attractions = e._embedded?.attractions;

            /*Break out aliases so that 'pink' still returns 'P!NK' as expected while filtering*/
            if (e.attractions) {
              e.aliases = e._embedded?.attractions
                ?.reduce((accumulator: string, attraction: Attraction) => {
                  if (attraction.aliases) {
                    return accumulator + attraction.aliases?.join(',') + ',';
                  }
                  return accumulator;
                }, '')
                .slice(0, -1);
            }
          });
          this.searchResult$.next(results);
        } else {
          this.searchResult$.next([]);
        }
        if (data.page) {
          this.pageInfo$.next(data.page);
        }
      },
      (error: any) => {
        this.searchResult$.next([]);
        this.showError(error);
      },
      () => {
        this.isLoading$.next(false);
      }
    );
  }

  getFilteredResults(keyword: string) {
    console.log('search.service.getFilteredResults: ' + keyword);
    return new QuickFilterPipe().transform(this.searchResult$.value, keyword);
  }
}
