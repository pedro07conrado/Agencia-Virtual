package com.agenciavirtual.backend.repository;

import com.agenciavirtual.backend.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {


    boolean existsByCpf(String cpf);
}
