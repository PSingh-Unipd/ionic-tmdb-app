import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Movie } from 'src/app/interfaces/Movie.interface';
import { ModalController, ToastController } from '@ionic/angular';
import { DetailPage } from '../detail/detail.page';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  mwl: Movie[] = [];
  fml: Movie[] = [];
  loaded: boolean = false;

  constructor(private storage: Storage,
    private _modal: ModalController,
    public toastController: ToastController) { }

  ngOnInit() {
    this.storage.get('mwl').then((elements) => {
      if (elements) {
        this.mwl = elements;
        this.loaded = true;
      }
    });
    this.storage.get('fml').then((elements) => {
      if (elements) {
        this.fml = elements;
      }
    });
  }

  async movieDetails(item: Movie) {
    const modal = await this._modal.create({
      component: DetailPage,
      componentProps: { movieId: item.id }
    });
    return await modal.present();
  }

  reorderItems(event) {
    const temp = this.mwl.splice(event.detail.from, 1)[0];
    this.mwl.splice(event.detail.to, 0, temp);
    event.detail.complete();
    this.storage.set('mwl', this.mwl);
  }

  addFavorite(item: Movie) {
     if (this.fml.find(el => el.id == item.id) == null) {
      this.fml.unshift(item);
      this.storage.set('fml', this.fml);
      this.presentToast('Movie added to favorite!');
    } else {
      this.presentToast('Movie already present in your favorites!');
    }
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000
    });
    toast.present().then();
  }

  removeFromList(index : number) {
    this.loaded = false;
    this.mwl.splice(index, 1);
    this.storage.set('mwl', this.mwl);
    this.presentToast('Movie removed from Watchlist!');
    this.loaded = true;
  }
}
