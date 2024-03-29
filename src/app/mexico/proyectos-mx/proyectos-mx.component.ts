import { Component, OnInit } from '@angular/core';
import { HomeMxService } from 'src/app/services/home-mx.service';
import { PagesMxService } from 'src/app/services/pages-mx.service';

@Component({
  selector: 'app-proyectos-mx',
  templateUrl: './proyectos-mx.component.html',
  styleUrls: ['./proyectos-mx.component.css']
})
export class ProyectosMxComponent implements OnInit {
  FeaturedProyects:any[] = [];
  titulo_pagina_data: any;

  loader = true;

  constructor(private _proyectosService:PagesMxService) { }

  ngOnInit(): void {
    this._proyectosService.getProyectos()
      .subscribe((res:any) => {
        this.loader = false;
        this.FeaturedProyects = res;
      });  
      this._proyectosService.getProyectosPagina()
      .subscribe((res:any) => {
        this.loader = false;
        this.titulo_pagina_data = res.acf.titulo_pagina;
      });  
  }

}
