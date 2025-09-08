package com.example.safestock.application.service;

import com.example.safestock.application.port.in.HistoricoAlertasUseCase;
import com.example.safestock.application.port.out.HistoricoAlertasRepository;
import com.example.safestock.domain.model.HistoricoAlertas;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("historicoAlertasServiceV2")
public class HistoricoAlertasService implements HistoricoAlertasUseCase {

    private final HistoricoAlertasRepository historicoAlertasRepository;

    public HistoricoAlertasService(@Qualifier("historicoAlertasRepositoryImpl") HistoricoAlertasRepository historicoAlertasRepository) {
        this.historicoAlertasRepository = historicoAlertasRepository;
    }

    @Override
    public HistoricoAlertas criar(HistoricoAlertas historicoAlertas) {
        // Regras de negócio aqui (ex: validações)
        return historicoAlertasRepository.save(historicoAlertas);
    }
}
