import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VacantesService } from '../../services/vacantes.service';
import { Router } from '@angular/router'; 

import Swal from 'sweetalert2/dist/sweetalert2.js';

declare var $ : any; 

@Component({
  selector: 'app-trabaje-con-nosotros',
  templateUrl: './trabaje-con-nosotros.component.html',
  styleUrls: ['./trabaje-con-nosotros.component.css']
})
export class TrabajeConNosotrosComponent implements OnInit {
  //public usuario: any;
  public usuario = {
    nombres: '',
    apellidos:'',
    email: '',
    telefono:'',
    ubicacion:'Colombia',
    categoria:'',
    archivo: null,
    acepto:'',
  };

  loader = true;
  vacantes_data:any[];
  categorias: any[] = [];
  horarioVacante: any[];
  filtrar: any[];
  vacantes_dataTemp: any;
  horarioVacanteTemp: any[];
  bandera: boolean = false;

  constructor(private _router:Router, private _vacantesservice:VacantesService) {
    //this.usuario.ubicacion = 'Colombia';
   }

  ngOnInit(): void {
    this.getVacantes();
    this.getCategoriasFiltro();
  }

  getVacantes() {
    if (!this.vacantes_data) {
      this._vacantesservice.getVacantes()
        .subscribe((res: any) => {
          this.loader = false;
          this.vacantes_data = res;


          let horarioVacante = [];
          let horarioVacanteMap = [];
          res.forEach(element => {
            horarioVacante.push({
              horario_vacante: element.acf.horario_vacante,
              bandera: false
            })
          });
          horarioVacanteMap = horarioVacante.map(item => [item.horario_vacante, item]);

          let horarioVacanteMapArr = new Map(horarioVacanteMap);

          let unicosHorarioVacante = [...horarioVacanteMapArr.values()];

          this.horarioVacante = unicosHorarioVacante;

        })
    } else {
      let horarioVacante = [];
          let horarioVacanteMap = [];
          this.vacantes_data.forEach(element => {
            horarioVacante.push({
              horario_vacante: element.acf.horario_vacante,
              bandera: false
            })
          });
        horarioVacanteMap = horarioVacante.map(item => [item.horario_vacante, item]);

      let horarioVacanteMapArr = new Map(horarioVacanteMap);

      let unicosHorarioVacante = [...horarioVacanteMapArr.values()];

      this.horarioVacante = unicosHorarioVacante;
    }

  }

  categoriasFiltro(categoriaSelec: any = null) {
    this.filtrar = [];
    if (!this.vacantes_dataTemp || this.vacantes_dataTemp === this.vacantes_data) {
      this.vacantes_dataTemp = this.vacantes_data;
    }
    this.vacantes_dataTemp.forEach(element => {
      this.categorias.forEach(filtro => {
        element.categoria_vacantes.filter(filtroCate => {
          if (filtro.bandera && filtro.id === filtroCate) {
            this.filtrar.push(element);
          }

        });
      })
    })
    this.vacantes_dataTemp.forEach(element => {
      this.horarioVacante.forEach(filtro => {
        if(filtro.bandera && element.acf.horario_vacante === filtro.horario_vacante){
          if(!this.bandera){

            this.filtrar = [];
          }
          this.bandera = true;
          this.filtrar.push(element);
        }
      })
    })

    if (this.filtrar.length > 0) {

      this.vacantes_data = this.filtrar;

 
      if(!this.bandera){

        this.getVacantes();
      }
      this.bandera = false;
    } else  if(this.filtrar.length === 0 && categoriaSelec.bandera){
      this.vacantes_data = [];
      this.bandera = false;
    }else{
      this.vacantes_data = this.vacantes_dataTemp;
      this.bandera = false;
 
      this.getVacantes();
    }
  }

  getCategoriasFiltro() {
    this._vacantesservice.getCategoriasVacantes().subscribe((resp: any) => {
  
      resp.forEach(element => {
        element.bandera = false
      });
      this.categorias.push(...resp)
  
    })
  }

  enviaCurriculum(){
    $("#wrapper").toggleClass("toggled");
    $('.overlaytrabaja').addClass('active');
  }

  public cierraTrabajemos() {
    $('.overlaytrabaja').removeClass('active');
    $("#wrapper").toggleClass("toggled");
  }

  verVacantes(slug:string){
    this._router.navigate(['/colombia/vacantes', slug]);
  }

  changeFile(file:File){
    this.usuario.archivo = file[0];
  }

  formTrabajeNosotros(form){
    var paqueteDeDatos = new FormData();
    paqueteDeDatos.append('archivo', this.usuario.archivo);
    paqueteDeDatos.append('nombres', this.usuario.nombres);
    paqueteDeDatos.append('apellidos', this.usuario.apellidos);
    paqueteDeDatos.append('email', this.usuario.email);
    paqueteDeDatos.append('telefono', this.usuario.telefono);
    paqueteDeDatos.append('ubicacion', this.usuario.ubicacion);
    paqueteDeDatos.append('categoria', this.usuario.categoria);
    paqueteDeDatos.append('acepto', this.usuario.acepto);
    var destino = "https://pruebasneuro.co/N-1003backWordpress/wp-content/themes/gers/formulario-vacantes-general/form-vacantes-general.php"; // El script que va a recibir los campos de formulario.
					/* Se envia el paquete de datos por ajax. */
    $.ajax({
      url: destino,
      type: 'POST',
      /*
      data: JSON.stringify(this.usuario),
      dataType:"json",
      */
      contentType: false,
      data: paqueteDeDatos, // Al atributo data se le asigna el objeto FormData.
      processData: false,
      cache: false, 
      success: function(data) {
        Swal.fire({
          icon: 'success',
          title: 'Gracias por regalarnos tus datos. Nos comunicaremos contigo.',
          showConfirmButton: true
        }); 
        form.reset();
      
      }, error: function(error){
        Swal.fire('Oops...', 'Algo pasó. Corrige los errores, por favor!', 'error')
      }
    });
   }

}
