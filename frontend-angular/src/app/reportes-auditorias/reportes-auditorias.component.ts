import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-reportes-auditorias',
  templateUrl: './reportes-auditorias.component.html',
  styleUrls: ['./reportes-auditorias.component.css']
})
export class ReportesAuditoriasComponent implements OnInit {

  displayedColumns: string[] = ['idBoleta', 'idUsuario', 'fechaHoraBoleta', 'asuntoDetallado', 'clasificador', 'estado', 'nombreAdministrador', 'Departamento', 'fechaHoraRespuesta', 'detalleRespuesta'];
  dataSource = new MatTableDataSource<any>();
  element:any=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  queryForm: FormGroup;

  constructor(public rest:RestService, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) {
      this.queryForm = this.fb.group({
        identificador: 0,
        filtrar1: '',
        filtrar2: '',
    })
    }

  ngOnInit(): void {
    localStorage.removeItem("rutaArchivoBoleta");
    localStorage.removeItem("rutaArchivoRespuesta");
    localStorage.removeItem("TotalParcialGrafico");
    localStorage.removeItem("TotalGeneralGrafico");
    this.getTodosReportes();
  }

  getTodosReportes(){
    this.rest.getTodosReportes().subscribe((data: {}) => {
      this.element = data;
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
    FileSaver.saveAs(data, 'Auditorías.xlsx');

  }

  filtrar(){
    if(this.queryForm.value.filtrar1 == '' || this.queryForm.value.filtrar2 == ''){
      this.getTodosReportes();
    }else{
      this.rest.getReportesParametro(this.queryForm.value.identificador, this.queryForm.value.filtrar1, this.queryForm.value.filtrar2).subscribe((data: {}) => {
        this.element = data;
        this.dataSource.data=(this.element);
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  exportarPDF(){
    var doc = new jsPDF('l', 'mm', 'a4');
    var col = ['idBoleta', 'idUsuario', 'fechaHoraBoleta', 'asuntoDetallado', 'clasificador', 'estado', 'nombreAdministrador', 'Departamento', 'fechaHoraRespuesta', 'detalleRespuesta'];
    var rows = [];

    this.element.forEach(lista => {
      rows.push([
        lista.idBoleta,
        lista.idUsuario,
        lista.fechaHoraBoleta,
        lista.asuntoDetallado,
        lista.clasificador,
        lista.estado,
        lista.nombreAdministrador,
        lista.Departamento,
        lista.fechaHoraRespuesta,
        lista.detalleRespuesta,
      ]);
    });
    autoTable(doc, {columns: col, body: rows});
    doc.save('Auditorías.pdf');
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
