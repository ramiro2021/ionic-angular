import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';

import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private iab: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer) {
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
        console.log('creando archivo');
        return this.file.createFile(this.file.dataDirectory, 'registros.csv', false)
          .then(create => this.escribirEnArchivo(text))
          .catch(err2 => console.log('no se pudo crear archivo : ', err2));
      });
  }

  async escribirEnArchivo(text: string) {
    console.log('escribiendo archivo');
    await this.file.writeExistingFile(this.file.dataDirectory, 'registros.csv', text);
    console.log('ARCHIVO CREADO');
    console.log(`${this.file.dataDirectory}registros.csv`);
    const archivo = `${this.file.dataDirectory}registros.csv`;

    const email = {
      to: 'ramiroamurua@gmail.com',
      cc: null,
      bcc: null,
      attachments: [
        archivo
      ],
      subject: 'Backup de Scans',
      body: 'Este es su backup de los scans realizados :) - <strong>QRScanner</strong>',
      isHtml: true
    };
    console.log('enviando email...');
    this.emailComposer.open(email);


    // Send a text message using default options
    console.log('enviando...');
    await this.emailComposer.open(email);
  }
}
