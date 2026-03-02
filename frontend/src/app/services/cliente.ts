import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http   = inject(HttpClient);
  private apiUrl = '/clientes';

  listarClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  buscarClientePorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  cadastrarCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente);
  }

  atualizarCliente(id: number, cliente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cliente);
  }

  excluirCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}