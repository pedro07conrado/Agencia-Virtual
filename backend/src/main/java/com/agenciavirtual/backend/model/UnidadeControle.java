package com.agenciavirtual.backend.model;

import com.agenciavirtual.backend.dto.UnidadeControleDTO;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Table(name = "unidades_Controle")
@Entity(name = "unidadeControle")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class UnidadeControle {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codUn;
    private String categoriaTarifa;
    private String clienteId;

    @Embedded
    private Endereco endereco;

    public UnidadeControle (UnidadeControleDTO dados){
        this.codUn = dados.getCodUn();;
        this.categoriaTarifa = dados.getCategoriaTarifa();
        this.clienteId = dados.getClienteId();
        this.endereco = new Endereco(dados.getEndereco());
    }

}
