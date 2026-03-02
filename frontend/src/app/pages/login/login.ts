import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private authService = inject(AuthService);
  private router      = inject(Router);

  entrando = false;
  erro     = '';

  loginForm = new FormGroup({
    identificador: new FormControl('', [Validators.required]),
    senha:         new FormControl('', [Validators.required])
  });

  entrar(): void {
    this.erro = '';

    if (this.loginForm.invalid) {
      this.erro = 'Preencha o CPF/e-mail e a senha.';
      return;
    }

    const { identificador, senha } = this.loginForm.value;
    this.entrando = true;

    this.authService.login(identificador!, senha!).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.erro = 'CPF, e-mail ou senha inválidos.';
        this.entrando = false;
      }
    });
  }
}