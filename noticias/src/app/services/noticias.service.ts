import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }


  getTopHeadlines() {
    return this.http.get(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ba15a0fb0b9c45c7924249d4cb60acb7`);
  }
}
