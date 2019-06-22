import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExplorePage } from './explore.page';
import { TranslateModule } from '@ngx-translate/core';
import { InfoListComponent } from './components/info-list/info-list.component';
import { ExploreService } from './services/explore.service';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ClickOutsideModule } from 'ng-click-outside';
import { HttpClientModule } from '@angular/common/http';

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
    TranslateModule
  ],
  declarations: [ExplorePage, InfoListComponent],
  providers: [ExploreService]
})
export class ExplorePageModule {}
