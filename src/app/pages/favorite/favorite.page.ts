import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Movie } from 'src/app/interfaces/movie.interface';
import { DetailPage } from '../detail/detail.page';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  fml: Movie[] = [];
  loaded: boolean = false;
  constructor(private storage: Storage,
    private _modal: ModalController,
    public toastController: ToastController) { }

  ngOnInit() {
    this.storage.get('fml').then((elements) => {
      if (elements) {
        this.fml = elements;
        this.loaded = true;
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
    const temp = this.fml.splice(event.detail.from, 1)[0];
    this.fml.splice(event.detail.to, 0, temp);
    event.detail.complete();
    this.storage.set('fml', this.fml);
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000
    });
    toast.present().then(res => console.log(res));
  }

  removeFromList(index : number) {
    this.loaded = false;
    this.fml.splice(index, 1);
    this.storage.set('fml', this.fml);
    this.presentToast('Movie removed from favorites!');
    this.loaded = true;
  }

}
