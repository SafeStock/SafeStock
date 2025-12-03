package com.example.safestock.application.port.out;

import com.example.safestock.domain.model.Relatorio;

public interface RelatorioRepository {

    Relatorio save(Relatorio relatorio);
}
