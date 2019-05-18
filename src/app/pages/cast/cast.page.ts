import { Component, OnInit, Input } from '@angular/core';
import { CastService } from './services/cast.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.page.html',
  styleUrls: ['./cast.page.scss'],
})
export class CastPage implements OnInit {

  @Input() castID;
  detail;
  loaded: boolean = false;
  constructor(
    private service: CastService,
    private _controller: ModalController) { }

  ngOnInit() {
    this.service.getDetails(this.castID).subscribe(
      res => {
        this.detail = res;
        console.log('Stampa det', this.detail);
        if (this.detail.biography == '')
          this.detail.biography = 'Biography not found for this person!';
        this.loaded = true;
      });
  }

  close() {
    this._controller.dismiss();
  }
}
