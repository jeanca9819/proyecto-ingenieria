import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private http: HttpClient) { }
  
  private extractData(res: Response){
    let body = res;
    return body || {};

  }

  login(correo: string, contrasenna: string): Observable<any> {
    return this.http.get(endpoint + '/login/' + correo + '/' + contrasenna).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('login'))
    );
  }

  getBoletas(idUsuario: any, permiso: any): Observable<any> {
    return this.http.get(endpoint + '/listarBoletas/' + idUsuario + '/' + permiso).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('boletas'))
    );
  }


  getBoletaById(id): Observable<any> {
    return this.http.get(endpoint + '/boletaById/' + id).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getBoletaById'))
      );
  }

  getRespuestaById(id): Observable<any> {
    return this.http.get(endpoint + '/respuestaById/' + id).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getRespuestaById'))
      );
  }

  getClasificadores(): Observable<any> {
    return this.http.get(endpoint + '/clasificadores/').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('lista Clasificadores'))
    );
  }

  addBoleta(boleta): Observable<any> {
    return this.http.post<any>(endpoint + '/ingresarBoleta', boleta).pipe(
      tap((boleta) => console.log('added boleta')));
  }

  enviarEvidencia(file): Observable<any> {
    return this.http.post<any>(endpoint + '/', file).pipe(
      tap((file) => console.log('added Evidencia')));
  }

  addRespuesta(respuesta): Observable<any> {
    return this.http.post<any>(endpoint + '/ingresarRespuesta', respuesta).pipe(
      tap((respuesta) => console.log('Respuesta agregada')));
  }

  download(filename){
    const fileObj = {
        filename : filename
    };
    return this.http.post( endpoint + '/download', fileObj, {
        responseType : 'blob',
    });
}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}


