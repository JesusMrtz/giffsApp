import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  // tslint:disable-next-line:variable-name
  private _history: string [] = [];
  // tslint:disable-next-line:variable-name
  private _query = '';
  private URL = 'https://api.giphy.com/v1/gifs';
  private apiKey = 'THQWPo0XWLYOOtVJ2B1p5cxnMtU9NgsE';
  results: Gif[] = [];

  get history(): string[] {
    return this._history;
  }

  get query(): string {
    return this._query;
  }

  set query(value: string) {
    this._query = value;
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('gifs') || '[]');
    this.results = JSON.parse(localStorage.getItem('images') || '[]');
    this._query = localStorage.getItem('query') || '';
  }

  searchGifs(query: string): void {
    const existInArray = this._history.some((item) => item.toLowerCase() === query.toLowerCase());

    if (!existInArray && query) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);
      localStorage.setItem('gifs', JSON.stringify(this._history));
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('q', query)
    .set('limit', '10');

    this.http.get<SearchGifsResponse>(`${this.URL}/search`, { params })
    .subscribe((response) => {
      this.results = response.data;
      localStorage.setItem('images', JSON.stringify(this.results));
      localStorage.setItem('query', query);
    });
  }
}
