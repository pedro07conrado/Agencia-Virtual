package com.agenciavirtual.backend.controller;

import com.agenciavirtual.backend.dto.FaturaDTO;
import com.agenciavirtual.backend.model.Fatura;
import com.agenciavirtual.backend.service.FaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/faturas")
public class FaturaController {

    @Autowired
    private FaturaService service;

    @PostMapping
    public ResponseEntity<Fatura> cadastrar(@RequestBody FaturaDTO dados) {
        try {
            Fatura faturaSalva = service.cadastrar(dados);
            return ResponseEntity.status(HttpStatus.CREATED).body(faturaSalva);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Fatura>> listar() {
        List<Fatura> faturas = service.listarTodas();
        return ResponseEntity.ok(faturas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.buscarPorId(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizar(@PathVariable Long id, @RequestBody FaturaDTO dados) {
        try {
            Fatura faturaAtualizada = service.atualizar(id, dados);
            return ResponseEntity.ok(faturaAtualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> excluir(@PathVariable Long id) {
        try {
            service.excluir(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/por-uc/{ucId}")
    public ResponseEntity<List<Fatura>> listarPorUc(@PathVariable Long ucId) {
        return ResponseEntity.ok(service.listarPorUc(ucId));
    }
}