import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DetailPage } from './detail.page';
import { DetailService } from './providers/detail.service';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { MoviedetailsComponent } from './components/moviedetails/moviedetails.component';
import { ShowdetailsComponent } from './components/showdetails/showdetails.component';

const routes: Routes = [
  {
    path: '',
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
    NgCircleProgressModule.forRoot({}),
    TranslateModule
  ],
  providers: [DetailService,YoutubeVideoPlayer],
  declarations: [DetailPage, MoviedetailsComponent, ShowdetailsComponent]
})
export class DetailPageModule {}
