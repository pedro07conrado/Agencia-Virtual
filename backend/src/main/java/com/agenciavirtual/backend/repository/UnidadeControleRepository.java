package com.agenciavirtual.backend.repository;

import com.agenciavirtual.backend.model.UnidadeControle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnidadeControleRepository extends JpaRepository <UnidadeControle, Long> {

    boolean existsByCodUn(String codUn);
}
