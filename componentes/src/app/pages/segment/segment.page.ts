import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit {

  heroes: Observable<any>;
  casaSeleccionada: string = '';
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.heroes = this.dataService.getHeroes();
  }

  segmentChanged(event) {
    if (event.detail.value === 'todos') {
      this.casaSeleccionada = '';
    } else {

      this.casaSeleccionada = event.detail.value;
    }
  }
}
