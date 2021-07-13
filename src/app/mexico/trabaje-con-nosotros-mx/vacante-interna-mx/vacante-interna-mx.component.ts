import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VacantesMxService } from 'src/app/services/vacantes-mx.service';
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-vacante-interna-mx',
  templateUrl: './vacante-interna-mx.component.html',
  styleUrls: ['./vacante-interna-mx.component.css']
})
export class VacanteInternaMxComponent implements OnInit {
  public interesado: any;

  vacante_data:any = {};
  loader = true;

  constructor(private route: ActivatedRoute, private _vacanteservice:VacantesMxService) { 
    this.interesado = {
      nombres: '',
      apellidos:'',
      email: '',
      telefono:'',
      correo:'',
      acepto:''
    };
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this._vacanteservice.getVacante(slug)
      .subscribe(res => {
        this.loader = false;
        this.vacante_data = res;
        for(let vacante of res){
          this.vacante_data = vacante;
        }
      })
  }

  postularme(){
    $("#wrapperInterna").toggleClass("toggled");
    $('.overlaytrabaja').addClass('active');
  }

  public cierraVacante() {
    $('.overlaytrabaja').removeClass('active');
    $("#wrapperInterna").toggleClass("toggled");
  }

  formVacanteInterna(form){
    $.ajax({
      //url: 'https://pruebasneuro.co/N-1057backgane/wp-content/themes/gane/suscribirse.php',
      type: 'POST',
      data: JSON.stringify(this.interesado),
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
