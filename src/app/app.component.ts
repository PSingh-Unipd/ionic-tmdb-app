import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngrx/store';
import { AppState } from './state/interfaces/app-state.interface';
import { getNotificationsData, getExploreInitialLoading } from './state/selectors/app.selector';
import { LoadStorageAction } from './state/actions/local-storage.actions';
import { LoadExploreDataAction } from './state/actions/explore-page.actions';
import { ListType } from './state/interfaces/list-type.interface';
import { MessageAction } from './state/actions/notification.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  isLoading = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public store: Store<{ appState: AppState }>,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    // Loading deafult 2 list for explore page
    const tempList: ListType[] = [];
    tempList.push({ listId: 'now_playing', listCatagory: 'movie' });
    tempList.push({ listId: 'on_the_air', listCatagory: 'tv' });
    this.store.dispatch(LoadExploreDataAction(tempList));

    // loading local/native storage data
    this.store.dispatch(LoadStorageAction());

    this.store.select(getNotificationsData).subscribe(
      value => {
        if (value != null) {
          this.presentToast(value);
          this.store.dispatch(MessageAction(null)); // resetting the value to null
        }
      }
    );
    this.store.select(getExploreInitialLoading).subscribe(
      value => {
        setTimeout(() =>
          this.isLoading = value, 1000);
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentToast(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
