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
import { InfoPage } from 'src/app/pages/info/info.page';

@Component({
  selector: 'app-showdetails',
  templateUrl: './showdetails.component.html',
  styleUrls: ['../../detail.page.scss'],
})
export class ShowdetailsComponent implements OnInit {
  
  @Input() showID: string;
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
    private _location: Location,
    private _modal: ModalController) {
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
    const movieDetailsCall = this._service.getDetails(this.showID, 'tv');
    const movieCreditsCall = this._service.getCredits(this.showID, 'tv');
    const movieVideosCall = this._service.getVideos(this.showID, 'tv');
    const movieRecommendations = this._service.getRecommendations(this.showID, 'tv');

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
      title: this.detail.name,
      id: this.detail.id,
      poster: this.detail.poster_path ? this.detail.poster_path : null,
      date: new Date()
    };
    if (this.mwl.find(el => el.id == movie.id) == null) {
      this.mwl.unshift(movie);
      this._storage.set('mwl', this.mwl);
      this.presentToast('Show added to Watchlist!');
    } else {
      this.presentToast('Show already present in your Watchlist!');
    }
  }

  addFavoriteList(): void {
    const movie: Movie = {
      title: this.detail.name,
      id: this.detail.id,
      poster: this.detail.poster_path ? this.detail.poster_path : null,
      date: new Date()
    };
    if (this.fml.find(el => el.id == movie.id) == null) {
      this.fml.unshift(movie);
      this._storage.set('fml', this.fml);
      this.presentToast('Show added to favorites!');
    } else {
      this.presentToast('Show already present in your favorites!');
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
      header: this.detail.name.toUpperCase(),
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

  async showRec(item) {
    const temp: SubjectElement = {id: item.id, type: 'show'};
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

  async seasonDetail(item) {
    const modal = await this._modal.create({
      component: InfoPage,
      componentProps: { seasonInfo: item }
    });
    return await modal.present();
  }

  update(val: SubjectElement) {
    this._service.updateValue(val);
  }

}
