package com.agenciavirtual.backend.model;

import com.agenciavirtual.backend.dto.FaturaDTO; // <-- ESSE IMPORT É FUNDAMENTAL!
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "faturas")
@Entity(name = "Fatura")
@EqualsAndHashCode(of = "id")
public class Fatura {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long ucId;
    private String mesReferencia;
    private Long consumoM3;
    private BigDecimal valor;
    private LocalDate vencimento;
    private String status;

    public Fatura(FaturaDTO dados) {
        this.ucId          = dados.getUcId();
        this.mesReferencia = dados.getMesReferencia();
        this.consumoM3     = dados.getConsumoM3();
        this.valor         = dados.getValor();
        this.vencimento    = dados.getVencimento();
        this.status        = dados.getStatus() != null ? dados.getStatus() : "PENDENTE";
    }
}