import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CollectionsPage } from './collections.page';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: CollectionsPage,
    children: [
      {
        path: 'dvd',
        loadChildren: './pages/dvd/dvd.module#DvdPageModule'
      },
      {
        path: 'bluray',
        loadChildren: './pages/bluray/bluray.module#BlurayPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [CollectionsPage]
})
export class CollectionsPageModule {}
