package com.example.safestock.application.service;

import com.example.safestock.application.port.in.HistoricoAlertasUseCase;
import com.example.safestock.application.port.out.HistoricoAlertasRepository;
import com.example.safestock.domain.model.HistoricoAlertas;
import com.example.safestock.domain.model.PagedResult;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoricoAlertasService implements HistoricoAlertasUseCase {

    private final HistoricoAlertasRepository historicoAlertasRepository;

    public HistoricoAlertasService(HistoricoAlertasRepository historicoAlertasRepository) {
        this.historicoAlertasRepository = historicoAlertasRepository;
    }

    @Override
    public HistoricoAlertas criar(HistoricoAlertas historicoAlertas) {
        // Regras de negócio aqui (ex: validações)
        return historicoAlertasRepository.save(historicoAlertas);
    }

    @Override
    public List<HistoricoAlertas> listar() {
        return historicoAlertasRepository.findAll();
    }

    @Override
    public PagedResult<HistoricoAlertas> listarPaginado(int page, int size) {
        List<HistoricoAlertas> all = historicoAlertasRepository.findAll();
        
        // Lógica de paginação no SERVICE (camada de aplicação)
        int start = page * size;
        int end = Math.min(start + size, all.size());
        
        if (start >= all.size()) {
            return new PagedResult<>(List.of(), page, size, all.size());
        }
        
        List<HistoricoAlertas> pageContent = all.subList(start, end);
        return new PagedResult<>(pageContent, page, size, all.size());
    }
}
