import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ActionSheetController, ToastController, AlertController } from '@ionic/angular';
import { DetailService } from '../../services/detail.service';
import { forkJoin } from 'rxjs';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { Movie } from 'src/app/interfaces/movie.interface';
import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';
import { CastPage } from '../../../cast/cast.page';
import { SubjectElement } from 'src/app/interfaces/subject.interface';
import { LocalStorageService } from 'src/app/common/services/storage.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['../../detail.page.scss'],
})
export class MoviedetailsComponent implements OnInit {

  @Input() movieId: string;
  detail;
  credits;
  videos;
  movieRecommendations;
  loaded: boolean = false;
  mwl: Movie[] = [];
  constructor(
    public alertController: AlertController,
    private _service: DetailService,
    public _player: YoutubeVideoPlayer,
    private _storage: LocalStorageService,
    private _actionSheetController: ActionSheetController,
    public _toastController: ToastController,
    private _modal: ModalController) {
  }

  ngOnInit() {
    this._storage._oservables.movies.subscribe(
      data => this.mwl = data
    );
    this.loadData();
  }

  loadData() {
    const movieDetailsCall = this._service.getDetails(this.movieId, 'movie');
    const movieCreditsCall = this._service.getCredits(this.movieId, 'movie');
    const movieVideosCall = this._service.getVideos(this.movieId, 'movie');
    const movieRecommendations = this._service.getRecommendations(this.movieId, 'movie');

    forkJoin([movieDetailsCall, movieCreditsCall, movieVideosCall, movieRecommendations]).subscribe(results => {
      this.detail = results[0];
      this.credits = results[1];
      this.videos = results[2];
      this.movieRecommendations = results[3].results;
      this.loaded = true;
      console.log('STAMPA FILM', results);
    });
  }

  playTrailer() {
    this._player.openVideo(this.videos.results[0].key);
  }

  addMyWatchList(): void {
    const movie: Movie = {
      title: this.detail.title,
      id: this.detail.id,
      poster: this.detail.poster_path ? this.detail.poster_path : null,
      date: new Date()
    };
    if (this.mwl.find(el => el.id == movie.id) == null) {
      this.mwl.unshift(movie);
      this._storage.updateMoviesWL(this.mwl);
      this.presentToast('Movie added to your Watchlist!');
    } else {
      this.presentToast('Movie already present in your Watchlist!');
    }
  }

  async presentToast(message: string) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async addMyList() {
    const actionSheet = await this._actionSheetController.create({
      header: this.detail.title.toUpperCase(),
      buttons: [
        {
          text: 'Watchlist',
          icon: 'add-circle',
          handler: () => {
            this.addMyWatchList();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  async movieRec(item) {
    const temp: SubjectElement = {id: item.id, type: 'movie'};
    this.update(temp);
  }

  async castDetail(item) {
    const modal = await this._modal.create({
      component: CastPage,
      componentProps: { castID: item.id }
    });

    modal.onDidDismiss()
      .then((res) => {
        if (res.data != undefined) {
          this.update(res.data);
        }
      });

    return await modal.present();
  }

  update(movie: SubjectElement) {
    this._service.updateValue(movie);
  }

}
