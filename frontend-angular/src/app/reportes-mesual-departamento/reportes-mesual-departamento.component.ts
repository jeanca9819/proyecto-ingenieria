import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reportes-mesual-departamento',
  templateUrl: './reportes-mesual-departamento.component.html',
  styleUrls: ['./reportes-mesual-departamento.component.css']
})
export class ReportesMesualDepartamentoComponent implements OnInit {

  displayedColumns: string[] = ['Mes', 'Consultas', 'Respuestas'];
  dataSource = new MatTableDataSource<any>();
  element:any=[];
  departamentos:any=[];
  queryForm: FormGroup;
  chart:any = [];

  constructor(public rest:RestService, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) {

      this.queryForm = this.fb.group({
        departamentoId: new FormControl('', [
          Validators.required
        ]),
    })

    }

  ngOnInit(): void {
    localStorage.removeItem("rutaArchivoBoleta");
    localStorage.removeItem("rutaArchivoRespuesta");
    localStorage.removeItem("TotalParcialGrafico");
    localStorage.removeItem("TotalGeneralGrafico");
    this.getDepartamentos();
  }

  getDepartamentos(){
    this.departamentos=[];
    this.rest.getDepartamentos().subscribe((data:{})=>{
    this.departamentos=data;
    });
  }

  exportarExcel(){

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.element);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx' , type: 'array' });
    const data: Blob = new Blob([excelBuffer],{
      type: '.xlsx'
    });
    FileSaver.saveAs(data, 'Reportes Mensuales ('+this.departamentos[this.queryForm.value.departamentoId - 1].descripcion+').xlsx');

  }

  exportarPDF(){
    var doc = new jsPDF('l', 'mm', 'a4');
    var col = ['Mes', 'Consultas', 'Respuestas'];
    var rows = [];

    this.element.forEach(lista => {
      rows.push([
        lista.Mes,
        lista.Consultas,
        lista.Respuestas,
      ]);
    });
    autoTable(doc, {columns: col, body: rows});
    doc.save('Reportes Mensuales ('+this.departamentos[this.queryForm.value.departamentoId - 1].descripcion+').pdf');
  }

  filtrar(){
    if (!this.queryForm.valid) {
      return;
    }

    this.rest.getMensual(this.queryForm.value.departamentoId).subscribe((data: {}) => {
      this.element = data[0][0];
      this.dataSource.data=(this.element);

      let i: number = 0;
      var consultasGrafico = [];
      var respuestasGrafico = [];
      var mesesGrafico = [];
      while (i < 12){
        consultasGrafico.push(this.element[i].Consultas);
        respuestasGrafico.push(this.element[i].Respuestas);
        mesesGrafico.push(this.element[i].Mes);
        i = i + 1;
      }  
        
      mesesGrafico.forEach(result => {
        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: mesesGrafico,
            datasets: [
              {
                label: 'Consultas',
                data: consultasGrafico,
                backgroundColor: [
                  '#4BCAF6',
                  '#4BCAF6',
                  '#4BCAF6',
                  '#4BCAF6',
                  '#4BCAF6',
                  '#4BCAF6',
                  '#4BCAF6',
                  '#4BCAF6',
                  '#4BCAF6',
                  '#4BCAF6',
                  '#4BCAF6',
                  '#4BCAF6'
                ],
                fill: false
              },
              {
                label: 'Respuestas',
                data: respuestasGrafico,
                backgroundColor: [
                  '#4BF65A',
                  '#4BF65A',
                  '#4BF65A',
                  '#4BF65A',
                  '#4BF65A',
                  '#4BF65A',
                  '#4BF65A',
                  '#4BF65A',
                  '#4BF65A',
                  '#4BF65A',
                  '#4BF65A',
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



    });
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
