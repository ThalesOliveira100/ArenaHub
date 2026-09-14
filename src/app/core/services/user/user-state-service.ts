import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UsuarioService } from './usuarios-service';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private usuariosService = inject(UsuarioService);

  public readonly todosOsUsuarios = toSignal(this.usuariosService.getUsuarios(), {initialValue: []});
}
