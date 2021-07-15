import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  idUsuario:any;
  permiso:any;
  constructor(public rest:RestService, private route: ActivatedRoute,
    private router: Router) {

}
ngOnInit() {
  this.getBoletas();
}

  getBoletas(){
    this.idUsuario = localStorage.getItem("idUsuario");
    this.permiso = localStorage.getItem("permiso");
    this.rest.getBoletas(this.idUsuario, this.permiso).subscribe((data: {}) => {
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

  detalle(idBoleta:any){
    localStorage.setItem("idBoleta", idBoleta);
    this.router.navigate(['/resolver']);
  }

  
  salir(){
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("permiso");
    localStorage.removeItem("ipUsuario");
    localStorage.removeItem("idBoleta");
    this.router.navigate(['/login']);
  }
}