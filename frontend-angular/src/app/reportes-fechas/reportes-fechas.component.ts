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
  selector: 'app-reportes-fechas',
  templateUrl: './reportes-fechas.component.html',
  styleUrls: ['./reportes-fechas.component.css']
})
export class ReportesFechasComponent implements OnInit {


  displayedColumns: string[] = ['idBoleta', 'fechaHora', 'asuntoDetallado', 'descripcion', 'estado', 'accion'];
  dataSource = new MatTableDataSource<any>();
  element:any=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public rest:RestService, private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem("rutaArchivoBoleta");
    localStorage.removeItem("rutaArchivoRespuesta");
  }


  exportarExcel(){

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.element);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx' , type: 'array' });
    const data: Blob = new Blob([excelBuffer],{
      type: '.xlsx'
    });
    FileSaver.saveAs(data, 'Datos.xlsx');

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
    doc.save('Datos.pdf');
  }

  salir(){
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("permiso");
    localStorage.removeItem("ipUsuario");
    localStorage.removeItem("idBoleta");
    localStorage.removeItem("rutaArchivoBoleta");
    localStorage.removeItem("rutaArchivoRespuesta");
    this.router.navigate(['/login']);
  }

}
