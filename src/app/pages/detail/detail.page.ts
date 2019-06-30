import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { getDatilsPageData, getStorageData } from 'src/app/state/selectors/app.selector';
import { DetailsPageData } from 'src/app/state/interfaces/details-page.interface';
import { BaseComponent } from 'src/app/common/components/base/base.component';
import { AppState } from 'src/app/state/interfaces/app-state.interface';
import { ActionSheetController } from '@ionic/angular';
import { ElementType } from 'src/app/state/interfaces/element-type.interface';
import { LoadDetailsAction } from 'src/app/state/actions/details-page.action';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { LoadCastDetailsAction } from 'src/app/state/actions/cast-page.action';
import { Router } from '@angular/router';
import { Season } from 'src/app/state/interfaces/info-page.inteface';
import { LoadSeasonInfoAction } from 'src/app/state/actions/info-page.actions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage extends BaseComponent {
  detailsData: DetailsPageData;
  loading: boolean = false;
  type: string;
  constructor(
    private location: Location,
    public store: Store<{ appState: AppState }>,
    private actionSheetController: ActionSheetController,
    private player: YoutubeVideoPlayer,
    private router: Router) {
    super(store);
    this.store.pipe(
      select(getDatilsPageData)
    ).subscribe(data => {
      this.loading = data.isLoading;
      this.type = data.tpye;
      this.detailsData = data.data;
    });
  }

  close() {
    this.location.back();
  }

  playTrailer() {
    this.player.openVideo(this.detailsData.videos[0].key);
  }

  async itemActions() {
    const actionSheet = await this.actionSheetController.create({
      header: this.detailsData.detail.title.toUpperCase(),
      buttons: [
        {
          text: 'Add to my Watchlist',
          icon: 'add-circle',
          handler: () => {
            this.addToWatchlist(this.detailsData.detail, this.type);
          }
        },
        {
          text: 'Add to DVD collection',
          icon: 'add-circle',
          handler: () => {
            this.addDvdCollection(this.detailsData.detail, this.type);
          }
        },
        {
          text: 'Add to Bluray collection',
          icon: 'add-circle',
          handler: () => {
            this.addBlurayCollection(this.detailsData.detail, this.type);
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

  movieRec(item): void {
    const temp: ElementType = {
      id: item.id,
      type: this.type == 'movie' ? 'movie' : 'tv'
    };
    this.store.dispatch(LoadDetailsAction(temp));
  }

  castDetail(cast): void {
    this.store.dispatch(LoadCastDetailsAction(cast.id));
    this.router.navigate(['/cast']);
  }

  seasonDetail(data): void {
    const temp: Season = {
      showId: data.showId,
      seasonNumber: data.seasonNumber
    };
    this.store.dispatch(LoadSeasonInfoAction(temp));
    this.router.navigate(['/info']);
  }
}
