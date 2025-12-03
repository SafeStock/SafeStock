package com.example.safestock.application.service;

import com.example.safestock.application.port.in.HistoricoAlertasUseCase;
import com.example.safestock.application.port.out.HistoricoAlertasRepository;
import com.example.safestock.domain.enuns.StatusAlerta;
import com.example.safestock.domain.model.HistoricoAlertas;
import com.example.safestock.domain.model.PagedResult;
import com.example.safestock.domain.model.Produto;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    
    // Método para compatibilidade com código antigo
    public HistoricoAlertas cadastrarAlerta(HistoricoAlertas historicoAlertas) {
        return criar(historicoAlertas);
    }

    @Override
    public List<HistoricoAlertas> listar() {
        return historicoAlertasRepository.findAll();
    }

    @Override
    public PagedResult<HistoricoAlertas> listarPaginado(int page, int size) {
        List<HistoricoAlertas> all = new java.util.ArrayList<>(historicoAlertasRepository.findAll());
        
        // Ordena por data mais recente primeiro (DESC)
        all.sort((a1, a2) -> {
            if (a1.getDataHora() == null) return 1;
            if (a2.getDataHora() == null) return -1;
            return a2.getDataHora().compareTo(a1.getDataHora());
        });
        
        // Lógica de paginação no SERVICE (camada de aplicação)
        int start = page * size;
        int end = Math.min(start + size, all.size());
        
        if (start >= all.size()) {
            return new PagedResult<>(List.of(), page, size, all.size());
        }
        
        List<HistoricoAlertas> pageContent = all.subList(start, end);
        return new PagedResult<>(pageContent, page, size, all.size());
    }
    
    @Override
    public boolean existsByProdutoAndStatusAndDataHoraAfter(Produto produto, StatusAlerta status, LocalDateTime dataHora) {
        return historicoAlertasRepository.existsByProdutoAndStatusAndDataHoraAfter(produto, status, dataHora);
    }

    public List<java.util.Map<String, Object>> buscarAlertasComoMapa(String month) {
        java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("yyyy-MM");
        List<HistoricoAlertas> alertas = historicoAlertasRepository.findAll();
        return alertas.stream()
            .filter(alerta -> {
                if (month == null) return true;
                if (alerta.getDataHora() == null) return false;
                String dataHora = alerta.getDataHora().format(formatter);
                return dataHora.equals(month);
            })
            .map(alerta -> {
                java.util.Map<String, Object> map = new java.util.HashMap<>();
                map.put("Id", alerta.getId());
                map.put("Mensagem", alerta.getDescricao());
                map.put("Data e Hora", alerta.getDataHora());
                map.put("Status", alerta.getStatus());
                map.put("Produto", alerta.getNomeProduto() != null ? alerta.getNomeProduto() : "Não informado");
                return map;
            })
            .toList();
    }
}
