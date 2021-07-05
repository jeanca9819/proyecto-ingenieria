import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import{ GlobalConstants } from '../globals';

@Component({
  selector: 'app-main-administrador',
  templateUrl: './main-administrador.component.html',
  styleUrls: ['./main-administrador.component.css']
})
export class MainAdministradorComponent implements OnInit {

  errorMessage: any;
  displayedColumns: string[] = ['idBoleta', 'fechaHora', 'asuntoDetallado', 'descripcion', 'estado', 'accion'];
  dataSource = new MatTableDataSource<any>();
  element:any=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  showMsgError: boolean = false;
  showMsgRegistration: boolean = false;
  boletaCompleta:any;
  constructor(public rest:RestService, private route: ActivatedRoute,
    private router: Router) {

}
ngOnInit() {
  this.getBoletas();
}

  getBoletas(){
    this.rest.getBoletas(GlobalConstants.idLogin, GlobalConstants.permiso).subscribe((data: {}) => {
      this.element = data[0][0];
      this.dataSource.data=(this.element);
      this.dataSource.paginator = this.paginator;
    });
  }

  getBoletaById(id:number){
    this.rest.getBoletaById(id).subscribe((data: {}) => {
      this.boletaCompleta = data[0][0];
    });
  }

  detalle(idBoleta:number){
    GlobalConstants.idBoletaActual = idBoleta;
    this.router.navigate(['/resolver']);
  }

  
  salir(){
    GlobalConstants.idLogin = 0;
    GlobalConstants.permiso = 0;
    GlobalConstants.idBoletaActual = 0;
    GlobalConstants.ipAddress = '';
    this.router.navigate(['/login']);
  }
}