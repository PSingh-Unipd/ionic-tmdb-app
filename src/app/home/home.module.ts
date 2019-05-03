import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from './home-service/home.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HomeService],
  declarations: [HomePage]
})
export class HomePageModule {}
