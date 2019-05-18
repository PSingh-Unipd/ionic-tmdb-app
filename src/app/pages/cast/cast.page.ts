import { Component, OnInit, Input } from '@angular/core';
import { CastService } from './services/cast.service';
import { ModalController } from '@ionic/angular';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.page.html',
  styleUrls: ['./cast.page.scss'],
})
export class CastPage implements OnInit {

  @Input() castID;
  detail;
  movies;
  loaded: boolean = false;
  constructor(
    private service: CastService,
    private _controller: ModalController) { }

  ngOnInit() {

    const cast = this.service.getDetails(this.castID);
    const movies = this.service.getMovies(this.castID);

    forkJoin([cast, movies]).subscribe(results => {
      this.detail = results[0];
      this.movies = results[1];
      console.log('STAMPA DEI FILM', this.movies);
      if (this.detail.biography == '')
        this.detail.biography = 'Biography not found for this actor!';
      this.loaded = true;
    });
  }

  close() {
    this._controller.dismiss();
  }

  movieDetails(item) {
    this._controller.dismiss(item.id);
  }
}
