import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgFor, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { Header } from '../../components/header/header';
import { UnidadeService } from '../../services/unidade';
import { FaturaService } from '../../services/fatura';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [Header, NgFor, NgIf, ReactiveFormsModule, CurrencyPipe, DatePipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminComponent implements OnInit {

  private unidadeService = inject(UnidadeService);
  private faturaService  = inject(FaturaService);
  private cdr = inject(ChangeDetectorRef);

  abaAtiva = 'uc';

  // ===== UC =====
  ucs:           any[]   = [];
  carregandoUcs  = false;
  salvandoUc     = false;
  ucEditandoId:  number | null = null;
  ucErro         = '';
  ucSucesso      = '';

  ucForm = new FormGroup({
    codUn:           new FormControl('', [Validators.required]),
    categoriaTarifa: new FormControl('', [Validators.required]),
    clienteId:       new FormControl<number | null>(null, [Validators.required]),
    logradouro:      new FormControl('', [Validators.required]),
    bairro:          new FormControl('', [Validators.required]),
    cep:             new FormControl('', [Validators.required]),
    cidade:          new FormControl('', [Validators.required]),
    uf:              new FormControl('', [Validators.required]),
    numero:          new FormControl('', [Validators.required]),
    complemento:     new FormControl('')
  });

  // ===== FATURA =====
  faturas:            any[]   = [];
  carregandoFaturas   = false;
  salvandoFatura      = false;
  faturaEditandoId:   number | null = null;
  faturaErro          = '';
  faturaSucesso       = '';

  faturaForm = new FormGroup({
    ucId:          new FormControl<number | null>(null, [Validators.required]),
    mesReferencia: new FormControl('', [Validators.required]),
    consumoM3:     new FormControl<number | null>(null, [Validators.required]),
    valor:         new FormControl<number | null>(null, [Validators.required]),
    vencimento:    new FormControl('', [Validators.required]),
    status:        new FormControl('PENDENTE', [Validators.required])
  });

  ngOnInit(): void {
    this.carregarUcs();
    this.carregarFaturas();
  }

  // ===== MÉTODOS UC =====

  carregarUcs(): void {
    this.carregandoUcs = true;
    this.unidadeService.listarUnidades().subscribe({
      next: (dados) => { 
        this.ucs = dados;
        this.carregandoUcs = false;
        this.cdr.detectChanges(); 
      },
      error: () => { this.carregandoUcs = false; }
    });
  }

  salvarUc(): void {
    this.ucErro = '';
    this.ucSucesso = '';

    if (this.ucForm.invalid) {
      this.ucErro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    const f = this.ucForm.value;
    const payload = {
      codUn:           f.codUn,
      categoriaTarifa: f.categoriaTarifa,
      clienteId:       f.clienteId,
      endereco: {
        logradouro: f.logradouro, bairro: f.bairro, cep: f.cep,
        cidade: f.cidade, uf: f.uf, numero: f.numero, complemento: f.complemento
      }
    };

    this.salvandoUc = true;

    const obs = this.ucEditandoId
      ? this.unidadeService.atualizarUnidade(this.ucEditandoId, payload)
      : this.unidadeService.cadastrarUnidade(payload);

    obs.subscribe({
      next: () => {
        this.ucSucesso = this.ucEditandoId ? 'UC atualizada com sucesso!' : 'UC cadastrada com sucesso!';
        this.limparUc();
        this.carregarUcs();
        this.salvandoUc = false;
        setTimeout(() => this.ucSucesso = '', 3500);
      },
      error: (err) => {
        this.ucErro = err.error || 'Erro ao salvar UC.';
        this.salvandoUc = false;
      }
    });
  }

  editarUc(uc: any): void {
    this.ucEditandoId = uc.id;
    this.ucErro = '';
    this.ucForm.patchValue({
      codUn:           uc.codUn,
      categoriaTarifa: uc.categoriaTarifa,
      clienteId:       uc.clienteId,
      logradouro:      uc.endereco?.logradouro,
      bairro:          uc.endereco?.bairro,
      cep:             uc.endereco?.cep,
      cidade:          uc.endereco?.cidade,
      uf:              uc.endereco?.uf,
      numero:          uc.endereco?.numero,
      complemento:     uc.endereco?.complemento
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  excluirUc(id: number): void {
    if (!confirm('Excluir esta UC? As faturas vinculadas também serão afetadas.')) return;
    this.unidadeService.excluirUnidade(id).subscribe({
      next: () => { this.ucSucesso = 'UC excluída!'; this.carregarUcs(); setTimeout(() => this.ucSucesso = '', 3500); },
      error: () => { this.ucErro = 'Erro ao excluir UC.'; }
    });
  }

  limparUc(): void {
    this.ucForm.reset();
    this.ucEditandoId = null;
    this.ucErro = '';
  }

  // ===== MÉTODOS FATURA =====

  carregarFaturas(): void {
    this.carregandoFaturas = true;
    this.faturaService.listarFaturas().subscribe({
      next: (dados) => { 
        this.faturas = dados; 
        this.carregandoFaturas = false; 
        this.cdr.detectChanges();
       },
      error: () => { this.carregandoFaturas = false; }
    });
  }

  salvarFatura(): void {
    this.faturaErro = '';
    this.faturaSucesso = '';

    if (this.faturaForm.invalid) {
      this.faturaErro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    const payload = this.faturaForm.value;
    this.salvandoFatura = true;

    const obs = this.faturaEditandoId
      ? this.faturaService.atualizarFatura(this.faturaEditandoId, payload)
      : this.faturaService.cadastrarFatura(payload);

    obs.subscribe({
      next: () => {
        this.faturaSucesso = this.faturaEditandoId ? 'Fatura atualizada!' : 'Fatura lançada com sucesso!';
        this.limparFatura();
        this.carregarFaturas();
        this.salvandoFatura = false;
        setTimeout(() => this.faturaSucesso = '', 3500);
      },
      error: (err) => {
        this.faturaErro = err.error || 'Erro ao salvar fatura.';
        this.salvandoFatura = false;
      }
    });
  }

  editarFatura(fatura: any): void {
    this.faturaEditandoId = fatura.id;
    this.faturaErro = '';
    this.faturaForm.patchValue({
      ucId:          fatura.ucId,
      mesReferencia: fatura.mesReferencia,
      consumoM3:     fatura.consumoM3,
      valor:         fatura.valor,
      vencimento:    fatura.vencimento,
      status:        fatura.status
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  excluirFatura(id: number): void {
    if (!confirm('Excluir esta fatura?')) return;
    this.faturaService.excluirFatura(id).subscribe({
      next: () => { this.faturaSucesso = 'Fatura excluída!'; this.carregarFaturas(); setTimeout(() => this.faturaSucesso = '', 3500); },
      error: () => { this.faturaErro = 'Erro ao excluir fatura.'; }
    });
  }

  limparFatura(): void {
    this.faturaForm.reset({ status: 'PENDENTE' });
    this.faturaEditandoId = null;
    this.faturaErro = '';
  }
}