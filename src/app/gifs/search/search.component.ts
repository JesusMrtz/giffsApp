import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;


  get query(): string {
    return this.gifsService.query;
  }
  constructor(private gifsService: GifsService) {}

  search(): void {
    const value = this.searchInput.nativeElement.value.trim();

    if (value) {
      this.gifsService.searchGifs(value);
    }
  }
}
