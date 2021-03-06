import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  get history(): string[]{
    return this.gifsService.history;
  }
  constructor(private gifsService: GifsService) { }

  searchGif(item: string): void {
    this.gifsService.searchGifs(item);
    this.gifsService.query = item;
  }
}
