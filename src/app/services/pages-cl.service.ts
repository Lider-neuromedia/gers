import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class PagesClService {

  public url: string;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.urlChile;
  }
  getPensamientoCorporativo(): Observable<any>{
    return this._http.get(`${this.url}/pages/98/`);
  }
  getPoliticaGestionIntegral(): Observable<any>{
    return this._http.get(`${this.url}/pages/142/`)
  }
  getEstudioSistemasElectricos(): Observable<any>{
    return this._http.get(`${this.url}/pages/155/`)
  }
  getDisenoIngenieria(): Observable<any>{
    return this._http.get(`${this.url}/pages/182/`)
  }
  getPruebasAutomatizacionControl(): Observable<any>{
    return this._http.get(`${this.url}/pages/206/`)
  }

  // REPRESENTACIONES
  getNeplan(): Observable<any>{
    return this._http.get(`${this.url}/representaciones/238/`)
  }
}

