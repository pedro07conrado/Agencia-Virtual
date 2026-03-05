import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgFor, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { Header } from '../../components/header/header';
import { Navbar } from '../../components/navbar/navbar';
import { FaturaService } from '../../services/fatura';

@Component({
  selector: 'app-faturas',
  standalone: true,
  imports: [Header, Navbar, NgFor, NgIf, ReactiveFormsModule, CurrencyPipe, DatePipe],
  templateUrl: './faturas.html',
  styleUrl: './faturas.css',
})
export class FaturasComponent implements OnInit {

  private faturaService = inject(FaturaService);

  faturas: any[] = [];
  carregando = false;
  salvando   = false;

  modalAberto  = false;
  modoEdicao   = false;
  faturaEditandoId: number | null = null;

  mensagemSucesso = '';
  mensagemErro    = '';
  modalErro       = '';

  faturaForm = new FormGroup({
    uncld:          new FormControl<number | null>(null, [Validators.required]),
    mesReferencia:  new FormControl('', [Validators.required]),
    consumoM3:      new FormControl<number | null>(null, [Validators.required]),
    valor:          new FormControl<number | null>(null, [Validators.required]),
    vencimento:     new FormControl('', [Validators.required]),
    status:         new FormControl<boolean>(false)
  });

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.faturaService.listarFaturas().subscribe({
      next: (dados) => { this.faturas = dados; this.carregando = false; },
      error: () => { this.mensagemErro = 'Erro ao carregar faturas.'; this.carregando = false; }
    });
  }

  abrirModalNovo(): void {
    this.modoEdicao = false;
    this.faturaEditandoId = null;
    this.faturaForm.reset({ status: false });
    this.modalErro = '';
    this.modalAberto = true;
  }

  abrirModalEditar(fatura: any): void {
    this.modoEdicao = true;
    this.faturaEditandoId = fatura.id;
    this.modalErro = '';
    this.faturaForm.patchValue({
      uncld:         fatura.uncld,
      mesReferencia: fatura.mesReferencia,
      consumoM3:     fatura.consumoM3,
      valor:         fatura.valor,
      vencimento:    fatura.vencimento,
      status:        fatura.status
    });
    this.modalAberto = true;
  }

  fecharModal(): void { this.modalAberto = false; }

  fecharModalFora(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) this.fecharModal();
  }

  salvar(): void {
    this.modalErro = '';
    if (this.faturaForm.invalid) { this.modalErro = 'Preencha todos os campos obrigatórios.'; return; }

    const payload = this.faturaForm.value;
    this.salvando = true;

    const obs = this.modoEdicao && this.faturaEditandoId !== null
      ? this.faturaService.atualizarFatura(this.faturaEditandoId, payload)
      : this.faturaService.cadastrarFatura(payload);

    obs.subscribe({
      next: () => {
        this.mensagemSucesso = this.modoEdicao ? 'Fatura atualizada!' : 'Fatura cadastrada!';
        this.fecharModal(); this.carregar(); this.salvando = false;
        setTimeout(() => this.mensagemSucesso = '', 3500);
      },
      error: (err) => { this.modalErro = err.error || 'Erro ao salvar.'; this.salvando = false; }
    });
  }

  excluir(id: number): void {
    if (!confirm('Excluir esta fatura?')) return;
    this.faturaService.excluirFatura(id).subscribe({
      next: () => { this.mensagemSucesso = 'Fatura excluída!'; this.carregar(); setTimeout(() => this.mensagemSucesso = '', 3500); },
      error: () => { this.mensagemErro = 'Erro ao excluir.'; setTimeout(() => this.mensagemErro = '', 3500); }
    });
  }
}