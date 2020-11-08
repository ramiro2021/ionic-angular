import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage, public toastController: ToastController) {
    this.cargarFavoritos();
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }


  guardarNoticia(noticia: Article) {

    const exist = this.noticias.find(noti => noti.title === noticia.title);

    if (!exist) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);

    }

    this.presentToast('Se agrego correctamente a favoritos');
  }

  async cargarFavoritos() {

    const favoritos = await this.storage.get('favoritos');

    if (favoritos) {

      this.noticias = favoritos;
    }

  }



  borrarNoticia(noticia: Article) {

    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);

    this.presentToast('Se elimino correctamente de Favoritos');
  }
}
