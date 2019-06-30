import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CastPageModule } from './pages/cast/cast.module';
import { InfoPageModule } from './pages/info/info.module';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { LocalStorageEffect } from './state/effects/local-storage.effect';
import { LocalStorageProvaService } from './state/services/storage.service';
import { DetailsPageService } from './state/services/details-page.service';
import { appReducer } from './state/reducers/app.reducer';
import { ExplorePageEffect } from './state/effects/explore-page.effect';
import { ExplorePageService } from './state/services/explore-page.servicce';
import { CastPageEffect } from './state/effects/cast-page.effect';
import { CastPageService } from './state/services/cast-page.service';
import { InfoPageService } from './state/services/info-page.service';
import { InfoPageEffect } from './state/effects/info-page.effect';

const routes: Routes = [
  { path: '', loadChildren: './pages/explore/explore.module#ExplorePageModule' },
  { path: 'explore', loadChildren: './pages/explore/explore.module#ExplorePageModule' },
  { path: 'list', loadChildren: './pages/watchlist/watchlist.module#WatchListPageModule' },
  { path: 'collections', loadChildren: './pages/collections/collections.module#CollectionsPageModule' },
  { path: 'details', loadChildren: './pages/detail/detail.module#DetailPageModule' },
  { path: 'cast', loadChildren: './pages/cast/cast.module#CastPageModule' },
  { path: 'info', loadChildren: './pages/info/info.module#InfoPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    CastPageModule,
    InfoPageModule,
    StoreModule.forRoot({ 'appState': appReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([InfoPageEffect, LocalStorageEffect, ExplorePageEffect, CastPageEffect])
  ],
  exports: [RouterModule],
  providers: [
    DetailsPageService,
    CastPageService,
    ExplorePageService,
    LocalNotifications,
    LocalStorageProvaService,
    InfoPageService]
})
export class AppRoutingModule { }
