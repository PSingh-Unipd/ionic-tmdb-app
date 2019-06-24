import { Component, OnInit, Input } from '@angular/core';
import { CastService } from './providers/cast.service';
import { ModalController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { SubjectElement } from 'src/app/interfaces/subject.interface';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.page.html',
  styleUrls: ['./cast.page.scss'],
})
export class CastPage implements OnInit {

  @Input() castID;
  detail;
  movies;
  shows;
  loaded: boolean = false;
  constructor(
    private service: CastService,
    private _controller: ModalController) { }

  ngOnInit() {
    const cast = this.service.getDetails(this.castID);
    const movies = this.service.getMovies(this.castID);
    const shows = this.service.getShows(this.castID);

    forkJoin([cast, movies, shows]).subscribe(results => {
      this.detail = results[0];
      this.movies = results[1];
      this.shows = results[2];
      if (this.detail.biography == '')
        this.detail.biography = 'Biography not found for this person!';
      this.loaded = true;
    });
  }

  close() {
    this._controller.dismiss();
  }

  movieDetails(item) {
    const temp: SubjectElement = {id: item.id, type: 'movie'};
    this._controller.dismiss(temp);
  }

  showDetails(item) {
    const temp: SubjectElement = {id: item.id, type: 'show'};
    this._controller.dismiss(temp);
  }
}
