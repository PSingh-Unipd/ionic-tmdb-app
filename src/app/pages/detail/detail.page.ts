import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { getDatilsPageData, getStorageData } from 'src/app/state/selectors/app.selector';
import { DetailsPageData } from 'src/app/state/interfaces/details-page.interface';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { AppState } from 'src/app/state/interfaces/app-state.interface';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage extends BaseComponent{
  detailsData: DetailsPageData;
  loading: boolean = false;
  selected: string;
  constructor(
    private location: Location,
    public store: Store<{ appState: AppState }>,
    private actionSheetController: ActionSheetController,) {
      super(store);
    this.store.pipe(
      select(getDatilsPageData)
    ).subscribe(data => {
      this.loading = data.isLoading;
      this.detailsData = data.data;
    });
  }

  close() {
    this.location.back();
  }

  async itemActions() {
    const actionSheet = await this.actionSheetController.create({
      header: this.detailsData.detail.title.toUpperCase(),
      buttons: [
         {
          text: 'Add to my Watchlist',
          icon: 'add-circle',
          handler: () => {
            this.addToWatchlist(this.detailsData.detail, this.selected);
          }
        },
        {
          text: 'Add to DVD collection',
          icon: 'add-circle',
          handler: () => {
            this.addDvdCollection(this.detailsData.detail, this.selected);
          }
        },
        {
          text: 'Add to Bluray collection',
          icon: 'add-circle',
          handler: () => {
            this.addBlurayCollection(this.detailsData.detail, this.selected);
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
