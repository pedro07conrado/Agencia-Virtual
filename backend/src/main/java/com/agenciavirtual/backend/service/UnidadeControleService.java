package com.agenciavirtual.backend.service;


import com.agenciavirtual.backend.dto.UnidadeControleDTO;
import com.agenciavirtual.backend.model.Endereco;
import com.agenciavirtual.backend.model.UnidadeControle;
import com.agenciavirtual.backend.repository.UnidadeControleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnidadeControleService {

    @Autowired
    private UnidadeControleRepository repository;

    public UnidadeControle cadastrar (UnidadeControleDTO dados){

        if(repository.existsByCodUn(dados.getCodUn())){
            throw new RuntimeException("Erro: Unidade já cadastrada com esse código");
        }

        UnidadeControle novaUnidade = new UnidadeControle(dados);
        return repository.save(novaUnidade);
    }

    public UnidadeControle buscarPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Unidade de Controle não encontrada!"));
    }

    public List<UnidadeControle> listarTodas() {
        return repository.findAll();
    }

    public UnidadeControle atualizar(Long id, UnidadeControleDTO dados) {
        UnidadeControle unidadeExistente = buscarPorId(id);

        unidadeExistente.setClienteId(dados.getClienteId());
        unidadeExistente.setCategoriaTarifa(dados.getCategoriaTarifa());

        if (dados.getEndereco() != null) {
            unidadeExistente.setEndereco(new Endereco(dados.getEndereco()));
        }

        return repository.save(unidadeExistente);
    }

    public void excluir(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Unidade de Controle não encontrada para exclusão!");
        }
        repository.deleteById(id);
    }

    public List<UnidadeControle> listarPorCliente(Long clienteId) {
        return repository.findByClienteId(clienteId);
    }
}
