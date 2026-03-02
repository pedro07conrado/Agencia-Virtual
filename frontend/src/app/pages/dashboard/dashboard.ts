import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { Header } from '../../components/header/header';
import { AuthService } from '../../services/auth';
import { UnidadeService } from '../../services/unidade';
import { FaturaService } from '../../services/fatura';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Header, NgFor, NgIf, CurrencyPipe, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {

  private authService    = inject(AuthService);
  private unidadeService = inject(UnidadeService);
  private faturaService  = inject(FaturaService);

  ucs:     any[] = [];
  faturas: any[] = [];

  ucSelecionada:    any    = null;
  carregandoUcs     = false;
  carregandoFaturas = false;

  get nomeCliente(): string {
    return this.authService.getClienteLogado()?.nome?.split(' ')[0] || 'Cliente';
  }

  ngOnInit(): void {
    this.carregarUcs();
  }

  carregarUcs(): void {
    const cliente = this.authService.getClienteLogado();
    if (!cliente) return;

    this.carregandoUcs = true;
    this.unidadeService.listarPorCliente(cliente.id).subscribe({
      next: (dados) => {
        this.ucs = dados;
        this.carregandoUcs = false;
      },
      error: () => {
        this.carregandoUcs = false;
      }
    });
  }

  verFaturas(uc: any): void {
    this.ucSelecionada    = uc;
    this.faturas          = [];
    this.carregandoFaturas = true;

    this.faturaService.listarPorUc(uc.id).subscribe({
      next: (dados) => {
        this.faturas = dados;
        this.carregandoFaturas = false;

        // Rola a tela para o painel de faturas
        setTimeout(() => {
          document.querySelector('.faturas-painel')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      },
      error: () => {
        this.carregandoFaturas = false;
      }
    });
  }

  fecharFaturas(): void {
    this.ucSelecionada = null;
    this.faturas = [];
  }
}