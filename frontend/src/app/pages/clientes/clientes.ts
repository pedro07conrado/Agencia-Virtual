import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Header } from '../../components/header/header';
import { Navbar } from '../../components/navbar/navbar';
import { ClienteService } from '../../services/cliente';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [Header, Navbar, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class ClientesComponent implements OnInit {

  private clienteService = inject(ClienteService);

  clientes: any[] = [];
  carregando = false;
  salvando   = false;

  modalAberto  = false;
  modoEdicao   = false;
  clienteEditandoId: number | null = null;

  mensagemSucesso = '';
  mensagemErro    = '';
  modalErro       = '';

  clienteForm = new FormGroup({
    nome:        new FormControl('', [Validators.required]),
    cpf:         new FormControl('', [Validators.required]),
    email:       new FormControl(''),
    telefone:    new FormControl(''),
    logradouro:  new FormControl('', [Validators.required]),
    bairro:      new FormControl('', [Validators.required]),
    cep:         new FormControl('', [Validators.required]),
    cidade:      new FormControl('', [Validators.required]),
    uf:          new FormControl('', [Validators.required]),
    numero:      new FormControl('', [Validators.required]),
    complemento: new FormControl('')
  });

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.clienteService.listarClientes().subscribe({
      next: (dados) => {
        this.clientes = dados;
        this.carregando = false;
      },
      error: () => {
        this.mensagemErro = 'Erro ao carregar clientes.';
        this.carregando = false;
      }
    });
  }

  abrirModalNovo(): void {
    this.modoEdicao = false;
    this.clienteEditandoId = null;
    this.clienteForm.reset();
    this.modalErro = '';
    this.modalAberto = true;
  }

  abrirModalEditar(cliente: any): void {
    this.modoEdicao = true;
    this.clienteEditandoId = cliente.id;
    this.modalErro = '';
    this.clienteForm.patchValue({
      nome:        cliente.nome,
      cpf:         cliente.cpf,
      email:       cliente.email,
      telefone:    cliente.telefone,
      logradouro:  cliente.endereco?.logradouro,
      bairro:      cliente.endereco?.bairro,
      cep:         cliente.endereco?.cep,
      cidade:      cliente.endereco?.cidade,
      uf:          cliente.endereco?.uf,
      numero:      cliente.endereco?.numero,
      complemento: cliente.endereco?.complemento
    });
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  fecharModalFora(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.fecharModal();
    }
  }

  salvar(): void {
    this.modalErro = '';

    if (this.clienteForm.invalid) {
      this.modalErro = 'Preencha todos os campos obrigatórios (*).';
      return;
    }

    const f = this.clienteForm.value;
    const payload = {
      nome:     f.nome,
      cpf:      f.cpf,
      email:    f.email,
      telefone: f.telefone,
      endereco: {
        logradouro:  f.logradouro,
        bairro:      f.bairro,
        cep:         f.cep,
        cidade:      f.cidade,
        uf:          f.uf,
        numero:      f.numero,
        complemento: f.complemento
      }
    };

    this.salvando = true;

    if (this.modoEdicao && this.clienteEditandoId !== null) {
      this.clienteService.atualizarCliente(this.clienteEditandoId, payload).subscribe({
        next: () => {
          this.mensagemSucesso = 'Cliente atualizado com sucesso!';
          this.fecharModal();
          this.carregar();
          this.salvando = false;
          setTimeout(() => this.mensagemSucesso = '', 3500);
        },
        error: (err) => {
          this.modalErro = err.error || 'Erro ao atualizar cliente.';
          this.salvando = false;
        }
      });
    } else {
      this.clienteService.cadastrarCliente(payload).subscribe({
        next: () => {
          this.mensagemSucesso = 'Cliente cadastrado com sucesso!';
          this.fecharModal();
          this.carregar();
          this.salvando = false;
          setTimeout(() => this.mensagemSucesso = '', 3500);
        },
        error: (err) => {
          this.modalErro = err.error || 'Erro ao cadastrar cliente.';
          this.salvando = false;
        }
      });
    }
  }

  excluir(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

    this.clienteService.excluirCliente(id).subscribe({
      next: () => {
        this.mensagemSucesso = 'Cliente excluído com sucesso!';
        this.carregar();
        setTimeout(() => this.mensagemSucesso = '', 3500);
      },
      error: () => {
        this.mensagemErro = 'Erro ao excluir cliente.';
        setTimeout(() => this.mensagemErro = '', 3500);
      }
    });
  }
}