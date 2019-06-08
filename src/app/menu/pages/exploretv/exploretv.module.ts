import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExploretvPage } from './exploretv.page';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { TranslateModule } from '@ngx-translate/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { ExploreTvService } from './services/exploretv.service';
import { LocalStorageService } from 'src/app/common/services/storage.service';

const routes: Routes = [
  {
    path: '',
    component: ExploretvPage
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
  declarations: [ExploretvPage],
  providers: [ExploreTvService]
})
export class ExploretvPageModule {}
