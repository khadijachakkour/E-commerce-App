import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchQuerySubject: BehaviorSubject<{ query: string, category: string }> = new BehaviorSubject<{ query: string, category: string }>({ query: '', category: '' });
  public searchQuery$: Observable<{ query: string, category: string }> = this.searchQuerySubject.asObservable();

  constructor() { }

  setSearchQuery(query: string, category: string): void {
    this.searchQuerySubject.next({ query, category });
  }

}
