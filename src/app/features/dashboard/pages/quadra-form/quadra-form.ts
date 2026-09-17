import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { HeaderService } from '@core/services/header/header-service';
import { UsuarioService } from '@core/services/user/usuarios-service';
import { BasicFormCard } from '@shared/components/basic-form-card/basic-form-card';
import { Location } from '@angular/common';
import { QuadrasStateService } from '@core/services/quadras/quadras-state-service';
import { QuadrasService } from '@core/services/quadras/quadras-service';

@Component({
  selector: 'app-quadra-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    BasicFormCard
  ],
  templateUrl: './quadra-form.html',
  styleUrl: './quadra-form.scss',
})
export class QuadraForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private location = inject(Location);
  private headerService = inject(HeaderService);
  private quadrasService = inject(QuadrasService);
  private quadrasState = inject(QuadrasStateService);
  private userService = inject(UsuarioService);

  id = input<string>();
  isEdicao = computed(() => !!this.id());
  salvando = signal<boolean>(false);

  protected readonly esportesOpcoes = [
  'Futsal',
  'Vôlei',
  'Basquete',
  'Handebol',
  'Tênis',
  'Beach Tennis',
  'Vôlei de Areia',
  'Futevôlei',
  'Queimada',
  'Badminton',
  'Judô',
  'Karatê',
  'Tênis de Mesa'
  ];
  protected readonly gestores = signal<any[]>([]);
  protected readonly monitores = signal<any[]>([]);

  form: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    regiao: ['', [Validators.required]],
    endereco:  ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    imagemUrl: [''],
    esportes: [[], [Validators.required]],
    status: ['Ativa', [Validators.required]],
    gestorId: [null, [Validators.required]],
    monitoresId: [[], [Validators.required]],
  });

  constructor() {
    this.carregarResponsaveis();

    effect(() => {
      const edicao = this.isEdicao();
      const quadraId = this.id();

      this.headerService.definirCabecalho(
        edicao ? 'Editar Quadra' : 'Nova Quadra',
        [
          { label: 'Início', route: '/dashboard/geral' },
          { label: 'Quadras', route: '/dashboard/quadras' },
          edicao ? { label: 'Editar' } : { label: 'Nova' }
        ],
        edicao
        ? 'Atualize as informações, modalidades ou responsáveis pela instalação.'
        : 'Preencha os dados para registrar uma nova estrutura no sistema.'
      );

      if (edicao && quadraId) {
        this.carregarDadosQuadra(quadraId);
      }
    });
  };

  private carregarResponsaveis() {
    this.userService.getUsuarios().subscribe(usuarios => {
      this.gestores.set(usuarios.filter((u: any) => u.perfil === 'GESTOR'));
      this.monitores.set(usuarios.filter((u: any) => u.perfil === 'MONITOR'));
    });
  };

  private carregarDadosQuadra(quadraId: string) {
    this.quadrasService.getQuadraPorId(Number(quadraId)).subscribe(quadra => {
      if (quadra) {
        const dadosTratados = {
        ...quadra,
        monitoresId: Array.isArray(quadra.monitoresId)
          ? quadra.monitoresId
          : (quadra.monitoresId ? [quadra.monitoresId] : [])
      };

      this.form.patchValue(dadosTratados);
      }
    });
  };

  salvar() {
    console.log(this.form.value, this.form.errors)
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando.set(true);
    const dados = this.form.value;

    const requisicao$ = this.isEdicao()
      ? this.quadrasState.atualizarQuadra(this.id()!, dados)
      : this.quadrasState.criarQuadra(dados);

    requisicao$.subscribe({
      next: () => {
        this.salvando.set(false);
        this.router.navigate(['/dashboard/quadras']);
      },
      error: (err) => {
        this.salvando.set(false);
        console.error('Erro ao salvar quadra:', err);
      }
    });
  };

  voltar() {
    this.location.back();
  };
}
