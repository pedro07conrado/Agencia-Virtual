package com.agenciavirtual.backend.service;

import com.agenciavirtual.backend.dto.FaturaDTO;
import com.agenciavirtual.backend.model.Fatura;
import com.agenciavirtual.backend.repository.FaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FaturaService {

    @Autowired
    private FaturaRepository repository;

    public Fatura cadastrar(FaturaDTO dados) {
        Fatura novaFatura = new Fatura(dados);
        return repository.save(novaFatura);
    }

    public List<Fatura> listarTodas() {
        return repository.findAll();
    }

    public Fatura buscarPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Fatura não encontrada!"));
    }

    public Fatura atualizar(Long id, FaturaDTO dados) {
        Fatura faturaExistente = buscarPorId(id);

        faturaExistente.setUcId(dados.getUcId());
        faturaExistente.setMesReferencia(dados.getMesReferencia());
        faturaExistente.setConsumoM3(dados.getConsumoM3());
        faturaExistente.setValor(dados.getValor());
        faturaExistente.setVencimento(dados.getVencimento());
        faturaExistente.setStatus(dados.getStatus());

        return repository.save(faturaExistente);
    }

    public void excluir(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Fatura não encontrada para exclusão!");
        }
        repository.deleteById(id);
    }

    public List<Fatura> listarPorUc(Long ucId) {
        return repository.findByUcId(ucId);
    }
}