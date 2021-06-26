import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  queryForm: FormGroup;
  errorMessage: any;
  displayedColumns: string[] = ['idBoleta', 'fehcaHora', 'asuntoDetallado', 'idClasificador', 'estado'];
  dataSource = new MatTableDataSource<any>();
  element:any=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  clasificadores:any=[];
  showMsgError: boolean = false;
  showMsgRegistration: boolean = false;
  constructor(public rest:RestService, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) {

      this.queryForm = this.fb.group({
        usuarioId: 1,
        asuntoDetallado: new FormControl('', [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ\\s]{10,200}$')
        ]),
        ipComputadora: '222.222.222.222',
        clasificador: new FormControl('', [
          Validators.required
        ])
    })

}
ngOnInit() {
  this.getClasificadores();
}

  getClasificadores(){
    this.clasificadores=[];
    this.rest.getClasificadores().subscribe((data:{})=>{
    this.clasificadores=data;
    });
  }

  add() {

    console.log(this.queryForm);
    
    if (!this.queryForm.valid) {
      return;
    }

    this.rest.addBoleta(this.queryForm.value).subscribe((result) => {
      console.log(result);
      this.showMsgError= false;
      this.showMsgRegistration= true;
    }, (err) => {
      this.showMsgError= true;
      this.showMsgRegistration= false;
    });
  }
}