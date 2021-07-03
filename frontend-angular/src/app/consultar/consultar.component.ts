import { Component, OnInit, ViewChild} from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  boleta:any;
  idBoleta:any;
  
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.idBoleta = this.route.snapshot.queryParamMap.get('idBoleta');
    this.rest.getBoletaById(this.idBoleta).subscribe((data: {}) => {
      this.boleta = data[0][0][0];
      console.log(this.boleta);
    });
  }
}


