import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { CadastroComponent } from './pages/cadastro/cadastro';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { AdminComponent } from './pages/admin/admin';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login',     component: Login },
  { path: 'cadastro',  component: CadastroComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'admin',     component: AdminComponent },
  { path: '',          redirectTo: '/login', pathMatch: 'full' }
];