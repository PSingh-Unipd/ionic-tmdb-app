import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoService } from './services/info.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  @Input() seasonInfo;
  params = '';
  season;
  loaded: boolean = false;
  constructor(
    private _service: InfoService,
    private _controller: ModalController
  ) { }

  ngOnInit() {
    this._service.getSeasonDetails(this.seasonInfo.seasonNumber, this.seasonInfo.showId).subscribe(
      response => {
        this.season = response;
        if(this.season.overview == '' || this.season.overview == undefined) {
          this.season.overview = 'Sorry we don\'t have any overview for this season, yet.';
        }
        this.loaded = true;
        console.log('Stampa response', response);
      }
    );
    console.log('stampa season', this.seasonInfo);
  }

  close() {
    this._controller.dismiss();
  }

}
