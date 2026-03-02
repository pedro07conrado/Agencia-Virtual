package com.agenciavirtual.backend.controller;


import com.agenciavirtual.backend.dto.UnidadeControleDTO;
import com.agenciavirtual.backend.model.UnidadeControle;
import com.agenciavirtual.backend.service.UnidadeControleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{id}")
    public ResponseEntity<Object> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.buscarPorId(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<UnidadeControle>> listar() {
        List<UnidadeControle> unidades = service.listarTodas();
        return ResponseEntity.ok(unidades);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizar(@PathVariable Long id, @RequestBody UnidadeControleDTO dados) {
        try {
            UnidadeControle unidadeAtualizada = service.atualizar(id, dados);
            return ResponseEntity.ok(unidadeAtualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> excluir(@PathVariable Long id) {
        try {
            service.excluir(id);
            return ResponseEntity.noContent().build(); // Retorna Status 204 (Sucesso, sem conteúdo)
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/por-cliente/{clienteId}")
    public ResponseEntity<List<UnidadeControle>> listarPorCliente(@PathVariable Long clienteId) {
        return ResponseEntity.ok(service.listarPorCliente(clienteId));
    }
}
