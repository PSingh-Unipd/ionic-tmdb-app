import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InfoPage } from './info.page';
import { InfoService } from './providers/info.service';
import { NgCircleProgressModule } from 'ng-circle-progress';

const routes: Routes = [
  {
    path: 'info',
    component: InfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot({})
  ],
  declarations: [InfoPage],
  providers: [InfoService]
})
export class InfoPageModule {}
