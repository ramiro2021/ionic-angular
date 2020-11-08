import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage) {
    this.cargarFavoritos();
  }


  guardarNoticia(noticia: Article) {

    const exist = this.noticias.find(noti => noti.title === noticia.title);

    if (!exist) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      console.log('noticia guardada')
    }

  }

  async cargarFavoritos() {

    const favoritos = await this.storage.get('favoritos');

    if (favoritos) {

      this.noticias = favoritos;
    }

  }

}
