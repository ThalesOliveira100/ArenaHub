import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments.template';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Multa } from '@core/models/multa.model';

@Injectable({
  providedIn: 'root',
})
export class MultasService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getMultas(): Observable<Multa[]> {
    return this.http.get<Multa[]>(`${this.apiUrl}/multas`);
  };

  getMultasPendentes(): Observable<Multa[]> {
    return this.http.get<Multa[]>(`${this.apiUrl}/multas?status=PENDENTE`);
  }

  getMultasPorQuadra(quadraId: number): Observable<Multa[]> {
    return this.http.get<Multa[]>(`${this.apiUrl}/multas?quadraId=${quadraId}`);
  }

  getMultasPorMonitorResponsavel(monitorId: number): Observable<Multa[]> {
    return this.http.get<Multa[]>(`${this.apiUrl}/multas?monitorId=${monitorId}`);
  }
}
