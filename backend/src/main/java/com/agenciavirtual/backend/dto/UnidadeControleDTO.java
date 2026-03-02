package com.agenciavirtual.backend.dto;

import com.agenciavirtual.backend.model.Endereco;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UnidadeControleDTO {

    @NotBlank
    private String codUn;

    @NotBlank
    private String categoriaTarifa;

    @NotNull
    private Long clienteId;

    @Valid
    private EnderecoDTO endereco;
}
