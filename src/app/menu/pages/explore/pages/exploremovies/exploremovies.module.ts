import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExploreMoviesPage } from './exploremovies.page';
import { ClickOutsideModule } from 'ng-click-outside';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TranslateModule } from '@ngx-translate/core';
import { ExploreService } from './services/explore.service';

const routes: Routes = [
  {
    path: '',
    component: ExploreMoviesPage
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
  declarations: [ExploreMoviesPage],
  providers: [ExploreService]
})
export class ExploreMoviesPageModule {}
