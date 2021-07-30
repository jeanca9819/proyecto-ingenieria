//Generales
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes } from '@angular/router'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

//Componentes
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MainAdministradorComponent } from './main-administrador/main-administrador.component';
import { ResolverComponent } from './resolver/resolver.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { AgregarComponent } from './agregar/agregar.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ReportesAuditoriasComponent } from './reportes-auditorias/reportes-auditorias.component';
import { ReportesFechasComponent } from './reportes-fechas/reportes-fechas.component';
import { ReportesMesualDepartamentoComponent } from './reportes-mesual-departamento/reportes-mesual-departamento.component';

//Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

import { ChartsModule } from 'ng2-charts';

const appRoutes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    data: { title: 'Main' }
  },
  {
    path: 'administrador',
    component: MainAdministradorComponent,
    data: { title: 'Main Administrador' }
  },
  {
    path: 'resolver',
    component: ResolverComponent,
    data: { title: 'Resolver' }
  },
  {
    path: 'consultar',
    component: ConsultarComponent,
    data: { title: 'Consultar' }
  },
  {
    path: 'agregar',
    component: AgregarComponent,
    data: { title: 'Agregar' }
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    data: { title: 'Reportes' }
  },
  {
    path: 'reportes-auditorias',
    component: ReportesAuditoriasComponent,
    data: { title: 'Reportes Auditorias' }
  },
  {
    path: 'reportes-fechas',
    component: ReportesFechasComponent,
    data: { title: 'Reportes Fechas' }
  },
  {
    path: 'reportes-mensual-departamento',
    component: ReportesMesualDepartamentoComponent,
    data: { title: 'Reportes Mensuales' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    MainAdministradorComponent,
    ResolverComponent,
    ConsultarComponent,
    AgregarComponent,
    ReportesComponent,
    ReportesAuditoriasComponent,
    ReportesFechasComponent,
    ReportesMesualDepartamentoComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
