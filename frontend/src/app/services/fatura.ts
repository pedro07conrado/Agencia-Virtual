import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FaturaService {

  private http   = inject(HttpClient);
  private apiUrl = '/faturas';

  listarFaturas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  listarPorUc(ucId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/por-uc/${ucId}`);
  }

  cadastrarFatura(fatura: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, fatura);
  }

  atualizarFatura(id: number, fatura: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, fatura);
  }

  excluirFatura(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}