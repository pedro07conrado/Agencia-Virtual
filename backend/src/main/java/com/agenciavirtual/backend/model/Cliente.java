package com.agenciavirtual.backend.model;


import com.agenciavirtual.backend.dto.ClienteDTO;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "clientes")
@Entity(name = "Cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Cliente {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cpf;
    private String email;
    private String telefone;
    private String senha;

    @Embedded
    private Endereco endereco;

    public Cliente(ClienteDTO dados) {
        this.nome     = dados.getNome();
        this.cpf      = dados.getCpf();
        this.email    = dados.getEmail();
        this.telefone = dados.getTelefone();
        this.senha    = dados.getSenha();
        if (dados.getEndereco() != null) {
            this.endereco = new Endereco(dados.getEndereco());
        }
    }
}

