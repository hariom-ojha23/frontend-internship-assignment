import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { SearchResponse } from 'src/app/core/models/book-response.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private apiService: ApiService) {}

  searchBooks(searchText: string, pageNo: number): Observable<SearchResponse> {
    const limit = 10;
    const URL = `/search.json?q=${searchText
      .toLowerCase()
      .split(' ')
      .join('_')}&limit=${limit}&page=${pageNo}`;

    return this.apiService.get<SearchResponse>(URL)
  }
}
