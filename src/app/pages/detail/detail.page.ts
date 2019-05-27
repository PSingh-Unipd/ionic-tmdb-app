import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, ToastController, AlertController } from '@ionic/angular';
import { DetailService } from './services/detail.service';
import { forkJoin } from 'rxjs';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { Movie } from 'src/app/interfaces/movie.interface';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { CastPage } from '../cast/cast.page';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  movieId;
  detail;
  credits;
  videos;
  movieRecommendations;
  loaded: boolean = false;
  mwl: Movie[] = [];
  fml: Movie[] = [];
  constructor(
    public alertController: AlertController,
    private _service: DetailService,
    public _player: YoutubeVideoPlayer,
    private _storage: Storage,
    private _actionSheetController: ActionSheetController,
    public _toastController: ToastController,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _modal: ModalController) {
    this._service._id.subscribe(
      res => this.movieId = res
    );
    this._route.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation().extras.state) {
        this.movieId = this._router.getCurrentNavigation().extras.state.id;
      }
    });
  }

  ngOnInit() {

    this._storage.get('mwl').then((elements) => {
      if (elements) {
        this.mwl = elements;
      }
    });

    this._storage.get('fml').then((elements) => {
      if (elements) {
        this.fml = elements;
      }
    });

    this.loadData();
  }

  loadData() {
    const movieDetailsCall = this._service.getDetails(this.movieId);
    const movieCreditsCall = this._service.getCredits(this.movieId);
    const movieVideosCall = this._service.getVideos(this.movieId);
    const movieRecommendations = this._service.getRecommendations(this.movieId);

    forkJoin([movieDetailsCall, movieCreditsCall, movieVideosCall, movieRecommendations]).subscribe(results => {
      this.detail = results[0];
      this.credits = results[1];
      this.videos = results[2];
      this.movieRecommendations = results[3].results;
      this.loaded = true;
    });
  }

  close() {
    this._location.back();
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
      this._storage.set('mwl', this.mwl);
      this.presentToast('Movie added to Watchlist!');
    } else {
      this.presentToast('Movie already present in your Watchlist!');
    }
  }

  addFavoriteList(): void {
    const movie: Movie = {
      title: this.detail.title,
      id: this.detail.id,
      poster: this.detail.poster_path ? this.detail.poster_path : null,
      date: new Date()
    };
    if (this.fml.find(el => el.id == movie.id) == null) {
      this.fml.unshift(movie);
      this._storage.set('fml', this.fml);
      this.presentToast('Movie added to favorites!');
    } else {
      this.presentToast('Movie already present in your favorites!');
    }
  }

  async presentToast(message: string) {
    const alert = await this.alertController.create({
      message:  message,
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
          text: 'Favorite Movie',
          icon: 'heart',
          handler: () => {
            this.addFavoriteList();
          }
        }, {
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
    this.update(item.id);
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

  update(id) {
    this._service.dataSource.next(id);
    this.loaded = false;
    this.loadData();
  }
}
