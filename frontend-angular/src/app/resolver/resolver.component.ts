import { Component, OnInit, Input} from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { VisitorsService } from '../visitors.service';
import { saveAs } from "file-saver";

@Component({
  selector: 'app-resolver',
  templateUrl: './resolver.component.html',
  styleUrls: ['./resolver.component.css']
})
export class ResolverComponent implements OnInit {

  boleta:any;
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
    this.visitorsService.getIpAddress().subscribe(res => {
      localStorage.setItem("ipUsuario", res['ip']);
    });
    this.rest.getBoletaById( localStorage.getItem("idBoleta")).subscribe((data: {}) => {
      this.boleta = data[0][0][0];
    });
  }

  responder(){
    this.respuesta = (<HTMLInputElement>document.getElementById("respuesta")).value;
    this.respuestaForm.controls['idBoleta'].setValue( localStorage.getItem("idBoleta"));
    this.respuestaForm.controls['idUsuarioRespuesta'].setValue(localStorage.getItem("idUsuario"));
    this.respuestaForm.controls['ipComputadora'].setValue(localStorage.getItem("ipUsuario"));
    this.respuestaForm.controls['detalleRespuesta'].setValue(this.respuesta);

    this.rest.addRespuesta(this.respuestaForm.value).subscribe((result) => {
      this.showMsgError= false;
      this.showMsgRegistration= true;
    }, (err) => {
      this.showMsgError= true;
      this.showMsgRegistration= false;
    });
  }

  download(){
    let filename = "Proyecto IF-7100.pdf";
    this.rest.download(filename).subscribe((data)=>{
        console.log(data);
        saveAs(data, filename);
    });
}

  atras(){
    this.router.navigate(['/administrador']);
  } 
  salir(){
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("permiso");
    localStorage.removeItem("ipUsuario");
    localStorage.removeItem("idBoleta");
    this.router.navigate(['/login']);
  }
}



