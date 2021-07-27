import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { VisitorsService } from '../visitors.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  queryForm: FormGroup;
  clasificadores:any=[];
  showMsgError: boolean = false;
  showMsgRegistration: boolean = false;

  @ViewChild('fileInput', { static: false}) fileInput: ElementRef;

  constructor(public rest:RestService, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private visitorsService:VisitorsService) {

      this.queryForm = this.fb.group({
        usuarioId: 0,
        asuntoDetallado: new FormControl('', [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\\s]{10,200}$')
        ]),
        ipComputadora: '',
        clasificador: new FormControl('', [
          Validators.required
        ]),
        rutaArchivo: ''
    })

  }
  ngOnInit(): void {
    this.visitorsService.getIpAddress().subscribe(res => {
      localStorage.setItem("ipUsuario", res['ip']);
    });
    this.getClasificadores();
  }

  getClasificadores(){
    this.clasificadores=[];
    this.rest.getClasificadores().subscribe((data:{})=>{
    this.clasificadores=data;
    });
  }
  
  add() {
    
    if (!this.queryForm.valid) {
      return;
    }

    var ipAddress = localStorage.getItem("ipUsuario");
    var idUsuario = localStorage.getItem("idUsuario");
    this.queryForm.controls['usuarioId'].setValue(idUsuario);
    this.queryForm.controls['ipComputadora'].setValue(ipAddress);

    const fileBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', fileBlob);

    this.rest.enviarEvidencia(file).subscribe((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });

    this.queryForm.controls['rutaArchivo'].setValue('./assets/'+fileBlob.name);

    this.rest.addBoleta(this.queryForm.value).subscribe((result) => {
      this.showMsgError= false;
      this.showMsgRegistration= true;
    }, (err) => {
      this.showMsgError= true;
      this.showMsgRegistration= false;
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
