import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'explore',
        loadChildren: '../explore/explore.module#ExplorePageModule'
      },
      { 
        path: 'list', 
        loadChildren: '../list/list.module#ListPageModule' 
      },
      { 
        path: 'favorite', 
        loadChildren: '../favorite/favorite.module#FavoritePageModule' 
      },
      { 
        path: 'details', 
        loadChildren: '../detail/detail.module#DetailPageModule' 
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/explore'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
