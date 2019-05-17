import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime } from 'rxjs/operators';
import { ExploreService } from './services/explore.service';
import { Storage } from '@ionic/storage';
import { Movie } from 'src/app/interfaces/movie.interface';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DetailPage } from '../detail/detail.page';
import { NavigationExtras, Router } from '@angular/router';

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
  fml: Movie[] = [];
  queryField: FormControl = new FormControl();
  constructor(
    private router: Router,
    private _service: ExploreService,
    private _storage: Storage,
    private actionSheetController: ActionSheetController,
    private _modal: ModalController,
    public toastController: ToastController) { }

  ngOnInit(): void {
    this._storage.get('mwl').then((elements) => {
      if (elements) {
        this.mwl = elements;
      }
    });

    this._storage.get('fml').then((elements) => {
      if (elements) {
        this.fml = elements;
      }
    });

    this._service.getMovies().subscribe(
      data => {
        this.results = data.results;
      }
    );

    this._service.getTopRated().subscribe(
      response => {
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
    });
  }

  // Add movie to my mwl variabile in local storage
  addMyWatchList(item): void {
    const movie: Movie = {
      title: item.title,
      id: item.id,
      poster: item.poster_path ? item.poster_path : null,
      date: new Date()
    };
    if (this.mwl.find(el => el.id == movie.id) == null) {
      console.log('Stampo la lista per primo', this.mwl);
      this.mwl.unshift(movie);
      this._storage.set('mwl', this.mwl);
      this.presentToast('Movie added to Watchlist!');
    } else {
      this.presentToast('Movie already present in your Watchlist!');
    }
  }

  // Add movie to my fml variabile in local storage
  addFavoriteList(item): void {
    const movie: Movie = {
      title: item.title,
      id: item.id,
      poster: item.poster_path ? item.poster_path : null,
      date: new Date()
    };
    if (this.fml.find(el => el.id == movie.id) == null) {
      this.fml.unshift(movie);
      this._storage.set('fml', this.fml);
      this.presentToast('Movie added to favorites!');
    } else {
      this.presentToast('Movie already present in your favorites!');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present().then(res => console.log(res));
  }

  async addMyList(item) {
    const actionSheet = await this.actionSheetController.create({
      header: item.title.toUpperCase(),
      buttons: [
        {
          text: 'Movie details',
          icon: 'information-circle',
          handler: () => {
            this.movieDetails(item);
          }
        }, {
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
            this.addFavoriteList(item);
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
    /*
    const modal = await this._modal.create({
      component: DetailPage,
      componentProps: { movieId: item.id }
    });
    return await modal.present();*/
    let navigationExtras: NavigationExtras = {
      state: {
        user: item.id
      }
    };
    this.router.navigate(['/menu/details'], navigationExtras);
  }

  onClickedOutside(event) {
    this.searchResults = null;
  }
}
