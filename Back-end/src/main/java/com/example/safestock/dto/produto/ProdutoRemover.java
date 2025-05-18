package com.example.safestock.dto.produto;

import io.swagger.v3.oas.annotations.media.Schema;

public class ProdutoRemover {

    @Schema(description = "Id do produto", example = "1")
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
