package com.agenciavirtual.backend.services;

import com.agenciavirtual.backend.dto.ClienteDTO;
import com.agenciavirtual.backend.model.Cliente;
import com.agenciavirtual.backend.model.Endereco;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.agenciavirtual.backend.repository.ClienteRepository;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    public Cliente cadastrar(ClienteDTO dados) {

        if (repository.existsByCpf(dados.getCpf())){
            throw new RuntimeException("Erro: esse CPF já existe no sistema!");
        }
        Cliente novocliente = new Cliente(dados);
        return repository.save(novocliente);
    }

    public List<Cliente> listarTodos() {
        return repository.findAll();
    }

    public Cliente atualizar(Long id, ClienteDTO dados) {
        Cliente clienteExistente = repository.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));

        clienteExistente.setNome(dados.getNome());
        clienteExistente.setEmail(dados.getEmail());
        clienteExistente.setTelefone(dados.getTelefone());

        if (dados.getEndereco() != null) {
            clienteExistente.setEndereco(new Endereco(dados.getEndereco()));
        }

        return repository.save(clienteExistente);
    }

    public void excluir(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Cliente não encontrado para exclusão!");
        }
        repository.deleteById(id);
    }

}
