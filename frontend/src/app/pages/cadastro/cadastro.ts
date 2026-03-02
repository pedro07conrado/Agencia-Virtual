import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ClienteService } from '../../services/cliente';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class CadastroComponent {

  private clienteService = inject(ClienteService);

  etapaAtual    = 1;
  salvando      = false;
  mostrarErros  = false;
  mensagemErro  = '';
  mensagemSucesso = '';

  // ===== ETAPA 1 — Dados pessoais =====
  etapa1Form = new FormGroup({
    nome:           new FormControl('', [Validators.required]),
    cpf:            new FormControl('', [Validators.required]),
    telefone:       new FormControl(''),
    email:          new FormControl(''),
    senha:          new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmarSenha: new FormControl('', [Validators.required])
  });

  // ===== ETAPA 2 — Endereço =====
  etapa2Form = new FormGroup({
    cep:         new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
    uf:          new FormControl('', [Validators.required]),
    logradouro:  new FormControl('', [Validators.required]),
    numero:      new FormControl('', [Validators.required]),
    complemento: new FormControl(''),
    bairro:      new FormControl('', [Validators.required]),
    cidade:      new FormControl('', [Validators.required])
  });

  avancarEtapa(): void {
    this.mensagemErro = '';
    this.mostrarErros = true;

    if (this.etapa1Form.invalid) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    const f = this.etapa1Form.value;
    if (f.senha !== f.confirmarSenha) {
      this.mensagemErro = 'As senhas não coincidem.';
      return;
    }

    this.mostrarErros = false;
    this.mensagemErro = '';
    this.etapaAtual = 2;
  }

  voltarEtapa(): void {
    this.mostrarErros = false;
    this.mensagemErro = '';
    this.etapaAtual = 1;
  }

  fazerCadastro(): void {
    this.mensagemErro = '';
    this.mostrarErros = true;

    if (this.etapa2Form.invalid) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    const e1 = this.etapa1Form.value;
    const e2 = this.etapa2Form.value;

    const payload = {
      nome:     e1.nome,
      cpf:      e1.cpf,
      email:    e1.email,
      telefone: e1.telefone,
      senha:    e1.senha,
      endereco: {
        cep:         e2.cep,
        uf:          e2.uf,
        logradouro:  e2.logradouro,
        numero:      e2.numero,
        complemento: e2.complemento,
        bairro:      e2.bairro,
        cidade:      e2.cidade
      }
    };

    this.salvando = true;

    this.clienteService.cadastrarCliente(payload).subscribe({
      next: () => {
        this.mensagemSucesso = 'Conta criada com sucesso! Faça login para continuar.';
        this.etapa1Form.reset();
        this.etapa2Form.reset();
        this.etapaAtual = 1;
        this.mostrarErros = false;
        this.salvando = false;
      },
      error: (err) => {
        this.mensagemErro = err.error || 'Erro ao cadastrar. Tente novamente.';
        this.salvando = false;
      }
    });
  }
}