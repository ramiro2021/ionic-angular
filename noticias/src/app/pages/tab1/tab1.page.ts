import { RespuestaTopHeadlines } from './../../interfaces/interfaces';
import { NoticiasService } from './../../services/noticias.service';
import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];


  constructor(private noticiasServices: NoticiasService) {

  }

  ngOnInit(): void {
    this.noticiasServices.getTopHeadlines().subscribe(resp => {
      console.log('noticias', resp);
      this.noticias.push(...resp.articles);
    });
  }

}
