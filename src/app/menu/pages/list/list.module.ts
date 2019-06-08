import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListPage } from './list.page';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    component: ListPage,
    children: [
      {
        path: 'movies',
        loadChildren: './pages/movies/movies.module#MoviesPageModule'
      },
      {
        path: 'shows',
        loadChildren: './pages/shows/shows.module#ShowsPageModule'
      }
    ]
  },
  
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
  declarations: [ListPage],
  providers: []
})
export class ListPageModule {}
