import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchResponse } from 'src/app/core/models/book-response.model';
import { SearchService } from 'src/app/core/services/search.service';
import { Book } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;

  searchBooksList: Book[] = [];
  isLoading = false;
  noResult = false;
  showResult = false;

  numFound = 0;
  total = 0;
  pageNumber = 1;
  start = 1;

  constructor(private searchService: SearchService) {
    this.bookSearch = new FormControl('');
  }

  trendingSubjects: Array<any> = [];
  recentSearches: Array<string> = [];
  popularSearches: Array<string> = [
    'Python',
    'React',
    'Angular',
    'React Native',
    'Kotlin',
  ];

  ngOnInit(): void {
    this.trendingSubjects = [
      { name: 'JavaScript' },
      { name: 'CSS' },
      { name: 'HTML' },
      { name: 'Harry Potter' },
      { name: 'Crypto' },
    ];

    this.fetchRecentSearches();
  }

  clearSearchText() {
    this.bookSearch.patchValue('');
    this.reset();
    this.fetchRecentSearches();
  }

  searchBook() {
    const value = this.bookSearch.value;
    this.reset();

    this.setRecentSearches(value);
    this.isLoading = true;

    this.searchService
      .searchBooks(value, this.pageNumber)
      .subscribe((res: SearchResponse) => {
        this.searchBooksList = res?.docs;
        this.numFound = res?.numFound;

        this.total =
          this.numFound % 10 === 0
            ? this.numFound / 10
            : Math.floor(this.numFound / 10) + 1;
        this.isLoading = false;

        if (this.searchBooksList.length === 0) {
          this.noResult = true;
        }
        this.showResult = true;
      });
  }

  selectPage($value: number) {
    this.pageNumber = $value;
    this.searchBook();
  }

  setStart($value: number) {
    this.start = $value;
  }

  reset() {
    this.searchBooksList = [];
    this.noResult = false;
    this.showResult = false;
  }

  onClickChips($value: string) {
    this.bookSearch.patchValue($value);
    this.searchBook();
  }

  fetchRecentSearches() {
    this.recentSearches = JSON.parse(localStorage.getItem('recent') || '[]');
  }

  setRecentSearches(value: string) {
    if (!this.recentSearches.includes(value)) {
      localStorage.setItem(
        'recent',
        JSON.stringify([...this.recentSearches, value])
      );
    }
  }
}
