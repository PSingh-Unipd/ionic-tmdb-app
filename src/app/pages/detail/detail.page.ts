import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailService } from './services/detail.service';
import { forkJoin } from 'rxjs';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

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
  loaded:boolean = false;
  constructor(
    private _controller: ModalController,
    private _service: DetailService,
    public _player: YoutubeVideoPlayer) { }

  ngOnInit() {
    const movieDetailsCall = this._service.getDetails(this.movieId);
    const movieCreditsCall = this._service.getCredits(this.movieId);
    const movieVideosCall = this._service.getVideos(this.movieId);

    forkJoin([movieDetailsCall, movieCreditsCall, movieVideosCall]).subscribe(results => {
      this.detail = results[0];
      this.credits = results[1];
      this.videos = results[2];
      console.log('Stampa dei details', this.detail);
      this.loaded = true;
      
    });
  }

  close() {
    this._controller.dismiss();
  }

  playTrailer() {
    this._player.openVideo(this.videos.results[0].key);
  }
}
