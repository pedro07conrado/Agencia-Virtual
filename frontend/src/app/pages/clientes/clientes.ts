import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Navbar } from '../../components/navbar/navbar';


@Component({
  selector: 'app-clientes',
  imports: [Header, Navbar],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class ClientesComponent {

}
