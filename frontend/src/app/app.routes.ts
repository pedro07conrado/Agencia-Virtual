import { Routes } from '@angular/router';
import { Login } from './pages/login/login'; 
import { CadastroComponent } from './pages/cadastro/cadastro';
import { ClientesComponent } from './pages/clientes/clientes';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } 
];