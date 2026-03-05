import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Header } from '../../components/header/header';
import { Navbar } from '../../components/navbar/navbar';
import { UnidadeService } from '../../services/unidade';

@Component({
  selector: 'app-unidades',
  standalone: true,
  imports: [Header, Navbar, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './unidades.html',
  styleUrl: './unidades.css',
})
export class UnidadesComponent implements OnInit {

  private unidadeService = inject(UnidadeService);

  unidades: any[] = [];
  carregando = false;
  salvando   = false;

  modalAberto  = false;
  modoEdicao   = false;
  unidadeEditandoId: number | null = null;

  mensagemSucesso = '';
  mensagemErro    = '';
  modalErro       = '';

  unidadeForm = new FormGroup({
    codUn:          new FormControl('', [Validators.required]),
    categoriaTarifa: new FormControl('', [Validators.required]),
    clienteId:      new FormControl<number | null>(null, [Validators.required]),
    logradouro:     new FormControl('', [Validators.required]),
    bairro:         new FormControl('', [Validators.required]),
    cep:            new FormControl('', [Validators.required]),
    cidade:         new FormControl('', [Validators.required]),
    uf:             new FormControl('', [Validators.required]),
    numero:         new FormControl('', [Validators.required]),
    complemento:    new FormControl('')
  });

  ngOnInit(): void { this.carregar(); }

  carregar(): void {
    this.carregando = true;
    this.unidadeService.listarUnidades().subscribe({
      next: (dados) => { this.unidades = dados; this.carregando = false; },
      error: () => { this.mensagemErro = 'Erro ao carregar unidades.'; this.carregando = false; }
    });
  }

  abrirModalNovo(): void {
    this.modoEdicao = false;
    this.unidadeEditandoId = null;
    this.unidadeForm.reset();
    this.modalErro = '';
    this.modalAberto = true;
  }

  abrirModalEditar(u: any): void {
    this.modoEdicao = true;
    this.unidadeEditandoId = u.id;
    this.modalErro = '';
    this.unidadeForm.patchValue({
      codUn:           u.codUn,
      categoriaTarifa: u.categoriaTarifa,
      clienteId:       u.clienteId,
      logradouro:      u.endereco?.logradouro,
      bairro:          u.endereco?.bairro,
      cep:             u.endereco?.cep,
      cidade:          u.endereco?.cidade,
      uf:              u.endereco?.uf,
      numero:          u.endereco?.numero,
      complemento:     u.endereco?.complemento
    });
    this.modalAberto = true;
  }

  fecharModal(): void { this.modalAberto = false; }

  fecharModalFora(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) this.fecharModal();
  }

  salvar(): void {
    this.modalErro = '';
    if (this.unidadeForm.invalid) { this.modalErro = 'Preencha todos os campos obrigatórios.'; return; }

    const f = this.unidadeForm.value;
    const payload = {
      codUn:           f.codUn,
      categoriaTarifa: f.categoriaTarifa,
      clienteId:       f.clienteId,
      endereco: {
        logradouro: f.logradouro, bairro: f.bairro, cep: f.cep,
        cidade: f.cidade, uf: f.uf, numero: f.numero, complemento: f.complemento
      }
    };

    this.salvando = true;

    const obs = this.modoEdicao && this.unidadeEditandoId !== null
      ? this.unidadeService.atualizarUnidade(this.unidadeEditandoId, payload)
      : this.unidadeService.cadastrarUnidade(payload);

    obs.subscribe({
      next: () => {
        this.mensagemSucesso = this.modoEdicao ? 'Unidade atualizada!' : 'Unidade cadastrada!';
        this.fecharModal(); this.carregar(); this.salvando = false;
        setTimeout(() => this.mensagemSucesso = '', 3500);
      },
      error: (err) => { this.modalErro = err.error || 'Erro ao salvar.'; this.salvando = false; }
    });
  }

  excluir(id: number): void {
    if (!confirm('Excluir esta unidade?')) return;
    this.unidadeService.excluirUnidade(id).subscribe({
      next: () => { this.mensagemSucesso = 'Unidade excluída!'; this.carregar(); setTimeout(() => this.mensagemSucesso = '', 3500); },
      error: () => { this.mensagemErro = 'Erro ao excluir.'; setTimeout(() => this.mensagemErro = '', 3500); }
    });
  }
}