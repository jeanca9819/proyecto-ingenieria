import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  displayedColumns: string[] = ['idBoleta', 'fechaHora', 'asuntoDetallado', 'descripcion', 'estado', 'accion'];
  dataSource = new MatTableDataSource<any>();
  element:any=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  idUsuario:any;
  permiso:any;

  constructor(public rest:RestService, private route: ActivatedRoute,
    private router: Router) {}
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

  detalle(idBoleta:any){
    localStorage.setItem("idBoleta", idBoleta);
    this.router.navigate(['/consultar']);
  }

  salir(){
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("permiso");
    localStorage.removeItem("ipUsuario");
    localStorage.removeItem("idBoleta");
    this.router.navigate(['/login']);
  }

  agregarConsulta(){
    this.router.navigate(['/agregar']);
  }
}