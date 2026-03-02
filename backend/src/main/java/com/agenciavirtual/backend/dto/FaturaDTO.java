    package com.agenciavirtual.backend.dto;

    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;

    import java.math.BigDecimal;
    import java.time.LocalDate;

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public class FaturaDTO {

        private Long ucId;
        private String mesReferencia;
        private Long consumoM3;
        private BigDecimal valor;
        private LocalDate vencimento;
        private String status;
    }
