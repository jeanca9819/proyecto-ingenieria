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

//Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

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
    AgregarComponent
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
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
