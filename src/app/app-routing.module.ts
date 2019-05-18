import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CastPageModule } from './pages/cast/cast.module';

const routes: Routes = [
  { path: '', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'cast', loadChildren: './pages/cast/cast.module#CastPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    CastPageModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
