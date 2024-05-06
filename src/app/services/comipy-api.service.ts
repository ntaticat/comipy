import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IAlumno, IDocente } from '../data/interfaces/docentes.interface';

@Injectable({
  providedIn: 'root',
})
export class ComipyApiService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAlumnos(): Observable<IAlumno[]> {
    return this.http.get<IAlumno[]>(`${this.apiUrl}/alumnos`).pipe(
      map((alumnos) => alumnos),
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return throwError(
          () => new Error('Error en la solicitud de datos: ' + error.message)
        );
      })
    );
  }

  getDocenteById(docenteId: number): Observable<IDocente> {
    return this.http.get<IDocente>(`${this.apiUrl}/docentes/${docenteId}`).pipe(
      map((data) => data),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError(() => error);
      })
    );
  }
}
