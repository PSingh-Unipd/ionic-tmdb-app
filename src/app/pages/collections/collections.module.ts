import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CollectionsPage } from './collections.page';
import { TranslateModule } from '@ngx-translate/core';
import { CollectionsService } from './providers/collections.service';

const routes: Routes = [
  {
    path: '',
    component: CollectionsPage
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
  declarations: [CollectionsPage],
  providers: [CollectionsService]
})
export class CollectionsPageModule {}
