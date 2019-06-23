import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WatchListPage } from './watchlist.page';
import { TranslateModule } from '@ngx-translate/core';
import { WatchListService } from './providers/watchlist.service';

const routes: Routes = [
  {
    path: '',
    component: WatchListPage
  }  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [WatchListPage],
  providers: [WatchListService]
})
export class WatchListPageModule {}
