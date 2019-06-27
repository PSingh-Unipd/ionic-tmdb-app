import { Component, OnInit } from '@angular/core';
import { ExploreService } from './providers/explore.service';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/common/providers/storage.service';
import { Store, select } from '@ngrx/store';
import * as LocalStorageActions from 'src/app/state/actions/local-storage.actions';
import { StorageItem, StorageData } from 'src/app/state/interfaces/local-storage.interfaces';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { AppState } from 'src/app/state/interfaces/app-state.interface';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage extends BaseComponent implements OnInit {
  params: string = '';
  selected: string = 'movie';
  data: any[] = [];
  shallowData: any[] = [];
  loading: boolean = true;
  searchResults: any[];
  queryField: FormControl = new FormControl();

  constructor(private _service: ExploreService,
    private router: Router,
    private actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public _storage: LocalStorageService,
    public _alertController: AlertController,
    public store: Store<{ appState: AppState }>) {
    super(store);
  }


  ngOnInit(): void {
    this.store.dispatch(LocalStorageActions.LoadStorageAction());
    this.store.select('StorageData').subscribe(
      data => this.storageData
    );
    this._service.data.subscribe(
      res => {
        this.data = res;
        this.shallowData = [];
        this.shallowCopy();
      }
    );

    this._service.loading.subscribe(
      value => this.loading = value
    );

    this.queryField.valueChanges.pipe(
      debounceTime(1000),
      switchMap(
        queryField => this._service.search(queryField.length > 2 ? queryField : '%%', this.selected)
      )
    ).subscribe(response => {
      this.searchResults = response;
    });
  }

  updateSelected() {
    this._service.getDefaultList(this.selected == 'movie' ? 'now_playing' : 'on_the_air', this.selected);
  }

  onClickedOutside(event) {
    this.searchResults = null;
  }

  getDetails(item) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: item.id,
        type: this.selected == 'movie' ? 'movie' : 'show'
      }
    };
    this.router.navigate(['/details'], navigationExtras);
  }

  async presentToast(message: string) {
    const alert = await this._alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async itemActions(item) {
    const actionSheet = await this.actionSheetController.create({
      header: item.title.toUpperCase(),
      buttons: [
        {
          text: 'More details',
          icon: 'information-circle',
          handler: () => {
            this.getDetails(item);
          }
        }, {
          text: 'Add to my Watchlist',
          icon: 'add-circle',
          handler: () => {
            this.addToWatchlist(item, this.selected);
          }
        },
        {
          text: 'Add to DVD collection',
          icon: 'add-circle',
          handler: () => {
            this.addDvdCollection(item, this.selected);
          }
        },
        {
          text: 'Add to Bluray collection',
          icon: 'add-circle',
          handler: () => {
            this.addBlurayCollection(item, this.selected);
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

  listFilter() {
    this.selected == 'tv' ? this.loadTvList() : this.loadMovieList();
  }

  async loadTvList() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Some top lists:',
      buttons: [
        {
          text: 'On Tv Now',
          icon: 'tv',
          handler: () => {
            this._service.getDefaultList('on_the_air', this.selected);
          }
        },
        {
          text: 'Popular',
          icon: 'tv',
          handler: () => {
            this._service.getDefaultList('popular', this.selected);
          }
        },
        {
          text: 'Top Rated',
          icon: 'tv',
          handler: () => {
            this._service.getDefaultList('top_rated', this.selected);
          }
        },
        {
          text: 'IMDB Top 100 shows',
          icon: 'tv',
          handler: () => {
            this._service.getCustomList('113136', true);
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

  async loadMovieList() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Some top lists:',
      buttons: [
        {
          text: 'Now Showing',
          icon: 'film',
          handler: () => {
            this._service.getDefaultList('now_playing', this.selected);
          }
        },
        {
          text: 'Top Rated',
          icon: 'film',
          handler: () => {
            this._service.getDefaultList('top_rated', this.selected);
          }
        },
        {
          text: 'IMDB Top 250',
          icon: 'film',
          handler: () => {
            this._service.getCustomList('1309');
          }
        },
        {
          text: 'Oscar Winner',
          icon: 'film',
          handler: () => {
            this._service.getCustomList('28');
          }
        },
        {
          text: 'Marvel Universe',
          icon: 'film',
          handler: () => {
            this._service.getCustomList('1');
          }
        },
        {
          text: 'DC Universe',
          icon: 'film',
          handler: () => {
            this._service.getCustomList('3');
          }
        },
        {
          text: 'Disney Classics',
          icon: 'film',
          handler: () => {
            this._service.getCustomList('338');
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  shallowCopy() {
    if (this.data.length > this.shallowData.length && this.data.length > 10) {
      const temp = this.data.slice(0, 10);
      temp.filter(el => this.shallowData.push(el));
      this.data.splice(0, 10);
    }
    else {
      this.data.filter(el => this.shallowData.push(el));
      this.data = [];
    }
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      if (this.data.length == 0) {
        event.target.disabled = true;
      } else {
        this.shallowCopy();
      }
    }, 500);
  }
}
