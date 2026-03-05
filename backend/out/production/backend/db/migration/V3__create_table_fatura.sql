CREATE TABLE faturas (
                         id             BIGINT AUTO_INCREMENT NOT NULL,
                         uc_id          BIGINT         NOT NULL,
                         mes_referencia VARCHAR(7)     NOT NULL,
                         consumom3     BIGINT,
                         valor          DECIMAL(10,2)  NOT NULL,
                         vencimento     DATE           NOT NULL,
                         status         VARCHAR(20)    NOT NULL DEFAULT 'PENDENTE',

                         PRIMARY KEY (id),
                         CONSTRAINT fk_fatura_uc FOREIGN KEY (uc_id) REFERENCES unidades_controle(id)
);