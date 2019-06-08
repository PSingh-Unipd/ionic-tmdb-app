import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanPage } from './scan.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ScanService } from './services/scan.service';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

const routes: Routes = [
  {
    path: '',
    component: ScanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HttpClientModule,
  ],
  declarations: [ScanPage],
  providers: [BarcodeScanner, ScanService, HTTP]
})
export class ScanPageModule {}
