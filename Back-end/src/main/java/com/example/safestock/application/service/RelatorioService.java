package com.example.safestock.application.service;

import com.example.safestock.application.port.in.RelatorioUseCase;
import com.example.safestock.application.port.out.RelatorioRepository;
import com.example.safestock.domain.model.Relatorio;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("relatorioServiceV2")
public class RelatorioService implements RelatorioUseCase {

    private final RelatorioRepository relatorioRepository;

    public RelatorioService(@Qualifier("relatorioRepositoryImpl") RelatorioRepository relatorioRepository) {
        this.relatorioRepository = relatorioRepository;
    }

    @Override
    public Relatorio criar(Relatorio relatorio) {
        // Regras de negócio aqui (ex: validações)
        return relatorioRepository.save(relatorio);
    }
}
