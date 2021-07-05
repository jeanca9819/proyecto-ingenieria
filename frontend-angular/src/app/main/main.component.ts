import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { VisitorsService } from '../visitors.service';
import{ GlobalConstants } from '../globals';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  queryForm: FormGroup;
  errorMessage: any;
  displayedColumns: string[] = ['idBoleta', 'fechaHora', 'asuntoDetallado', 'descripcion', 'estado', 'accion'];
  dataSource = new MatTableDataSource<any>();
  element:any=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  clasificadores:any=[];
  showMsgError: boolean = false;
  showMsgRegistration: boolean = false;
  boletaCompleta:any;

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
        ])
    })

}
ngOnInit() {
  this.visitorsService.getIpAddress().subscribe(res => {
    GlobalConstants.ipAddress = res['ip'];
  });
  this.getClasificadores();
  this.getBoletas();
}

  getBoletas(){
    this.rest.getBoletas(GlobalConstants.idLogin, GlobalConstants.permiso).subscribe((data: {}) => {
      this.element = data[0][0];
      this.dataSource.data=(this.element);
      this.dataSource.paginator = this.paginator;
    });
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

    this.queryForm.controls['usuarioId'].setValue(GlobalConstants.idLogin);
    this.queryForm.controls['ipComputadora'].setValue(GlobalConstants.ipAddress);

    this.rest.addBoleta(this.queryForm.value).subscribe((result) => {
      this.getBoletas();
      this.showMsgError= false;
      this.showMsgRegistration= true;
    }, (err) => {
      this.showMsgError= true;
      this.showMsgRegistration= false;
    });
  }

  detalle(idBoleta:number){
    GlobalConstants.idBoletaActual = idBoleta;
    this.router.navigate(['/consultar']);
  }

  salir(){
    GlobalConstants.idLogin = 0;
    GlobalConstants.permiso = 0;
    GlobalConstants.idBoletaActual = 0;
    GlobalConstants.ipAddress = '';
    this.router.navigate(['/login']);
  }
}