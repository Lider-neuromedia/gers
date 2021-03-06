import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  getPensamientoCorporativo(): Observable<any>{
    return this._http.get(`${this.url}/pages/297/`);
  }
  getPoliticaGestionIntegral(): Observable<any>{
    return this._http.get(`${this.url}/pages/356/`)
  }
  getContactenos(): Observable<any>{
    return this._http.get(`${this.url}/pages/369/`)
  }
  getPruebasAutomatizacionControl(): Observable<any>{
    return this._http.get(`${this.url}/pages/220/`)
  }
  getSmartGrids(): Observable<any>{
    return this._http.get(`${this.url}/pages/224/`)
  }
  getServiciosEnergeticos(): Observable<any>{
    return this._http.get(`${this.url}/pages/228/`)
  }
  getPlaneacionProyectos(): Observable<any>{
    return this._http.get(`${this.url}/pages/232/`)
  }
  getInterventoriaAsesoria(): Observable<any>{
    return this._http.get(`${this.url}/pages/230/`)
  }
  getDisenoIngenieria(): Observable<any>{
    return this._http.get(`${this.url}/pages/222/`)
  }
  getEstudioSistemasElectricos(): Observable<any>{
    return this._http.get(`${this.url}/pages/226/`)
  }
  /**** Representaciones ****/ 
  getNeplan(): Observable<any>{
    return this._http.get(`${this.url}/representaciones/266`)
  }
  getBeckwithElectronic(): Observable<any>{
    return this._http.get(`${this.url}/representaciones/267`)
  }
  getXGSLab(): Observable<any>{
    return this._http.get(`${this.url}/representaciones/268`)
  }
  getDranetz(): Observable<any>{
    return this._http.get(`${this.url}/representaciones/269`)
  }
  getNdb(): Observable<any>{
    return this._http.get(`${this.url}/representaciones/270`)
  }
  /***************************/
  /**** Página Proyectos *****/
  getProyectosPage(): Observable<any>{
    return this._http.get(`${this.url}/pages/284`)
  }
  /*************************/
  getAcuerdosInternacionales(): Observable<any>{
    return this._http.get(`${this.url}/pages/619`)
  }
}
