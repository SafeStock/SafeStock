package com.example.safestock.dto.produto;


import java.time.LocalDate;
import java.time.LocalDateTime;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record RegistroUsoRequestDTO(
        @NotBlank String produto,
        @NotNull @Positive Integer quantidade,
        LocalDateTime dataHoraSaida,
        @NotNull Long funcionarioId
) {}