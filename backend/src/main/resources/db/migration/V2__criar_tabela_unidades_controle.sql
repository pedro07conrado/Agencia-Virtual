CREATE TABLE unidades_controle (
       id BIGINT AUTO_INCREMENT NOT NULL,
        cod_un VARCHAR(50) NOT NULL UNIQUE,
        categoria_tarifa VARCHAR(100) NOT NULL,
        cliente_id BIGINT NOT NULL,


        logradouro VARCHAR(255),
        bairro VARCHAR(100),
        cep VARCHAR(9),
        numero VARCHAR(20),
        complemento VARCHAR(255),
        cidade VARCHAR(100),
        uf CHAR(2),

        PRIMARY KEY (id)
);