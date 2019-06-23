import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from './common/providers/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  ngOnInit(): void { 
    const lan : string = this.confirmLanguage(this._translate.getDefaultLanguage());
    console.log('stampa della lingua', lan);
    this._translate.setLanguage('en');
  }
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  confirmLanguage(value: string) : string {
    value = value.toLowerCase();

    if(value.includes('en')) {
      return 'en';
    }
    if(value.includes('it')){
      return 'it';
    }
    if(value.includes('fr')) {
      return 'fr';
    }
    if(value.includes('esp')) {
      return 'esp';
    }
  }
}
