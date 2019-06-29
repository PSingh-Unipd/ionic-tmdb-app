import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageItem } from 'src/app/state/interfaces/local-storage.interfaces';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/interfaces/app-state.interface';
import { getWatchlistShows } from 'src/app/state/selectors/app.selector';
import * as StorageActions from 'src/app/state/actions/local-storage.actions';
import { ElementType } from 'src/app/state/interfaces/element-type.interface';
import { LoadDetailsAction } from 'src/app/state/actions/details-page.action';

@Component({
  selector: 'app-list',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
})
export class WatchListPage implements OnInit {
 
  filterVal: FormControl = new FormControl();
  selected: string = 'movie';
  watchlistData: any;
  data: StorageItem[] = [];
  filteredItems: StorageItem[] = [];
  searchResults: any[];
  reorder: boolean = true;
  listChanging: boolean = false;

  constructor(
    private router: Router,
    public alertController: AlertController,
    public store: Store<{ appState: AppState }>) {
    this.filterVal.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(val => {
      this.filterItem(val);
    });
  }

  ngOnInit(): void {
    this.store.select(getWatchlistShows).subscribe(
      results => {
        this.watchlistData = results;
        this.selected == 'movie' ? this.data = results.movies : this.data = results.shows;
        this.assignCopy();
      }
    );
  }

  updateSelected(): void {
    this.listChanging = true;
    this.selected == 'movie' ? this.data = this.watchlistData.movies : this.data = this.watchlistData.shows;
    this.assignCopy();
    setTimeout( // Wait 200 ms to avoid white flash screen while list is changing
      ()=> this.listChanging = false, 200
    );
  }

  reorderList(): void {
    this.assignCopy();
    this.reorder = !this.reorder;
  }

  assignCopy(): void {
    this.filteredItems = Object.assign([], this.data);
  }

  filterItem(value): void {
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.data).filter(
      item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  reset(event): void {
    this.assignCopy();
  }

  reorderItems(event): void {
    this.filterVal.setValue('');
    const temp = this.data.splice(event.detail.from, 1)[0];
    this.data.splice(event.detail.to, 0, temp);
    event.detail.complete();
    this.selected == 'movie' ?
      this.store.dispatch(StorageActions.ReorderWatchlistMoviesAction(this.data)) :
      this.store.dispatch(StorageActions.ReorderWatchlistShowsAction(this.data));
    this.assignCopy();
  }

  removeFromList(index: number): void {
    this.data.splice(index, 1);
    this.selected == 'movie' ?
      this.store.dispatch(StorageActions.DeleteWatchlistMovieAction(this.data)) :
      this.store.dispatch(StorageActions.DeleteWatchlistShowAction(this.data));
    this.assignCopy();
  }

  showDetails(item: StorageItem): void {
    const temp: ElementType = {
      id: item.id.toString(),
      type: this.selected == 'movie' ? 'movie' : 'tv'
    };
    this.store.dispatch(LoadDetailsAction(temp));
    this.router.navigate(['/details']);
  }
}
