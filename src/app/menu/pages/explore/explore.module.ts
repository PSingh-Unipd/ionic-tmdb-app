import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExplorePage } from './explore.page';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ExplorePage,
    children: [
      {
        path: 'movies',
        loadChildren: './pages/exploremovies/exploremovies.module#ExploreMoviesPageModule'
      },
      {
        path: 'tv',
        loadChildren: './pages/tv/tv.module#TvPageModule'
      }
    ]
  }  
];

@NgModule({
  imports: [CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [ExplorePage]
})
export class ExplorePageModule {}
