import { NoticiasService } from './../../services/noticias.service';
import { IonSegment } from '@ionic/angular';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Article } from '../../interfaces/interfaces';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit, OnInit {

  @ViewChild(IonSegment) segment: IonSegment;


  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit(): void {

  }


  ngAfterViewInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }


  cambioCategoria(event) {
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string) {

    this.noticiasService.getTopHeadlinesCategoria(categoria).subscribe(resp => {
      this.noticias.push(...resp.articles);
    });

  }

}
