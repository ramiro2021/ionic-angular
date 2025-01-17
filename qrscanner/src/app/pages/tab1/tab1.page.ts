import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };


  constructor(private barcodeScanner: BarcodeScanner, private dataLocal: DataLocalService) { }


  ionViewDidEnter() {
    // this.scan();
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {

      if (!barcodeData.cancelled) {
        this.dataLocal.guardarRegistro(barcodeData.format, barcodeData.text);
        console.log('entro');
      }

    }).catch(err => {
      console.log('Error', err);
      //this.dataLocal.guardarRegistro('QRCode', 'https://www.youtube.com/');
      // this.dataLocal.guardarRegistro('QRCode', 'geo:40.73154326986687,-70.06087423062502');

    });

  }

}
