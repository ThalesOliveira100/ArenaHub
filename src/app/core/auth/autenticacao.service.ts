import { Usuario } from './../models/usuario.model';
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environments.template';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private _usuarioLogado = signal<Usuario | null>(this.recuperarSessaoSalva());

  public readonly usuarioLogado = this._usuarioLogado.asReadonly();
  public readonly estaLogado = computed(() => this._usuarioLogado() !== null);
  public readonly perfilUsuario = computed(() => this._usuarioLogado()?.perfil);

  login(email: string, senha: string): Observable<Usuario> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios?email=${email}`).pipe(
      map(usuarios => {
        const usuario = usuarios[0];

        if (!usuario) {
          throw new Error('E-mail não encontrado na base de dados.');
        };

        if (usuario.senha !== senha) {
          throw new Error('Senha incorreta.');
        };

        return usuario;
      }),
      tap(usuario => {
        // Setta o valor signal do usuário logado e salva cache no navegador
        this._usuarioLogado.set(usuario);
        localStorage.setItem('arena_hub_sessao', JSON.stringify(usuario));
      }),
      catchError(error => {
        return throwError(() => new Error(error.message || 'Erro ao realizar login.'));
      })
    );
  }

  logout(): void {
    // Limpa o estado da sessão
    this._usuarioLogado.set(null);
    localStorage.removeItem('arena_hub_sessao');
  }

  // Método auxiliar útil para carregar dinamicamente as contas de teste na UI
  obterUsuariosTeste(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`).pipe(
      map((usuarios: Usuario[]) =>
        usuarios.filter(usuario => usuario.perfil !== 'PUBLICO')
      )
    );
  }

  private recuperarSessaoSalva(): Usuario | null {
    const dados = localStorage.getItem('arena_hub_sessao');
    return dados ? JSON.parse(dados) : null;
  }
}
