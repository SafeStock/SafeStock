package com.example.safestock.dto;

import com.example.safestock.model.RegistroUso;

import java.time.LocalDateTime;

public record RegistroUsoRequestDTO(
        String produtoNome, // nome do produto como String
        int quantidade,
        LocalDateTime dataHoraSaida,
        Long funcionarioId
) {
    public RegistroUso toRegistroUso() {
        RegistroUso registro = new RegistroUso();
        registro.setProduto(this.produtoNome); // String
        registro.setQuantidade(this.quantidade);
        registro.setDataHoraSaida(this.dataHoraSaida);
        return registro;
    }
}

