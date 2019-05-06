import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DetailPage } from './detail.page';
import { DetailService } from './services/detail.service';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';

const routes: Routes = [
  {
    path: 'detail',
    component: DetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({})
  ],
  providers: [DetailService],
  declarations: [DetailPage]
})
export class DetailPageModule {}
