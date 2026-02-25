import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'; // 1. Trazemos as ferramentas de formulário
import { ClienteService } from '../../services/cliente';
@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule], // 2. Avisamos o Angular que vamos usar formulários aqui
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  
  // 3. Criamos o nosso grupo de campos (o "espelho" do HTML)
  cadastroForm = new FormGroup({
    nome: new FormControl(''), // Começa vazio
    cpf: new FormControl('')   // Começa vazio
  });

  // 4. A função que vai rodar quando clicarmos no botão
  fazerCadastro() {
    // Por enquanto, vamos só imprimir no console para ter certeza que capturou!
    console.log("Os dados digitados foram:", this.cadastroForm.value);
  }
}