import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime } from 'rxjs/operators';
import { ExploreTvService } from './services/exploretv.service';
import { Movie } from 'src/app/interfaces/movie.interface';
import { ActionSheetController, IonInfiniteScroll, AlertController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/common/services/storage.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.page.html',
  styleUrls: ['../../explore.page.scss'],
})
export class TvPage implements OnInit {

  results: any[] = [];
  params = '';
  searchResults: any[];
  loaded: boolean = false;
  trendings: any[];
  copy: any[];
  tvwl: Movie[] = []; 
  cbluray: Movie[] = [];
  cdvd: Movie[] = [];
  moviesGeneres: any[];
  queryField: FormControl = new FormControl();

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private router: Router,
    private _service: ExploreTvService,
    private actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public _storage: LocalStorageService) { }

  ngOnInit(): void {

    this._storage._oservables.tv.subscribe(
      val => this.tvwl = val
    );

    this._storage._oservables.cbluray.subscribe(
      data => this.cbluray = data
    );

    this._storage._oservables.cdvd.subscribe(
      data => this.cdvd = data
    );

    this.queryField.valueChanges.pipe(
      debounceTime(1000),
      switchMap(
        queryField => this._service.search(queryField.length > 2 ? queryField : '%%')
      )
    ).subscribe(response => {
      this.searchResults = response.results;
    });

    this.loadTVSeries('on_the_air');
  }

  loadTVSeries(type: string) {
    this.loaded = false;
    this.results = [];
    this.infiniteScroll.disabled = false;
    this._service.getTvSeries(type).subscribe(
      response => {
        this.copy = response.results;
        this.shallowCopy();
        setTimeout(() => this.loaded = true, 200);
      }
    );
  }

  loadShowList(id: string) {
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
    if(this.copy.length > this.results.length && this.copy.length > 10) {
      const temp = this.copy.slice(0, 10);
      temp.filter(el => this.results.push(el));
      this.copy.splice(0, 10);
    }
    else {
      this.copy.filter(el => this.results.push(el));
      this.copy = [];
    }    
  }

  // Add movie to my tvwl variabile in local storage
  addMyWatchList(item): void {
    const movie: Movie = {
      title: item.name,
      id: item.id,
      poster: item.poster_path ? item.poster_path : null,
      date: new Date()
    };
    if (this.tvwl.find(el => el.id == movie.id) == null) {
      this.tvwl.unshift(movie);
      this._storage.updateTvSeriesWL(this.tvwl);
      this.presentToast('Show added to yout Watchlist!');
    } else {
      this.presentToast('Show already present in your Watchlist!');
    }
  }

  // Add movie to my fml variabile in local storage
  addBlurayCollection(item): void {
    const movie: Movie = {
      title: item.name,
      id: item.id,
      poster: item.poster_path ? item.poster_path : null,
      date: new Date(),
      type: 'show'
    };
    if (this.cbluray.find(el => el.id == movie.id) == null) {
      this.cbluray.unshift(movie);
      this._storage.updateCbluray(this.cbluray);
      this.presentToast('Show added to your Bluray collection!');
    } else {
      this.presentToast('Show already present in your Bluray collection!');
    }
  }

  // Add movie to my fml variabile in local storage
  addDvdCollection(item): void {
    const movie: Movie = {
      title: item.name,
      id: item.id,
      poster: item.poster_path ? item.poster_path : null,
      date: new Date(),
      type: 'show'
    };
    if (this.cdvd.find(el => el.id == movie.id) == null) {
      this.cdvd.unshift(movie);
      this._storage.updateCdvd(this.cdvd);
      this.presentToast('Show added to your DVD collection!');
    } else {
      this.presentToast('Show already present in your DVD collection!');
    }
  }

  async presentToast(message: string) {
    const alert = await this.alertController.create({
      message:  message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async addMyList(item) {
    const actionSheet = await this.actionSheetController.create({
      header: item.name.toUpperCase(),
      buttons: [
        {
          text: 'Show details',
          icon: 'information-circle',
          handler: () => {
            this.showDetails(item);
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

  showDetails(item) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: item.id,
        type: 'show'
      }
    };
    this.router.navigate(['/menu/details'], navigationExtras);
  }

  onClickedOutside(event) {
    this.searchResults = null;
  }

  reset(event) {
    this.searchResults = null;
  }

  async loadList() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Some top lists:',
      buttons: [
        {
          text: 'On Tv Now',
          icon: 'tv',
          handler: () => {
            this.loadTVSeries('on_the_air');
          }
        },
        {
          text: 'Popular',
          icon: 'tv',
          handler: () => {
            this.loadTVSeries('popular');
          }
        },
        {
          text: 'Top Rated',
          icon: 'tv',
          handler: () => {
            this.loadTVSeries('top_rated');
          }
        },
        {
          text: 'IMDB Top 100 shows',
          icon: 'tv',
          handler: () => {
            this.loadShowList('113136');
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
