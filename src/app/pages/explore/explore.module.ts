import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ClickOutsideModule } from 'ng-click-outside';
import { IonicModule } from '@ionic/angular';
import { ExplorePage } from './explore.page';
import { ExploreService } from './services/explore.service';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';

const routes: Routes = [
  {
    path: '',
    component: ExplorePage
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
    NgCircleProgressModule.forRoot({})
  ],
  providers: [ExploreService],
  declarations: [ExplorePage]
})
export class ExplorePageModule {}
