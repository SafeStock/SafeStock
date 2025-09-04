package com.example.safestock.dto;

import com.example.safestock.model.RegistroUso;

import java.time.LocalDateTime;

public record RegistroUsoDTO(
        Long id,
        String produto,
        int quantidade,
        String funcionarioNome,
        LocalDateTime dataHoraSaida


) {
    public RegistroUsoDTO(RegistroUso registroUso) {
        this(
                registroUso.getId(),
                registroUso.getProduto(),
                registroUso.getQuantidade(),
                registroUso.getFuncionario() != null ? registroUso.getFuncionario().getNome() : null, // funcionarioNome
                registroUso.getDataHoraSaida()
        );
    }

}

