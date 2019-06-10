import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime } from 'rxjs/operators';
import { ExploreService } from './services/explore.service';
import { Movie } from 'src/app/interfaces/movie.interface';
import { ActionSheetController, IonInfiniteScroll, AlertController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/common/services/storage.service';


@Component({
  selector: 'app-movies',
  templateUrl: './exploremovies.page.html',
  styleUrls: ['../../explore.page.scss'],
})
export class ExploreMoviesPage implements OnInit {

  results: any[] = [];
  searchResults: any[];
  loaded: boolean = false;
  trendings: any[];
  copy: any[];
  mwl: Movie[] = [];
  cbluray: Movie[] = [];
  cdvd: Movie[] = [];
  moviesGeneres: any[];
  queryField: FormControl = new FormControl();

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private _router: Router,
    private _service: ExploreService,
    private _storage: LocalStorageService,
    private _actionSheetController: ActionSheetController,
    public _alertController: AlertController) { }

  ngOnInit(): void {

    this._storage._oservables.movies.subscribe(
      data => this.mwl = data
    );

    this._storage._oservables.cbluray.subscribe(
      data => this.cbluray = data
    );

    this._storage._oservables.cdvd.subscribe(
      data => this.cdvd = data
    );

   /* this._storage.get('fml').then((elements) => {
      if (elements) {
        this.fml = elements;
      }
    });*/

    this.queryField.valueChanges.pipe(
      debounceTime(1000),
      switchMap(
        queryField => this._service.search(queryField.length > 2 ? queryField : '%%')
      )
    ).subscribe(response => {
      this.searchResults = response.results;
    });

    this.loadMovies('now_playing');
  }

  loadMovies(type: string) {
    this.loaded = false;
    this.results = [];
    this.infiniteScroll.disabled = false;
    this._service.getMovies(type).subscribe(
      response => {
        this.copy = response.results;
        this.shallowCopy();
        setTimeout(() => this.loaded = true, 500);
      }
    );
  }

  loadMoviesList(id: string) {
    this.loaded = false;
    this.results = [];
    this.infiniteScroll.disabled = false;
    this._service.getList(id).subscribe(
      response => {
        this.copy = response.items;
        this.shallowCopy();
        setTimeout(() => this.loaded = true, 500);
      }
    );
  }

  shallowCopy() {
    if (this.copy.length > this.results.length && this.copy.length > 10) {
      const temp = this.copy.slice(0, 10);
      temp.filter(el => this.results.push(el));
      this.copy.splice(0, 10);
    }
    else {
      this.copy.filter(el => this.results.push(el));
      this.copy = [];
    }
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
      this.mwl.unshift(movie);
      this._storage.updateMoviesWL(this.mwl);
      this.presentToast('Movie added to Watchlist!');
    } else {
      this.presentToast('Movie already present in your Watchlist!');
    }
  }

  // Add movie to my fml variabile in local storage
  addBlurayCollection(item): void {
    const movie: Movie = {
      title: item.title,
      id: item.id,
      poster: item.poster_path ? item.poster_path : null,
      date: new Date(),
      type: 'movie'
    };
    if (this.cbluray.find(el => el.id == movie.id) == null) {
      this.cbluray.unshift(movie);
      this._storage.updateCbluray(this.cbluray);
      this.presentToast('Movie added to your Bluray collection!');
    } else {
      this.presentToast('Movie already present in your Bluray collection!');
    }
  }

  // Add movie to my fml variabile in local storage
  addDvdCollection(item): void {
    const movie: Movie = {
      title: item.title,
      id: item.id,
      poster: item.poster_path ? item.poster_path : null,
      date: new Date(),
      type: 'movie'
    };
    if (this.cdvd.find(el => el.id == movie.id) == null) {
      this.cdvd.unshift(movie);
      this._storage.updateCdvd(this.cdvd);
      this.presentToast('Movie added to your DVD collection!');
    } else {
      this.presentToast('Movie already present in your DVD collection!');
    }
  }

  async presentToast(message: string) {
    const alert = await this._alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async addMyList(item) {
    const actionSheet = await this._actionSheetController.create({
      header: item.title.toUpperCase(),
      buttons: [
        {
          text: 'Movie details',
          icon: 'information-circle',
          handler: () => {
            this.movieDetails(item);
          }
        }, {
          text: 'Add to my Watchlist',
          icon: 'add-circle',
          handler: () => {
            this.addMyWatchList(item);
          }
        },
        {
          text: 'Add to DVD collection',
          icon: 'add-circle',
          handler: () => {
            this.addDvdCollection(item);
          }
        },
        {
          text: 'Add to Bluray collection',
          icon: 'add-circle',
          handler: () => {
            this.addBlurayCollection(item);
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

  movieDetails(item: Movie) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: item.id,
        type: 'movie'
      }
    };
    this._router.navigate(['/menu/details'], navigationExtras);
  }

  onClickedOutside(event) {
    this.searchResults = null;
  }

  reset(event) {
    this.searchResults = null;
  }

  async loadList() {
    const actionSheet = await this._actionSheetController.create({
      header: 'Some top lists:',
      buttons: [
        {
          text: 'Now Showing',
          icon: 'film',
          handler: () => {
            this.loadMovies('now_playing');
          }
        },
        {
          text: 'Top Rated',
          icon: 'film',
          handler: () => {
            this.loadMovies('top_rated');
          }
        },
        {
          text: 'IMDB Top 250',
          icon: 'film',
          handler: () => {
            this.loadMoviesList('1309');
          }
        },
        {
          text: 'Oscar Winner',
          icon: 'film',
          handler: () => {
            this.loadMoviesList('28');
          }
        },
        {
          text: 'Marvel Universe',
          icon: 'film',
          handler: () => {
            this.loadMoviesList('1');
          }
        },
        {
          text: 'DC Universe',
          icon: 'film',
          handler: () => {
            this.loadMoviesList('3');
          }
        },
        {
          text: 'Disney Classics',
          icon: 'film',
          handler: () => {
            this.loadMoviesList('338');
          }
        },
        {
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

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      if (this.copy.length == 0) {
        event.target.disabled = true;
      } else {
        this.shallowCopy();
      }
    }, 500);
  }
}
