import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CastPage } from './cast.page';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';

const routes: Routes = [
  {
    path: 'cast',
    component: CastPage
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot({})
  ],
  declarations: [CastPage]
})
export class CastPageModule {}
