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

  //queryForm: FormGroup;
  errorMessage: any;
  displayedColumns: string[] = ['idBoleta', 'fechaHora', 'asuntoDetallado', 'descripcion', 'estado', 'accion'];
  dataSource = new MatTableDataSource<any>();
  element:any=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  showMsgError: boolean = false;
  showMsgRegistration: boolean = false;
  idUsuario: any;
  permiso: any;
  boletaCompleta:any;
  constructor(public rest:RestService, private route: ActivatedRoute,
    private router: Router) {

}
ngOnInit() {
  this.idUsuario = this.route.snapshot.queryParamMap.get('idUsuario');
  this.permiso = this.route.snapshot.queryParamMap.get('permiso');
  this.getBoletas();
}

  getBoletas(){
    this.rest.getBoletas(this.idUsuario, this.permiso).subscribe((data: {}) => {
      this.element = data[0][0];
      this.dataSource.data=(this.element);
      this.dataSource.paginator = this.paginator;
    });
  }

  getBoletaById(id:number){
    this.rest.getBoletaById(id).subscribe((data: {}) => {
      this.boletaCompleta = data[0][0];
      console.log(this.boletaCompleta);
    });
  }

  detalle(idBoleta:number){
    let idUsuario2 = this.idUsuario;
    this.router.navigate(['/resolver'], {queryParams: {  idBoleta, idUsuario2 } });
  }
}