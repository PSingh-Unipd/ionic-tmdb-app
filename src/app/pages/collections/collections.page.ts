import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { StorageItem } from 'src/app/state/interfaces/local-storage.interfaces';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/interfaces/app-state.interface';
import { getCollectionData } from 'src/app/state/selectors/app.selector';
import * as StorageActions from 'src/app/state/actions/local-storage.actions';
import { ElementType } from 'src/app/state/interfaces/element-type.interface';
import { LoadDetailsAction } from 'src/app/state/actions/details-page.action';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-collections',
  templateUrl: './collections.page.html',
  styleUrls: ['./collections.page.scss'],
})
export class CollectionsPage implements OnInit {
  filterVal: FormControl = new FormControl();
  selected: string = 'bluray';
  collectionData: any;
  data: StorageItem[] = [];
  filteredItems: StorageItem[] = [];
  searchResults: any[];
  reorder: boolean = true;
  listChanging: boolean = false;

  constructor(private router: Router,
    public store: Store<{ appState: AppState }>,
    private _actionSheetController: ActionSheetController) {
    this.filterVal.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(val => {
      this.filterItem(val);
    });
  }

  ngOnInit(): void {
    this.store.select(getCollectionData).subscribe(
      results => {
        this.collectionData = results;
        this.selected == 'bluray' ? this.data = results.bluray : this.data = results.dvd;
        this.assignCopy();
      }
    );
  }

  updateSelected(): void {
    this.listChanging = true;
    this.selected == 'bluray' ?
      this.data = this.collectionData.bluray : this.data = this.collectionData.dvd;
    this.assignCopy();
    setTimeout( // Wait 200 ms to avoid white flash screen while list is changing
      () => this.listChanging = false, 200
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

  removeFromList(index: number): void {
    this.data.splice(index, 1);
    this.selected == 'bluray' ?
      this.store.dispatch(StorageActions.DeleteBlurayCollectionItemAction(this.data)) :
      this.store.dispatch(StorageActions.DeleteDvdCollectionItemAction(this.data));
    this.assignCopy();
  }

  showDetails(item: StorageItem): void {
    const temp: ElementType = {
      id: item.id.toString(),
      type: item.type == 'movie' ? 'movie' : 'tv'
    };
    this.store.dispatch(LoadDetailsAction(temp));
    this.router.navigate(['/details']);
  }

  async manageItem(item) {
    const actionSheet = await this._actionSheetController.create({
      header: item.title.toUpperCase(),
      buttons: [
        {
          text: 'Details',
          icon: 'information-circle',
          handler: () => {
            this.showDetails(item);
          }
        }, {
          text: 'Remove item from list',
          icon: 'trash',
          handler: () => {
            this.removeFromList(this.data.indexOf(item));
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
}
