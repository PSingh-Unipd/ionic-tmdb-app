import { Injectable } from '@angular/core';
import { TranslateService as Service} from '@ngx-translate/core';

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
