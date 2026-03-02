package com.agenciavirtual.backend.service;

import com.agenciavirtual.backend.dto.AuthDTO;
import com.agenciavirtual.backend.model.Cliente;
import com.agenciavirtual.backend.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private ClienteRepository repository;

    public Cliente login(AuthDTO dados) {
        Cliente cliente = repository.findByCpf(dados.getIdentificador())
                .or(() -> repository.findByEmail(dados.getIdentificador()))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        if (!cliente.getSenha().equals(dados.getSenha())) {
            throw new RuntimeException("Senha incorreta.");
        }

        return cliente;
    }
}