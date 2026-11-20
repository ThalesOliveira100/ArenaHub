import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UsuarioService } from './usuarios-service';
import { Usuario } from '@core/models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private usuariosService = inject(UsuarioService);

  public readonly todosOsUsuarios = toSignal(this.usuariosService.getUsuarios(), {initialValue: []});

  public getUsuarioPorId(id: number): Observable<Usuario> {
    return this.usuariosService.getUsuarioPorId(id);
  }
}
