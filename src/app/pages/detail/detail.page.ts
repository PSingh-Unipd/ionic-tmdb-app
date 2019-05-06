import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailService } from './services/detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  @Input() movieId;
  detail;
  loaded:boolean = false;
  constructor(
    private _controller: ModalController,
    private _service: DetailService) { }

  ngOnInit() {
    console.log('Printing movie id', this.movieId);
    this._service.getDetails(this.movieId).subscribe(res => { 
      this.detail = res;
      this.loaded = true;
    });
    this._service.getVideos(this.movieId).subscribe(res => console.log(res));
  }

  close() {
    this._controller.dismiss();
  }
}
