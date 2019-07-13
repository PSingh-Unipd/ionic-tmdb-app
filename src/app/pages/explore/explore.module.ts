import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExplorePage } from './explore.page';
import { ExploreService } from './providers/explore.service';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ClickOutsideModule } from 'ng-click-outside';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { LocalStorageEffect } from 'src/app/state/effects/local-storage.effect';
import { DetailsPageEffect } from 'src/app/state/effects/details-page.effect';

const routes: Routes = [
  {
    path: '',
    component: ExplorePage
  }
];

@NgModule({
  imports: [CommonModule,
    CommonModule,
    FormsModule,
    ClickOutsideModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({}),
    EffectsModule.forFeature([LocalStorageEffect, DetailsPageEffect])
  ],
  declarations: [ExplorePage],
  providers: [ExploreService]
})
export class ExplorePageModule {}
