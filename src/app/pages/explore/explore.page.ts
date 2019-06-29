import { Component, OnInit } from '@angular/core';
import { ExploreService } from './providers/explore.service';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { AppState } from 'src/app/state/interfaces/app-state.interface';
import { LoadDetailsAction } from 'src/app/state/actions/details-page.action';
import { ElementType } from 'src/app/state/interfaces/element-type.interface';
import { getExploreData, getExploreLoading } from 'src/app/state/selectors/app.selector';
import { ExplorePageState } from 'src/app/state/interfaces/explore-page.interface';
import { LoadDefaultListAction, LoadCustomListAction } from 'src/app/state/actions/explore-page.actions';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage extends BaseComponent implements OnInit {

  selected: string = 'movie';
  exploreData: ExplorePageState = null;
  data: any[] = [];
  shallowData: any[] = [];
  loading: boolean = false;
  searchResults: any[];
  queryField: FormControl = new FormControl();

  constructor(private _service: ExploreService,
    private router: Router,
    private actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public store: Store<{ appState: AppState }>) {
    super(store);
  }

  ngOnInit(): void {
    this.store.select(getExploreData).subscribe(
      value => {
        this.exploreData = value;
        this.selected == 'movie' ?
          this.data = JSON.parse(JSON.stringify(value.movieList)) :
          this.data = JSON.parse(JSON.stringify(value.showList));
        this.shallowData = [];
        this.shallowCopy();
      }
    );

    this.store.select(getExploreLoading).subscribe(
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
    this.loading = true;
    this.selected == 'movie' ?
      this.data = JSON.parse(JSON.stringify(this.exploreData.movieList)) :
      this.data = JSON.parse(JSON.stringify(this.exploreData.showList));
    this.shallowData = [];
    this.shallowCopy();
    setTimeout(
      () => this.loading = false, 200
    );
  }

  onClickedOutside(event) {
    this.searchResults = null;
  }

  getDetails(item) {
    const temp: ElementType = {
      id: item.id,
      type: this.selected == 'movie' ? 'movie' : 'tv'
    };
    this.store.dispatch(LoadDetailsAction(temp));
    this.router.navigate(['/details']);
  }

  listFilter() {
    this.selected == 'tv' ? this.loadTvList() : this.loadMovieList();
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
      event.target.complete();
      if (this.data.length == 0) {
        event.target.disabled = true;
      } else {
        event.target.disabled = false;
        this.shallowCopy();
      }
    }, 300);
  }

  async loadTvList() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Some top lists:',
      buttons: [
        {
          text: 'On Tv Now',
          icon: 'tv',
          handler: () => {
            this.store.dispatch(LoadDefaultListAction({
              listId: 'on_the_air',
              listCatagory: this.selected
            }));
          }
        },
        {
          text: 'Popular',
          icon: 'tv',
          handler: () => {
            this.store.dispatch(LoadDefaultListAction({
              listId: 'popular',
              listCatagory: this.selected
            }));
          }
        },
        {
          text: 'Top Rated',
          icon: 'tv',
          handler: () => {
            this.store.dispatch(LoadDefaultListAction({
              listId: 'top_rated',
              listCatagory: this.selected
            }));
          }
        },
        {
          text: 'IMDB Top 100 shows',
          icon: 'tv',
          handler: () => {
            this.store.dispatch(LoadCustomListAction({
              listId: '113136',
              listCatagory: this.selected
            }));
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
            this.store.dispatch(LoadDefaultListAction({
              listId: 'now_playing',
              listCatagory: this.selected
            }));
          }
        },
        {
          text: 'Top Rated',
          icon: 'film',
          handler: () => {
            this.store.dispatch(LoadDefaultListAction({
              listId: 'top_rated',
              listCatagory: this.selected
            }));
          }
        },
        {
          text: 'IMDB Top 250',
          icon: 'film',
          handler: () => {
            this.store.dispatch(LoadCustomListAction({
              listId: '1309',
              listCatagory: this.selected
            }));
          }
        },
        {
          text: 'Oscar Winner',
          icon: 'film',
          handler: () => {
            this.store.dispatch(LoadCustomListAction({
              listId: '28',
              listCatagory: this.selected
            }));
          }
        },
        {
          text: 'Marvel Universe',
          icon: 'film',
          handler: () => {
            this.store.dispatch(LoadCustomListAction({
              listId: '1',
              listCatagory: this.selected
            }));
          }
        },
        {
          text: 'DC Universe',
          icon: 'film',
          handler: () => {
            this.store.dispatch(LoadCustomListAction({
              listId: '3',
              listCatagory: this.selected
            }));
          }
        },
        {
          text: 'Disney Classics',
          icon: 'film',
          handler: () => {
            this.store.dispatch(LoadCustomListAction({
              listId: '338',
              listCatagory: this.selected
            }));
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
}
