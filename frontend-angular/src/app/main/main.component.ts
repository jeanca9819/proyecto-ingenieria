import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';

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
  localStorage.removeItem("rutaArchivoRespuesta");
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

  exportarExcel(){

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.element);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx' , type: 'array' });
    const data: Blob = new Blob([excelBuffer],{
      type: '.xlsx'
    });
    FileSaver.saveAs(data, 'Mis Consultas.xlsx');

  }

  exportarPDF(){
    var doc = new jsPDF('l', 'mm', 'a4');
    var col = ['Número Boleta', 'Fecha y Hora', 'Asunto Detallado', 'Descripción', 'Estado'];
    var rows = [];

    this.element.forEach(lista => {
      rows.push([
        lista.idBoleta,
        lista.fechaHora,
        lista.asuntoDetallado,
        lista.descripcion,
        lista.estado,
      ]);
    });
    autoTable(doc, {columns: col, body: rows});
    doc.save('Mis Consultas.pdf');
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
    localStorage.removeItem("rutaArchivoRespuesta");
    this.router.navigate(['/login']);
  }

  agregarConsulta(){
    this.router.navigate(['/agregar']);
  }
}