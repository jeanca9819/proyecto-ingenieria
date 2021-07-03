import { Component, OnInit, Input} from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { VisitorsService } from '../visitors.service';

@Component({
  selector: 'app-resolver',
  templateUrl: './resolver.component.html',
  styleUrls: ['./resolver.component.css']
})
export class ResolverComponent implements OnInit {

  boleta:any;
  idBoletaParametro:any;
  idUsuario:any;
  ipAddress:string = '';
  respuesta:any;
  respuestaForm: FormGroup;
  showMsgError: boolean = false;
  showMsgRegistration: boolean = false;
  
  constructor(public rest:RestService, private route: ActivatedRoute, private fb: FormBuilder,
    private router: Router, private visitorsService:VisitorsService) {

      this.respuestaForm = this.fb.group({
        idBoleta: 0,
        idUsuarioRespuesta: 0,
        ipComputadora: '',
        detalleRespuesta: '' 
      });
     }

    

  ngOnInit() {
    this.idUsuario = this.route.snapshot.queryParamMap.get('idUsuario2'); 
    this.idBoletaParametro = this.route.snapshot.queryParamMap.get('idBoleta');
    this.visitorsService.getIpAddress().subscribe(res => {
      this.ipAddress = res['ip'];
    });
    this.rest.getBoletaById(this.idBoletaParametro).subscribe((data: {}) => {
      this.boleta = data[0][0][0];
    });
  }

  responder(){
    this.respuesta = (<HTMLInputElement>document.getElementById("respuesta")).value;
    this.respuestaForm.controls['idBoleta'].setValue(this.idBoletaParametro);
    this.respuestaForm.controls['idUsuarioRespuesta'].setValue(this.idUsuario);
    this.respuestaForm.controls['ipComputadora'].setValue(this.ipAddress);
    this.respuestaForm.controls['detalleRespuesta'].setValue(this.respuesta);

    this.rest.addRespuesta(this.respuestaForm.value).subscribe((result) => {
      this.showMsgError= false;
      this.showMsgRegistration= true;
    }, (err) => {
      this.showMsgError= true;
      this.showMsgRegistration= false;
    });
  }
}



