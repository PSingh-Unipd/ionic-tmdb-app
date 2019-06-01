import { Component } from '@angular/core';
import { DetailService } from './services/detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage {

  id: String;
  type: String;
  loaded: boolean = false;
  constructor(
    private _service: DetailService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location) {
      
    this._service._id.subscribe(
      res => this.id = res
    );
    this._route.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation().extras.state) {
        this.id = this._router.getCurrentNavigation().extras.state.id;
      }
    });
    this._route.queryParams.subscribe(params => {
      if (this._router.getCurrentNavigation().extras.state) {
        this.type = this._router.getCurrentNavigation().extras.state.type;
      }
      this.loaded = true;
    });
  }

  close() {
    this._location.back();
  }
}
