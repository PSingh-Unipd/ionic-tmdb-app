import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CastPageModule } from './menu/pages/cast/cast.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from './common/translate.service';
import { InfoPageModule } from './menu/pages/info/info.module';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

const routes: Routes = [
  { path: '', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'cast', loadChildren: './menu/pages/cast/cast.module#CastPageModule' },
  { path: 'info', loadChildren: './menu/pages/info/info.module#InfoPageModule' }
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/languages/", ".json");
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    CastPageModule,
    InfoPageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [RouterModule],
  providers: [TranslateService, LocalNotifications]
})
export class AppRoutingModule { }
