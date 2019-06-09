import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TvPage } from './tv.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ClickOutsideModule } from 'ng-click-outside';
import { HttpClientModule } from '@angular/common/http';
import { ExploreTvService } from './services/exploretv.service';

const routes: Routes = [
  {
    path: '',
    component: TvPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClickOutsideModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({}),
    TranslateModule 
  ],
  declarations: [TvPage],
  providers: [ExploreTvService]
})
export class TvPageModule {}
