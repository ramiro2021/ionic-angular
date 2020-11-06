import { NoticiasService } from './../../services/noticias.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private noticiasServices: NoticiasService) {

  }

  ngOnInit(): void {
    this.noticiasServices.getTopHeadlines().subscribe(resp => {
      console.log('noticias', resp);
    });
  }

}
