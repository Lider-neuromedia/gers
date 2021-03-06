import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VacantesClService } from '../../services/vacantes-cl.service';
import { Router } from '@angular/router'; 

import Swal from 'sweetalert2/dist/sweetalert2.js';

declare var $ : any; 

@Component({
  selector: 'app-trabaje-con-nosotros-cl',
  templateUrl: './trabaje-con-nosotros-cl.component.html',
  styleUrls: ['./trabaje-con-nosotros-cl.component.css']
})
export class TrabajeConNosotrosClComponent implements OnInit {
  public usuario: any;

  loader = true;
  vacantes_data:any[] = [];

  constructor(private _router:Router, private _vacantesservice:VacantesClService) { 
    this.usuario = {
      nombres: '',
      apellidos:'',
      email: '',
      telefono:'',
      ubicacion:'',
      categoria:'',
      acepto:''
    };
  }

  ngOnInit(): void {
    this._vacantesservice.getVacantes()
    .subscribe((res:any) => {
      this.loader = false;
      this.vacantes_data = res;
    });
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
    this._router.navigate(['/chile/vacantes', slug]);
  }

  formTrabajeNosotros(form){
    $.ajax({
      //url: 'https://pruebasneuro.co/N-1057backgane/wp-content/themes/gane/suscribirse.php',
      type: 'POST',
      data: JSON.stringify(this.usuario),
      dataType:"json",
      success: function(data) {
        
      }, error: function(error){
        if(error.status === 200){
          Swal.fire({
            icon: 'success',
            title: 'Gracias por regalarnos tus datos. Nos comunicaremos contigo.',
            showConfirmButton: true
          }); 
          //console.log(error);
        form.reset();
        } else {
          Swal.fire('Oops...', 'Algo pasó. Corrige los errores, por favor!', 'error')
        }
      }
    });
   }

}
