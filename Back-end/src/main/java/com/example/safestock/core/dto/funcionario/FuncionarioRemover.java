package com.example.safestock.core.dto.funcionario;

import io.swagger.v3.oas.annotations.media.Schema;

public class FuncionarioRemover {
    @Schema(description = "Id do usuário", example = "1")
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
