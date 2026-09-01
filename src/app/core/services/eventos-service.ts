import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments.prod';
import { Observable } from 'rxjs';
import { Evento } from '@core/models/evento.model';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/eventos`);
  }

  getEventosPorQuadra(quadraId: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/eventos?quadraId=${quadraId}`);
  }
}
