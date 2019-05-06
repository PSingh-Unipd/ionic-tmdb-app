import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Movie } from 'src/app/interfaces/Movie.interface';
import { ModalController } from '@ionic/angular';
import { DetailPage } from '../detail/detail.page';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  mwl: Movie[] = [];
  constructor(private storage: Storage,
    private _modal: ModalController) { }
  
  ngOnInit() {
    this.storage.get('mwl').then((elements) => {
      console.log(elements? elements: 'not found');
      if(elements) {
        this.mwl = elements;
      }
    })
  }

  async movieDetails(item: Movie) {
    const modal = await this._modal.create({
      component: DetailPage,
      componentProps: {movieId : item.id}
    });
    return await modal.present();
  }

}
