import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import {VariableGlobalService} from "../colombia/servicios/variable-global/variable-global.service";
import {AlertasService} from "../colombia/servicios/alertas/alertas.service";

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  @ViewChild('stickyMenu') menuElement: ElementRef;
  sticky: boolean = false;
  elementPosition: any;
  carrito: any;
  carritoAnterior: any;
  cantidadCarrito: number = 0;

  constructor(private variableG: VariableGlobalService, private alertaS: AlertasService) { }

  ngOnInit(): void {

    this.llamarDatoLocales();
   // this.miCarritoCompraContador();
  }

  ngAfterViewInit(){
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }
  @HostListener('window:scroll', ['$event'])
    handleScroll(){
      const windowScroll = window.pageYOffset;
      if(windowScroll >= this.elementPosition){
        this.sticky = true;
      } else {
        this.sticky = false;
      }
    }



  llamarDatoLocales() {

    this.variableG.currentMessage.subscribe(response => {
      this.carritoAnterior = response;
      console.log(this.carritoAnterior);
      this.miCarritoCompraContador();
    });

  }

  miCarritoCompraContador() {
    if (this.carritoAnterior && this.carritoAnterior.length > 0) {
      this.cantidadCarrito = this.carritoAnterior.length;
      console.log(this.cantidadCarrito);
    }



  }


   mostrarProductos(dato) {

    if (dato === 1) {
      document.getElementById('mySidenav').style.width = '39vw';
    } else {
      document.getElementById('mySidenav').style.width = '0';
    }

  }

}