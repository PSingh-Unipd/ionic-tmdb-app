import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ActionSheetController, ToastController } from '@ionic/angular';
import { DetailService } from './services/detail.service';
import { forkJoin } from 'rxjs';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { Movie } from 'src/app/interfaces/movie.interface';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {Location} from '@angular/common';

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
    private _controller: ModalController,
    private _service: DetailService,
    public _player: YoutubeVideoPlayer,
    private _storage: Storage,
    private _actionSheetController: ActionSheetController,
    public _toastController: ToastController,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location) { 
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
    const toast = await this._toastController.create({
      message: message,
      duration: 3000
    });
    toast.present().then();
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
    console.log('stampa del item', item);
    const actionSheet = await this._actionSheetController.create({
      header: this.detail.title.toUpperCase(),
      buttons: [
        {
          text: 'Movie details',
          icon: 'information-circle',
          handler: () => {
            this.movieDetails(item.id);
          }
        },
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

  async movieDetails(movieID) {
    this._service.dataSource.next(movieID);
    this.loaded = false;
    this.loadData();
  }

  castDetail(item) {
    console.log('Cast details function', item);
  }
}
