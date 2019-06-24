import { Injectable } from '@angular/core';
import { TranslateService as Service} from '@ngx-translate/core';

/**
 * This provider service will be used to traslate app in different languges
 * For moment only to languages are added italian and english -> check assets/languages 
 */
@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(
    private translate: Service
  ) { }
 
  getDefaultLanguage(){
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    return language;
  }
 
  setLanguage(setLang) {
    this.translate.use(setLang);
  }
 
}
