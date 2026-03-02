package com.agenciavirtual.backend.repository;

import com.agenciavirtual.backend.model.UnidadeControle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UnidadeControleRepository extends JpaRepository<UnidadeControle, Long> {
    boolean existsByCodUn(String codUn);
    List<UnidadeControle> findByClienteId(Long clienteId);
}
