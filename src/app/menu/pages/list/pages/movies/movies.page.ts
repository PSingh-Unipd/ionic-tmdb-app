import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/Movie.interface';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/common/services/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['../../list.page.scss'],
})
export class MoviesPage implements OnInit {

  filterVal: FormControl = new FormControl();
  mwl: Movie[] = [];
  loaded: boolean = false;
  filteredItems: any;
  params = '';

  constructor(
    private _router: Router,
    private _storage: LocalStorageService,
    public _alertController: AlertController) { 
      this._storage._oservables.moviesLoading.subscribe(value =>
        this.loaded = value
      );
    }

  ngOnInit() {
    this.filterVal.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(val => {
      this.filterItem(val);
    });

    this._storage._oservables.movies.subscribe(data => {
      this.mwl = data;
      this.assignCopy();
    });
  }

  async movieDetails(item: Movie) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: item.id,
        type: 'movie'
      }
    };
    this._router.navigate(['/menu/details'], navigationExtras);
  }

  reorderItems(event) {
    const temp = this.mwl.splice(event.detail.from, 1)[0];
    this.mwl.splice(event.detail.to, 0, temp);
    event.detail.complete();
    this._storage.updateMoviesWL(this.mwl);
    this.assignCopy();
  }

  reset(event) {
    this.assignCopy();
  }

  async presentToast(message: string) {
    const alert = await this._alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  removeFromList(index: number) {
    this.loaded = false;
    this.mwl.splice(index, 1);
    this._storage.updateMoviesWL(this.mwl);
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
