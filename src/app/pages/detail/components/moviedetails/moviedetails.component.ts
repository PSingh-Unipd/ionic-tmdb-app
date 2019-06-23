import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ActionSheetController, ToastController, AlertController } from '@ionic/angular';
import { DetailService } from '../../providers/detail.service';
import { forkJoin } from 'rxjs';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { StorageItem } from 'src/app/interfaces/storage-item.interface';
import { CastPage } from '../../../cast/cast.page';
import { SubjectElement } from 'src/app/interfaces/subject.interface';
import { LocalStorageService } from 'src/app/common/providers/storage.service';

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
  mwl: StorageItem[] = [];
  cbluray: StorageItem[] = [];
  cdvd: StorageItem[] = [];
  params = '';
  
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
    this._storage._oservables.cbluray.subscribe(
      data => this.cbluray = data
    );

    this._storage._oservables.cdvd.subscribe(
      data => this.cdvd = data
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
    });
  }

  playTrailer() {
    this._player.openVideo(this.videos.results[0].key);
  }

  addMyWatchList(): void {
    const movie: StorageItem = {
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

  // Add movie to my fml variabile in local storage
  addBlurayCollection(item): void {
    const movie: StorageItem = {
      title: item.title,
      id: item.id,
      poster: item.poster_path ? item.poster_path : null,
      date: new Date(),
      type: 'movie'
    };
    if (this.cbluray.find(el => el.id == movie.id) == null) {
      this.cbluray.unshift(movie);
      this._storage.updateCbluray(this.cbluray);
      this.presentToast('Movie added to you Bluray collection!');
    } else {
      this.presentToast('Movie already present in your Bluray collection!');
    }
  }

  // Add movie to my fml variabile in local storage
  addDvdCollection(item): void {
    const movie: StorageItem = {
      title: item.title,
      id: item.id,
      poster: item.poster_path ? item.poster_path : null,
      date: new Date(),
      type: 'movie'
    };
    if (this.cdvd.find(el => el.id == movie.id) == null) {
      this.cdvd.unshift(movie);
      this._storage.updateCdvd(this.cdvd);
      this.presentToast('Movie added to you DVD collection!');
    } else {
      this.presentToast('Movie already present in your DVD collection!');
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
          text: 'Add to Watchlist',
          icon: 'add-circle',
          handler: () => {
            this.addMyWatchList();
          }
        },
        {
          text: 'Add to DVD collection',
          icon: 'add-circle',
          handler: () => {
            this.addDvdCollection(this.detail);
          }
        },
        {
          text: 'Add to Bluray collection',
          icon: 'add-circle',
          handler: () => {
            this.addBlurayCollection(this.detail);
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
