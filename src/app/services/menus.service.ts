import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class MenusService {
  public menu: string;
  
  constructor(public _http: HttpClient){
      this.menu = GLOBAL.menu;
  }

  getMenuPrincipal(): Observable<any>{
    return this._http.get(`${this.menu}/menus/main`);
  }

  getMenuFooter(): Observable<any>{
    return this._http.get(`${this.menu}/menus/57`);
  }

  getMenuFooterContacto(): Observable<any>{
    return this._http.get(`${this.menu}/menus/58`);
  }

  getMenuFooterCertificados(): Observable<any>{
    return this._http.get(`${this.menu}/menus/59`);
  }
}