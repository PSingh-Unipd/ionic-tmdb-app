import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ScanService } from './services/scan.service';
import encode from 'src/app/common/crypt-hmac';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  loaded:boolean = false;
  errMessage:string = '';
  movies:any[] = [];

  constructor(
    private barcodeScanner: BarcodeScanner,
    private _service: ScanService) { }

  ngOnInit() {
    
  }
  prova;
  prima;
  scan() {
    this.loaded = false;
    this.barcodeScanner.scan().then(barcodeData => {
      const scandata = barcodeData.text.toString();
      this._service.scanSearch(scandata, encode.hmac(scandata, "Ub02T7v6y9Rs4Ky0").toString(encode.base64)).then(
        res => {
          this.prima = JSON.parse(res.data);
          let temp = this.prima.description.toString().toLowerCase().replace('dvd', '');
          temp = temp.replace('bluray', '');
          temp = temp.replace('blu-ray', '');
          temp = temp.replace('bluray', '');
          temp = temp.replace('-', '');
          temp = temp.replace('?', '');
          temp = temp.replace('!', '');
          temp = temp.replace(',', '');
          temp = temp.replace('bd retail', '');
          temp = temp.replace('retail', '');
          temp = temp.replace('bd', '');
          this.prova = temp;
          this._service.search(temp).subscribe(res => {this.movies = res.results; this.loaded = true;});
        }
      ).catch(error => {
        this.errMessage = 'Movie not found';
        this.loaded = true;
      });
    }).catch(err => {
      this.errMessage = 'Error! Please contact us if you see this message.'
    });
  }
}
