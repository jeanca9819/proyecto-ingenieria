import { Component, OnInit, ViewChild} from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  boleta:any;
  respuesta:any;

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.obtenerBoleta();
  }

  obtenerBoleta(){
    this.rest.getBoletaById(localStorage.getItem("idBoleta")).subscribe((data: {}) => {
      this.boleta = data[0][0][0];
      let idRespuestaObtenido = this.boleta.idRespuesta;
      if(idRespuestaObtenido != null){
        this.obtenerRespuesta(idRespuestaObtenido);
      }
    });
  }

  obtenerRespuesta(idRespuesta){
    this.rest.getRespuestaById(idRespuesta).subscribe((data: {}) => {
      this.respuesta = data[0][0][0];
    });
  }

  atras(){
    this.router.navigate(['/main']);
  } 

  salir(){
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("permiso");
    localStorage.removeItem("ipUsuario");
    localStorage.removeItem("idBoleta");
    this.router.navigate(['/login']);
  }
}


