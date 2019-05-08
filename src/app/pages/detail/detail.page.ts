import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ActionSheetController, ToastController } from '@ionic/angular';
import { DetailService } from './services/detail.service';
import { forkJoin } from 'rxjs';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { Movie } from 'src/app/interfaces/movie.interface';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  @Input() movieId;
  detail;
  credits;
  videos;
  loaded: boolean = false;
  mwl: Movie[] = []; // My Watchlist -> Read from local storage all film in my list
  fml: Movie[] = [];
  constructor(
    private _controller: ModalController,
    private _service: DetailService,
    public _player: YoutubeVideoPlayer,
    private _storage: Storage,
    private actionSheetController: ActionSheetController,
    public toastController: ToastController) { }

  ngOnInit() {
    const movieDetailsCall = this._service.getDetails(this.movieId);
    const movieCreditsCall = this._service.getCredits(this.movieId);
    const movieVideosCall = this._service.getVideos(this.movieId);

    forkJoin([movieDetailsCall, movieCreditsCall, movieVideosCall]).subscribe(results => {
      this.detail = results[0];
      this.credits = results[1];
      this.videos = results[2];
      this.loaded = true;
    });

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
  }

  close() {
    this._controller.dismiss();
  }

  playTrailer() {
    this._player.openVideo(this.videos.results[0].key);
  }

  // Add movie to my mwl variabile in local storage
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

  // Add movie to my fml variabile in local storage
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
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  async addMyList() {
    const actionSheet = await this.actionSheetController.create({
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
}
