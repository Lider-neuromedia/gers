import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import LocalEs from '@fullcalendar/core/locales/es';
import { CapacitacionesService } from '../../services/capacitaciones.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html',
  styleUrls: ['./capacitacion.component.css']
})
export class CapacitacionComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions;
  eventos: any[] = [];
  capacitaciones: any[] = [];
  capacitacionesFiltro: any[] = [];
  categorias: any[] = [];
  filtrar: any[];
  capacitacionesTemp: any[];
  bandera: boolean = false;
  eventosFiltro: any[];



  constructor(private capacitacionesS: CapacitacionesService, private router: Router) { }

  ngOnInit(): void {
    this.asignarEventos();
    this.getCategoriasFiltro();
    moment.locale('es');
  }

  asignarEventos() {
    this.capacitacionesS.getCapacitaciones().subscribe((resp: any[]) => {
      this.capacitaciones = resp;
      console.log(this.capacitaciones);
      this.capacitaciones.forEach(element => {
        let inicio = new Date(element.acf.fecha_inicio);
        let fin = new Date(element.acf.fecha_fin);
        let fechaInicio = inicio.getFullYear() + '-' + (inicio.getMonth() < 10 ? '0' + (inicio.getMonth() + 1) : (inicio.getMonth() + 1)) + '-' + (inicio.getDate() < 10 ? '0' + inicio.getDate() : inicio.getDate()) + 'T' + element.acf.hora_inicio;
        let fechaFin = fin.getFullYear() + '-' + (fin.getMonth() < 10 ? '0' + (fin.getMonth() + 1) : (fin.getMonth() + 1)) + '-' + (fin.getDate() < 10 ? '0' + fin.getDate() : fin.getDate()) + 'T' + element.acf.hora_fin;
        // console.log(fechaInicio);
        // console.log(fechaFin);
        this.eventos.push({
          title: element.acf.tipo_de_evento, start: fechaInicio, end: fechaFin,
          extendedProps: {
            id: element.id,
            fecha_Inicio: element.acf.fecha_inicio,
            fecha_FIn: element.acf.fecha_fin
          }
        })
      })
      this.crearCronograma();
      this.getCapacitaciones();
    })
  }

  crearCronograma() {
    this.calendarOptions = {
      locale: LocalEs,
      events: this.eventos,
      dateClick: this.reunionesDelDia.bind(this),
      eventClick: this.detalleReunion.bind(this)
    };
  }

  getCapacitaciones(){
    let capacitacion = this.capacitaciones.filter(filtro => {
        let fechaCapacitacion = moment(filtro.acf.fecha_inicio + ' ' + filtro.acf.hora_inicio).format('DD MMMM YYYY hh:mm:ss a');
        filtro.fecha = fechaCapacitacion
        let categorias = [];
        filtro.categorias_capacitaciones.forEach(element => {
          this.capacitacionesS.getCategoriaCapacitacionesId(element).subscribe((resp: any) => {
            categorias.push(resp.name)
            filtro.categorias = categorias;
          })
        });

        return filtro;
    });
    capacitacion.sort(function(a,b){
      if(a.acf.fecha_inicio < b.acf.fecha_inicio){
        return 1;
      }
      if(a.acf.fecha_inicio > b.acf.fecha_inicio){
        return -1;
      }
      return 0;
    })
    this.capacitacionesFiltro = capacitacion;
    // console.log(this.capacitacionesFiltro);
  }

  getCategoriasFiltro() {
    this.capacitacionesS.getCategoriaCapacitaciones().subscribe((resp : any) => {
      // console.log(resp);
      resp.forEach(element => {
        element.bandera = false
      });
      this.categorias.push(...resp)
      // console.log(this.categorias);
    })
  }

  categoriasFiltro(){
    this.filtrar = [];
    this.eventosFiltro = [];
    if(!this.capacitacionesTemp || this.capacitacionesTemp === this.capacitaciones){
      this.capacitacionesTemp = this.capacitaciones;
      // console.log(this.capacitacionesTemp);
    }
    // console.log(id);
    // console.log(bandera);
     this.capacitacionesTemp.forEach(element => {
      this.categorias.forEach(filtro => {
        element.categorias_capacitaciones.filter(filtroCate => {
          if(filtro.bandera && filtro.id === filtroCate){
              // console.log("Entro");
              this.filtrar.push(element);
              let inicio = new Date(element.acf.fecha_inicio);
              let fin = new Date(element.acf.fecha_fin);
              let fechaInicio = inicio.getFullYear() + '-' + (inicio.getMonth() < 10 ? '0' + (inicio.getMonth() + 1) : (inicio.getMonth() + 1)) + '-' + (inicio.getDate() < 10 ? '0' + inicio.getDate() : inicio.getDate()) + 'T' + element.acf.hora_inicio;
              let fechaFin = fin.getFullYear() + '-' + (fin.getMonth() < 10 ? '0' + (fin.getMonth() + 1) : (fin.getMonth() + 1)) + '-' + (fin.getDate() < 10 ? '0' + fin.getDate() : fin.getDate()) + 'T' + element.acf.hora_fin;
              this.eventosFiltro.push({
                title: element.acf.tipo_de_evento, start: fechaInicio, end: fechaFin,
                extendedProps: {
                  id: element.id,
                  fecha_Inicio: element.acf.fecha_inicio,
                  fecha_FIn: element.acf.fecha_fin
                }
              })
            }
        });
      })
      
    })
    if (this.filtrar.length > 0) {
      // console.log(this.filtrar);
      this.capacitaciones = this.filtrar;
      
      console.log(this.eventosFiltro);
      this.changeEvent(1);
      
      this.getCapacitaciones();
    } else {
      this.capacitaciones = this.capacitacionesTemp;
      // this.calendarComponent.getApi().removeAllEvents();
      console.log(this.eventos);
      this.changeEvent(2);
      // this.calendarComponent.getApi().addEvent(this.eventos);
      this.getCapacitaciones();
      // console.log(this.capacitaciones);
    }

  }

  changeEvent(id: number){
    if(id === 1){
      this.calendarOptions = {
        locale: LocalEs,
        events: this.eventosFiltro,
        dateClick: this.reunionesDelDia.bind(this),
        eventClick: this.detalleReunion.bind(this)
      };
      // this.calendarComponent.getApi().removeAllEvents();
      // this.calendarComponent.getApi().addEvent(this.eventosFiltro);
      // this.calendarComponent.getApi().refetchEvents();
    }else{
      this.calendarOptions = {
        locale: LocalEs,
        events: this.eventos,
        dateClick: this.reunionesDelDia.bind(this),
        eventClick: this.detalleReunion.bind(this)
      };
    }
  }

  reunionesDelDia(arg) {
    console.log(arg);
    this.getReuniones(arg.dateStr)
  }

  changeView(calendar: string) {
    this.calendarComponent.getApi().changeView(calendar);
  }

  enviarInterna(capacitacion) {
    this.router.navigateByUrl(`/colombia/capacitaciones/${capacitacion.id}`);
    // console.log(capacitacion);
  }

  getReuniones(date: string) {
    let fecha = new Date(date);
    console.log(date);
    let fechaSeleccionada = moment(date).format('MM/DD/YYYY');
    console.log(fechaSeleccionada);
    let capacitacion = this.capacitaciones.filter(filtro => {
      if (filtro.acf.fecha_inicio === fechaSeleccionada) {
        let fechaCapacitacion = moment(filtro.acf.fecha_inicio + ' ' + filtro.acf.hora_inicio).format('DD MMMM YYYY hh:mm:ss a');
        filtro.fecha = fechaCapacitacion
        let categorias = [];
        filtro.categorias_capacitaciones.forEach(element => {
          this.capacitacionesS.getCategoriaCapacitacionesId(element).subscribe((resp: any) => {
            categorias.push(resp.name)
            filtro.categorias = categorias;
          })
        });

        return filtro;
      }
    });
    this.capacitacionesFiltro = capacitacion;
    console.log(this.capacitacionesFiltro);
  }

  detalleReunion(arg) {
    let capacitacion = this.capacitaciones.filter(filtro => filtro.id === arg.event._def.extendedProps.id)
    this.capacitacionesFiltro = capacitacion;
    // console.log(capacitacion);
    // console.log(arg.event._def.extendedProps);
  }

}
