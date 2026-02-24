import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  //  Aqui nós "injetamos" o HttpClient 
  private http = inject(HttpClient);

   //  URL do backend Java
  private apiUrl = 'http://localhost:8080/clientes';

  listarClientes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  cadastrarCliente(cliente: any): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }
}