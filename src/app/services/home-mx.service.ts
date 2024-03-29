import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeMxService {

  public base: string;
  public url: string;
  constructor(public _http: HttpClient){
      this.base = GLOBAL.baseMexico;
      this.url = GLOBAL.urlMexico;
  }

  getHome(): Observable<any>{
    return this._http.get(`${this.base}/pages/397/`);
  }

  getProyects(): Observable<any>{
    return this._http.get(`${this.url}/proyectos?per_page=40`);
  }
}
