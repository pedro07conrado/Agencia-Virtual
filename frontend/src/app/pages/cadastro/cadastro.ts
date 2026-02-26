import { Component, inject } from '@angular/core'; // 1. Adicionamos o 'inject' aqui!
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'; 
import { ClienteService } from '../../services/cliente';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class CadastroComponent { // 2. Arrumamos o nome para CadastroComponent
  
  // 3. Chamamos o "Mensageiro" para dentro desta tela
  private clienteService = inject(ClienteService);

  cadastroForm = new FormGroup({
    nome: new FormControl(''), 
    cpf: new FormControl('')   
  });

  fazerCadastro() {
    const dadosFormulario = this.cadastroForm.value;
    console.log("Preparando para enviar ao Java:", dadosFormulario);

    // 4. Usamos o Service para disparar o POST para o localhost:8080!
    // O '.subscribe()' avisa o Angular para ficar esperando a resposta do Java.
    this.clienteService.cadastrarCliente(dadosFormulario).subscribe({
      next: (resposta) => {
        // Se o Java retornar sucesso (200 OK)
        alert('Cliente cadastrado com sucesso! 🎉');
        console.log('Sucesso:', resposta);
        this.cadastroForm.reset(); // Limpa as caixinhas da tela
      },
      error: (erro) => {
        // Se o Java estiver desligado ou der erro
        alert('Opa, deu erro ao salvar! Olha o console (F12) para ver os detalhes.');
        console.error('Erro detalhado:', erro);
      }
    });
  }
}