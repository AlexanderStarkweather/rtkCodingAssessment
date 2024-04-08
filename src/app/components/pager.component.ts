import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../services/search.service';
import { PageInfo } from '../interfaces/pageinfo';

@Component({
  selector: 'pager',
  standalone: true,
  templateUrl: './pager.component.html',
  imports: [CommonModule],
})
export class Pager {
  constructor(private searchService: SearchService) {
    this.searchService.pageInfo$.subscribe((info: PageInfo) => {
      console.log(info);
    });
  }
  public pages: number[] = [];
}
