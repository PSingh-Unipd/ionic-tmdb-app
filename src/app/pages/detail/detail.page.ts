import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailService } from './services/detail.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  @Input() movieId;
  detail;
  credits;
  loaded:boolean = false;
  constructor(
    private _controller: ModalController,
    private _service: DetailService) { }

  ngOnInit() {
    const movieDetailsCall = this._service.getDetails(this.movieId);
    const movieCreditsCall = this._service.getCredits(this.movieId);
    const movieVideosCall = this._service.getVideos(this.movieId);

    forkJoin([movieDetailsCall, movieCreditsCall, movieVideosCall]).subscribe(results => {
      this.detail = results[0];
      this.credits = results[1];
      this.loaded = true;
    });
  }

  close() {
    this._controller.dismiss();
  }
}
