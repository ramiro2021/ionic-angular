import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.page.html',
  styleUrls: ['./infinite.page.scss'],
})
export class InfinitePage implements OnInit {

  data: any[] = Array(20);

  // acceder componente propiedades
  @ViewChild(IonInfiniteScroll) inifiniteScroll: IonInfiniteScroll;

  constructor() { }

  ngOnInit() {
  }


  loadData(event) {
    console.log(event);
    setTimeout(() => {

      if (this.data.length > 50) {
        this.inifiniteScroll.complete();
        this.inifiniteScroll.disabled = true;
        return;
      }


      const nuevoArr = Array(20);
      this.data.push(...nuevoArr);
      // event.target.complete();
      this.inifiniteScroll.complete();

    }, 1500);
  }

}
