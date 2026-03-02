package com.agenciavirtual.backend.repository;

import com.agenciavirtual.backend.model.Fatura;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FaturaRepository extends JpaRepository<Fatura, Long> {
    List<Fatura> findByUcId(Long ucId);
}
