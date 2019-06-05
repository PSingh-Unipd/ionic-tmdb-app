import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Movie } from 'src/app/interfaces/Movie.interface';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['../../list.page.scss'],
})
export class MoviesPage implements OnInit {

  filterVal: FormControl = new FormControl();
  mwl: Movie[] = [];
  fml: Movie[] = [];
  loaded: boolean = false;
  filteredItems: any;

  constructor(
    private router: Router,
    private storage: Storage,
    public alertController: AlertController) { }

  ngOnInit() {
    this.filterVal.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(val => {
      this.filterItem(val);
    });

    this.storage.get('mwl').then((elements) => {
      if (elements) {
        this.mwl = elements;
        this.loaded = true;
        this.assignCopy();
      }
    });

    this.storage.get('fml').then((elements) => {
      if (elements) {
        this.fml = elements;
      }
    });
  }

  async movieDetails(item: Movie) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: item.id,
        type: 'movie'
      }
    };
    this.router.navigate(['/menu/details'], navigationExtras);
  }

  reorderItems(event) {
    const temp = this.mwl.splice(event.detail.from, 1)[0];
    this.mwl.splice(event.detail.to, 0, temp);
    event.detail.complete();
    this.storage.set('mwl', this.mwl);
    this.assignCopy();
  }

  reset(event) {
    this.assignCopy();
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

  async presentToast(message: string) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  removeFromList(index: number) {
    this.loaded = false;
    this.mwl.splice(index, 1);
    this.storage.set('mwl', this.mwl);
    this.presentToast('Movie removed from your Watchlist!');
    this.assignCopy();
    this.loaded = true;
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.mwl);
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.mwl).filter(
      item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }
}
