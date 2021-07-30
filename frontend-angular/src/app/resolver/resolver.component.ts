import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
  respuestaTarjeta:any;
  respuestaForm: FormGroup;
  showMsgError: boolean = false;
  showMsgRegistration: boolean = false;
  showMainContent: boolean = true;

  @ViewChild('fileInput', { static: false}) fileInput: ElementRef;
  
  constructor(public rest:RestService, private route: ActivatedRoute, private fb: FormBuilder,
    private router: Router, private visitorsService:VisitorsService) {

      this.respuestaForm = this.fb.group({
        idBoleta: 0,
        idUsuarioRespuesta: 0,
        ipComputadora: '',
        detalleRespuesta: new FormControl('', [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ@#$%^&*(),.¿?¡!\\s]{10,200}$')
        ]),
        rutaArchivo: new FormControl('', [
          Validators.required
        ]),
      });
     }

    

  ngOnInit() {
    localStorage.removeItem("rutaArchivoBoleta");
    localStorage.removeItem("rutaArchivoRespuesta");
    localStorage.removeItem("TotalParcialGrafico");
    localStorage.removeItem("TotalGeneralGrafico");
    this.visitorsService.getIpAddress().subscribe(res => {
      localStorage.setItem("ipUsuario", res['ip']);
    });
    this.rest.getBoletaById(localStorage.getItem("idBoleta")).subscribe((data: {}) => {
      this.boleta = data[0][0][0];
      localStorage.setItem("rutaArchivoBoleta", this.boleta.rutaArchivo);
      let idRespuestaObtenido = this.boleta.idRespuesta;
      if(idRespuestaObtenido != null){
        this.obtenerRespuesta(idRespuestaObtenido);
        this.showMainContent = false;
      }
    });
  }

  obtenerRespuesta(idRespuesta){
    this.rest.getRespuestaById(idRespuesta).subscribe((data: {}) => {
      this.respuestaTarjeta = data[0][0][0];
        localStorage.setItem("rutaArchivoRespuesta", this.respuestaTarjeta.rutaArchivo);
    });
  }

  responder(){
    
    const fileBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', fileBlob);

    if (fileBlob){
      this.respuestaForm.controls['rutaArchivo'].setValue(fileBlob.name);
    } 

    if (!this.respuestaForm.valid) {
      return;
    }

    this.respuestaForm.controls['idBoleta'].setValue( localStorage.getItem("idBoleta"));
    this.respuestaForm.controls['idUsuarioRespuesta'].setValue(localStorage.getItem("idUsuario"));
    this.respuestaForm.controls['ipComputadora'].setValue(localStorage.getItem("ipUsuario"));

    this.rest.enviarEvidencia(file).subscribe((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });

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

  downloadRespuesta(){
    let filename = localStorage.getItem("rutaArchivoRespuesta");
    this.rest.download(filename).subscribe((data)=>{
        console.log(data);
        saveAs(data, filename);
    });
  }

  atras(){
    this.router.navigate(['/administrador']);
    localStorage.removeItem("rutaArchivoBoleta");
    localStorage.removeItem("rutaArchivoRespuesta");
  } 
  salir(){
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("permiso");
    localStorage.removeItem("ipUsuario");
    localStorage.removeItem("idBoleta");
    localStorage.removeItem("rutaArchivoBoleta");
    localStorage.removeItem("rutaArchivoRespuesta");
    localStorage.removeItem("TotalParcialGrafico");
    localStorage.removeItem("TotalGeneralGrafico");
    this.router.navigate(['/login']);
  }
}



