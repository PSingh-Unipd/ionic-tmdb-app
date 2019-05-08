import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime } from 'rxjs/operators';
import { ExploreService } from './services/explore.service';
import { Storage } from '@ionic/storage';
import { Movie } from 'src/app/interfaces/movie.interface';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DetailPage } from '../detail/detail.page';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  results: any[];
  searchResults: any[];
  trendings: any[];
  mwl: Movie[] = []; // My Watchlist -> Read from local storage all film in my list
  queryField: FormControl = new FormControl();
  constructor(
    private _service: ExploreService,
    private _storage: Storage,
    private actionSheetController: ActionSheetController,
    private _modal: ModalController,
    public toastController: ToastController) { }

  ngOnInit(): void {
    this._storage.get('mwl').then((elements) => {
      console.log(elements);
      if (elements) {
        this.mwl = elements;
      }
    })

    this._service.getMovies().subscribe(
      data => {
        this.results = data.results;
      }
    );

    this._service.getTopRated().subscribe(
      response => {
        console.log('Stampa del trandin reponse', response);
        this.trendings = response.results;
      }
    );
    this.queryField.valueChanges.pipe(
      debounceTime(1500),
      switchMap(
        queryField => this._service.search(queryField)
      )
    ).subscribe(response => {
      this.searchResults = response.results;
      console.log(this.searchResults);
    });
  }

  // Add movie to my mwl variabile in local storage
  addMyWatchList(item): void {
    const movie: Movie = { title: item.title, id: item.id, poster: item.poster_path ? item.poster_path : null };
    if (this.mwl.find(el => el.id == movie.id) == null) {
      console.log('Stampo la lista per primo', this.mwl);
      this.mwl.push(movie);
      this._storage.set('mwl', this.mwl);
      this.presentToast('Movie added to Watchlist!');
    } else {
      this.presentToast('Movie already present in your Watchlist!');
    }
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  async addMyList(item) {
    console.log('Stampa del item', item);
    const actionSheet = await this.actionSheetController.create({
      header: item.title.toUpperCase(),
      buttons: [
        {
          text: 'Movie details',
          icon: 'information-circle',
          handler: () => {
            this.movieDetails(item);
          }
        },{
          text: 'Watchlist',
          icon: 'add-circle',
          handler: () => {
            this.addMyWatchList(item);
          }
        },
         {
          text: 'Favorite Movie',
          icon: 'heart',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  async movieDetails(item: Movie) {
    const modal = await this._modal.create({
      component: DetailPage,
      componentProps: {movieId : item.id}
    });
    return await modal.present();
  }

  onClickedOutside(e){
    console.log(e);
    if(e.path[0] != 'span.action-sheet-button-inner.sc-ion-action-sheet-md') {
      this.searchResults = null;
    }
  }
}
