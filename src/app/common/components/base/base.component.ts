import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StorageData, StorageItem } from 'src/app/state/interfaces/local-storage.interfaces';
import * as LocalStorageActions from 'src/app/state/actions/local-storage.actions';
import { takeWhile } from 'rxjs/operators';
import { AppState } from 'src/app/state/interfaces/app-state.interface';
import { getStorageData } from 'src/app/state/selectors/app.selector';

@Component({
  selector: '',
  template: '',
})
export class BaseComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.componentIsActive = false;
  }
  componentIsActive: boolean = true;
  public storageData: StorageData = { mwl: [], tvwl: [], cbluray: [], cdvd: [] };
  constructor(public store: Store<{ appState: AppState }>) { 
    this.store.pipe(select(getStorageData), 
    takeWhile(() => this.componentIsActive))
    .subscribe(data => this.storageData = data);
  }

  /**
     * Add new item to blu-ray collection in native local storage
     * @param item - item containing the informations(must contain title, id and poster url)
     * @param type - type of item (movie or show)
     */
  public addToWatchlist(item, type): void {
    const tempItem: StorageItem = {
      title: item.title,
      id: item.id,
      poster: item.poster_path ? item.poster_path : null,
      date: new Date(),
      type: type == 'movie' ? 'movie' : 'show'
    };
    type == 'movie' ? this.storageData.mwl.unshift(tempItem) : this.storageData.tvwl.unshift(tempItem);
    type == 'movie' ?
      this.store.dispatch(LocalStorageActions.UpdateWatchlistMoviesAction(this.storageData.mwl)) :
      this.store.dispatch(LocalStorageActions.UpdateWatchlistShowAction(this.storageData.tvwl));
  }

  /**
  * Add new item to blu-ray collection in native local storage
  * @param item - item containing the informations(must contain title, id and poster url)
  * @param type - type of item (movie or show)
  */
  public addDvdCollection(item, type): void {
    const tempItem: StorageItem = {
      title: item.title,
      id: item.id,
      poster: item.poster_path ? item.poster_path : null,
      date: new Date(),
      type: type == 'movie' ? 'movie' : 'show'
    };
    this.storageData.cdvd.unshift(tempItem);
    this.store.dispatch(LocalStorageActions.UpdateCollectionDvdAction(this.storageData.cdvd));
  }

  /**
   * Add new item to blu-ray collection in native local storage
   * @param item - item containing the informations(must contain title, id and poster url)
   * @param type - type of item (movie or show)
   */
  public addBlurayCollection(item, type): void {
    const tempItem: StorageItem = {
      title: item.title,
      id: item.id,
      poster: item.poster_path ? item.poster_path : null,
      date: new Date(),
      type: type == 'movie' ? 'movie' : 'show'
    };
    this.storageData.cbluray.unshift(tempItem);
    this.store.dispatch(LocalStorageActions.UpdateCollectionBlurayAction(this.storageData.cbluray));
  }

 
}
