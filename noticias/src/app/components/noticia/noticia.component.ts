import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(
    private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService) { }

  ngOnInit() { }


  abrirNoticia() {

    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let guardarBorrarBtn;

    if (this.enFavoritos) {

      guardarBorrarBtn = {
        text: 'Eliminar',
        icon: 'trash-outline',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Eliminar de favoritos');
          this.dataLocalService.borrarNoticia(this.noticia);
        }
      }

    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito clicked');
          this.dataLocalService.guardarNoticia(this.noticia);
        }
      }
    }

    const actionSheet = await this.actionSheetController.create({

      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Compartir clicked');

          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
        guardarBorrarBtn
        ,
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
