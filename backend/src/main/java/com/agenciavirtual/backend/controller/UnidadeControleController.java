package com.agenciavirtual.backend.controller;


import com.agenciavirtual.backend.dto.UnidadeControleDTO;
import com.agenciavirtual.backend.model.UnidadeControle;
import com.agenciavirtual.backend.services.UnidadeControleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/unidades")
public class UnidadeControleController {

    @Autowired
    private UnidadeControleService service;

    @PostMapping
    public ResponseEntity<Object> cadastrar(@RequestBody @Valid UnidadeControleDTO dados) {
        try {
            UnidadeControle unidadeSalva = service.cadastrar(dados);
            return ResponseEntity.status(HttpStatus.CREATED).body(unidadeSalva);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
