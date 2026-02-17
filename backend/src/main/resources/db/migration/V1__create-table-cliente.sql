CREATE TABLE clientes (
                          id BIGINT AUTO_INCREMENT NOT NULL,
                          nome VARCHAR(100) NOT NULL,
                          cpf VARCHAR(14) NOT NULL UNIQUE,
                          email VARCHAR(100) NOT NULL,
                          telefone VARCHAR(20),


                          logradouro VARCHAR(255),
                          bairro VARCHAR(100),
                          cep VARCHAR(9),
                          numero VARCHAR(20),
                          complemento VARCHAR(255),
                          cidade VARCHAR(100),
                          uf CHAR(2),

                          PRIMARY KEY (id)
);