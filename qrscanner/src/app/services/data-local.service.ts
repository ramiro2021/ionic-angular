import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';

import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private iab: InAppBrowser,
    private file: File) {
    this.cargarStorage();
  }


  async cargarStorage() {
    this.guardados = (await this.storage.get('registros')) || [];
  }

  guardarRegistro(format: string, text: string) {

    // await this.cargarStorage();

    const nuevoRegistro = new Registro(format, text);

    this.guardados.unshift(nuevoRegistro);

    console.log(this.guardados);

    this.storage.set('registros', this.guardados);

    this.abrirRegistro(nuevoRegistro);

  }

  abrirRegistro(registro: Registro) {
    this.navCtrl.navigateForward('/tabs/tab2');

    switch (registro.type) {
      case 'http':
        // abrir navegador web
        this.iab.create(registro.text, '_system');
        break;

      case 'geo':
        // abrir navegador web
        this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.text}`);
        break;

      default:
        break;
    }
  }


  enviarCorreo() {
    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';


    arrTemp.push(titulos);

    this.guardados.forEach(registro => {

      const linea = `${registro.type}, ${registro.format}, ${registro.created}, ${registro.text.replace(',', ' ')}\n`;

      arrTemp.push(linea);
    });

    // console.log(arrTemp.join(''));

    this.crearArchivoFisico(arrTemp.join(''));

  }

  crearArchivoFisico(text: string) {
    this.file.checkFile(this.file.dataDirectory, 'registros.csv')
      .then(exist => {
        console.log('Existe archivo CSV');
        return this.escribirEnArchivo(text);
      })
      .catch(err => {
        console.log(err);
        return this.file.createFile(this.file.dataDirectory, 'registros.csv', false)
          .then(create => this.escribirEnArchivo(text))
          .catch(err2 => console.log('no se pudo crear archivo : ', err2));
      });
  }

  async escribirEnArchivo(text: string) {
    await this.file.writeExistingFile(this.file.dataDirectory, 'registros.csv', text);
  }
}
