package com.agenciavirtual.backend.services;


import com.agenciavirtual.backend.dto.UnidadeControleDTO;
import com.agenciavirtual.backend.model.UnidadeControle;
import com.agenciavirtual.backend.repository.UnidadeControleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
