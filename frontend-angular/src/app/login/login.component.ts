import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: any;
  showMsgError: boolean = false;
  showMsgRegistration: boolean = false;

  constructor(public rest:RestService, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) {}

    ngOnInit(): void {

      if(this.route.snapshot.queryParamMap.get('showMsgRegistration')){
        this.showMsgRegistration= true;
      }
  
      this.loginForm = this.fb.group({
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]{1,15}$')
        ])
    })
    }

    
  login() {
    
    if (!this.loginForm.valid) {
      return;
    }
    
    this.rest.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((result) => { 

      localStorage.setItem("idUsuario", result.recordset[0].idUsuario);
      localStorage.setItem("permiso", result.recordset[0].permiso);

      var idUsuario = localStorage.getItem("idUsuario");
      var permiso = localStorage.getItem("permiso");

      if(idUsuario != null && permiso == "false"){
        this.router.navigate(['/main']);
      }else if(idUsuario != null && permiso  == "true"){
        this.router.navigate(['/administrador']);
      } else {
        this.showMsgError= true;
        this.showMsgRegistration= false;
      }
    }, (err) => {
      this.showMsgError= true;
      this.showMsgRegistration= false;
    });
    
  }

}