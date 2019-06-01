import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Movie } from 'src/app/interfaces/Movie.interface';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  filterVal: FormControl = new FormControl();
  mwl: Movie[] = [];
  fml: Movie[] = [];
  loaded: boolean = false;
  filteredItems: any;

  constructor(
    private router: Router,
    private storage: Storage,
    public toastController: ToastController) { }

  ngOnInit() {
    this.filterVal.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(val => {
      console.log('STAMPA VAL', val);
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
        id: item.id
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
    const toast = await this.toastController.create({
      message: message,
      duration: 4000
    });
    toast.present().then();
  }

  removeFromList(index: number) {
    this.loaded = false;
    this.mwl.splice(index, 1);
    this.storage.set('mwl', this.mwl);
    this.presentToast('Movie removed from Watchlist!');
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
