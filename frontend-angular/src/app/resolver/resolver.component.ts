import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('fileInput', { static: false}) fileInput: ElementRef;
  
  constructor(public rest:RestService, private route: ActivatedRoute, private fb: FormBuilder,
    private router: Router, private visitorsService:VisitorsService) {

      this.respuestaForm = this.fb.group({
        idBoleta: 0,
        idUsuarioRespuesta: 0,
        ipComputadora: '',
        detalleRespuesta: '',
        rutaArchivo: '' 
      });
     }

    

  ngOnInit() {
    this.visitorsService.getIpAddress().subscribe(res => {
      localStorage.setItem("ipUsuario", res['ip']);
    });
    this.rest.getBoletaById(localStorage.getItem("idBoleta")).subscribe((data: {}) => {
      this.boleta = data[0][0][0];
      localStorage.setItem("rutaArchivoBoleta", this.boleta.rutaArchivo);
    });
  }

  responder(){
    this.respuesta = (<HTMLInputElement>document.getElementById("respuesta")).value;
    this.respuestaForm.controls['idBoleta'].setValue( localStorage.getItem("idBoleta"));
    this.respuestaForm.controls['idUsuarioRespuesta'].setValue(localStorage.getItem("idUsuario"));
    this.respuestaForm.controls['ipComputadora'].setValue(localStorage.getItem("ipUsuario"));
    this.respuestaForm.controls['detalleRespuesta'].setValue(this.respuesta);

    const fileBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', fileBlob);

    this.rest.enviarEvidencia(file).subscribe((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });

    this.respuestaForm.controls['rutaArchivo'].setValue(fileBlob.name);

    this.rest.addRespuesta(this.respuestaForm.value).subscribe((result) => {
      this.showMsgError= false;
      this.showMsgRegistration= true;
    }, (err) => {
      this.showMsgError= true;
      this.showMsgRegistration= false;
    });
  }

  download(){
    let filename = localStorage.getItem("rutaArchivoBoleta");
    this.rest.download(filename).subscribe((data)=>{
        console.log(data);
        saveAs(data, filename);
    });
  }

  atras(){
    this.router.navigate(['/administrador']);
    localStorage.removeItem("rutaArchivoBoleta");
  } 
  salir(){
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("permiso");
    localStorage.removeItem("ipUsuario");
    localStorage.removeItem("idBoleta");
    localStorage.removeItem("rutaArchivoBoleta");
    this.router.navigate(['/login']);
  }
}



