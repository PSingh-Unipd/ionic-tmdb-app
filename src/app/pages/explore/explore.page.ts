import { Component, OnInit } from '@angular/core';
import { ExploreService } from './services/explore.service';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/common/services/storage.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit{
  
  selected: string = 'movie';
  data: any [] = [];
  loading: boolean = true;

  searchResults: any[];
  queryField: FormControl = new FormControl();
  constructor(private _service: ExploreService,
    private router: Router,
    private actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public _storage: LocalStorageService) { }

  ngOnInit(): void {
    this._service.data.subscribe(
      res => {
        this.data = res;
      }
    );

    this._service.loading.subscribe(
      value => this.loading = value
    );

    this.queryField.valueChanges.pipe(
      debounceTime(1000),
      switchMap(
        queryField => this._service.search(queryField.length > 2 ? queryField : '%%')
      )
    ).subscribe(response => {
      this.searchResults = response.results;
    });
  }

  updateSelected() {
    this._service.getDefaultList(this.selected =='movie'? 'now_playing' : 'on_the_air', this.selected);
  }

  onClickedOutside(event) {
    this.searchResults = null;
  }

  async itemAction(item) {
    const actionSheet = await this.actionSheetController.create({
      header: item.title.toUpperCase(),
      buttons: [
        {
          text: 'More details',
          icon: 'information-circle',
          handler: () => {
            //this.showDetails(item);
          }
        }, {
          text: 'Add to my Watchlist',
          icon: 'add-circle',
          handler: () => {
            //this.addMyWatchList(item);
          }
        },
        {
          text: 'Add to DVD collection',
          icon: 'add-circle',
          handler: () => {
            //this.addDvdCollection(item);
          }
        },
        {
          text: 'Add to Bluray collection',
          icon: 'add-circle',
          handler: () => {
            //this.addBlurayCollection(item);
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
           // this._service.getDefaultList('113136', );
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
            //this.loadMoviesList('1309');
          }
        },
        {
          text: 'Oscar Winner',
          icon: 'film',
          handler: () => {
            //this.loadMoviesList('28');
          }
        },
        {
          text: 'Marvel Universe',
          icon: 'film',
          handler: () => {
            //this.loadMoviesList('1');
          }
        },
        {
          text: 'DC Universe',
          icon: 'film',
          handler: () => {
            //this.loadMoviesList('3');
          }
        },
        {
          text: 'Disney Classics',
          icon: 'film',
          handler: () => {
            //this.loadMoviesList('338');
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
  
}
