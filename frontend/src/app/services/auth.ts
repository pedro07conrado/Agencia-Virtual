import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http   = inject(HttpClient);
  private apiUrl = '/auth';

  login(identificador: string, senha: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/login`, { identificador, senha }).pipe(
    tap(cliente => {
      localStorage.setItem('clienteLogado', JSON.stringify(cliente));
    })
  );
}

  logout(): void {
    localStorage.removeItem('clienteLogado');
  }

  getClienteLogado(): any {
    const dados = localStorage.getItem('clienteLogado');
    return dados ? JSON.parse(dados) : null;
  }

  isLogado(): boolean {
    return !!localStorage.getItem('clienteLogado');
  }
}