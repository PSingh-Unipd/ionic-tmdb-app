import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ActionSheetController, ToastController, AlertController } from '@ionic/angular';
import { DetailService } from '../../services/detail.service';
import { forkJoin } from 'rxjs';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { Movie } from 'src/app/interfaces/movie.interface';
import { CastPage } from '../../../cast/cast.page';
import { SubjectElement } from 'src/app/interfaces/subject.interface';
import { InfoPage } from 'src/app/pages/info/info.page';
import { LocalStorageService } from 'src/app/common/services/storage.service';

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
  tvwl: Movie[] = [];
  cbluray: Movie[] = [];
  cdvd: Movie[] = [];
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
    this._storage._oservables.tv.subscribe(
      val => this.tvwl = val
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
    if (this.tvwl.find(el => el.id == movie.id) == null) {
      this.tvwl.unshift(movie);
      this._storage.updateTvSeriesWL(this.tvwl);
      this.presentToast('Show added to Watchlist!');
    } else {
      this.presentToast('Show already present in your Watchlist!');
    }
  }

  addBlurayCollection(item): void {
    const movie: Movie = {
      title: item.name,
      id: item.id,
      poster: item.poster_path ? item.poster_path : null,
      date: new Date(),
      type: 'show'
    };
    if (this.cbluray.find(el => el.id == movie.id) == null) {
      this.cbluray.unshift(movie);
      this._storage.updateCbluray(this.cbluray);
      this.presentToast('Show added to you Bluray collection!');
    } else {
      this.presentToast('Show already present in your Bluray collection!');
    }
  }

  addDvdCollection(item): void {
    const movie: Movie = {
      title: item.name,
      id: item.id,
      poster: item.poster_path ? item.poster_path : null,
      date: new Date(),
      type: 'show'
    };
    if (this.cdvd.find(el => el.id == movie.id) == null) {
      this.cdvd.unshift(movie);
      this._storage.updateCdvd(this.cdvd);
      this.presentToast('Show added to you DVD collection!');
    } else {
      this.presentToast('Show already present in your DVD collection!');
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

  async showRec(item) {
    const temp: SubjectElement = { id: item.id, type: 'show' };
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
