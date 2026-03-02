import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnidadeService {

  private http   = inject(HttpClient);
  private apiUrl = '/unidades';

  listarUnidades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  listarPorCliente(clienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/por-cliente/${clienteId}`);
  }

  cadastrarUnidade(unidade: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, unidade);
  }

  atualizarUnidade(id: number, unidade: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, unidade);
  }

  excluirUnidade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}