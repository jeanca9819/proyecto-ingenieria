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
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  displayedColumns: string[] = ['idBoleta', 'idUsuario', 'fechaHoraBoleta', 'asuntoDetallado', 'clasificador', 'estado', 'nombreAdministrador', 'Departamento', 'fechaHoraRespuesta', 'detalleRespuesta'];
  dataSource = new MatTableDataSource<any>();
  element:any=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  queryForm: FormGroup;
  chart:any = [];
  temp:any;

  constructor(public rest:RestService, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) {
      this.queryForm = this.fb.group({
        identificador: 0,
        filtrar1: '',
        filtrar2: 'vacio'
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
      localStorage.setItem("TotalGeneralGrafico", this.element.length);
      this.temp =  localStorage.getItem("TotalGeneralGrafico");
    });
  }

  filtrar(){
    
    if(this.queryForm.value.filtrar1 == ''){
      this.getTodosReportes();
      localStorage.removeItem("TotalParcialGrafico");
      localStorage.removeItem("TotalGeneralGrafico");
      this.graficar();
    }else{
      this.rest.getReportesParametro(this.queryForm.value.identificador, this.queryForm.value.filtrar1, this.queryForm.value.filtrar2).subscribe((data: {}) => {
        this.element = data;
        this.dataSource.data=(this.element);
        this.dataSource.paginator = this.paginator;
        if (this.element.length > 0){
          localStorage.setItem("TotalParcialGrafico", this.element.length);
          localStorage.setItem("TotalGeneralGrafico", this.temp);
          this.graficar();
        }else{
        localStorage.removeItem("TotalParcialGrafico");
        localStorage.removeItem("TotalGeneralGrafico");
        this.graficar();
        }
        
      });
    }
  }

  graficar(){
    
    var FiltroGrafico = [];
    var Grafico = [];

      FiltroGrafico.push(localStorage.getItem("TotalParcialGrafico"));
      FiltroGrafico.push(localStorage.getItem("TotalGeneralGrafico"));
      Grafico.push('Filtro');
      Grafico.push('Total');
 
      Grafico.forEach(result => {
      this.chart = new Chart('canvas', {
        type: 'pie',
        data: {
          labels: Grafico,
          datasets: [
            {
              label: 'Filtro',
              data: FiltroGrafico,
              backgroundColor: [
                '#4BCAF6',
                '#4BF65A'
              ],
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [
              {
                display: true
              }
            ],
            yAxes: [
              {
                display: true
              }
            ]
          }
        }
      });


    });
  }


  exportarExcel(){

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.element);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx' , type: 'array' });
    const data: Blob = new Blob([excelBuffer],{
      type: '.xlsx'
    });
    FileSaver.saveAs(data, 'Reportes Detallados.xlsx');

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
    doc.save('Reportes Detallados.pdf');
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
