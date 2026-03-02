import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private authService = inject(AuthService);
  private router      = inject(Router);

  get nomeCliente(): string {
    return this.authService.getClienteLogado()?.nome?.split(' ')[0] || 'Cliente';
  }

  sair(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}