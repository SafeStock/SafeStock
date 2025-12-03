package com.example.safestock.application.port.in;

import com.example.safestock.domain.enuns.StatusAlerta;
import com.example.safestock.domain.model.HistoricoAlertas;
import com.example.safestock.domain.model.PagedResult;
import com.example.safestock.domain.model.Produto;

import java.time.LocalDateTime;
import java.util.List;

public interface HistoricoAlertasUseCase {

    HistoricoAlertas criar(HistoricoAlertas historicoAlertas);
    
    List<HistoricoAlertas> listar();
    
    /**
     * Busca histórico de alertas paginado.
     * @param page Número da página (zero-based)
     * @param size Tamanho da página
     * @return Resultado paginado
     */
    PagedResult<HistoricoAlertas> listarPaginado(int page, int size);
    
    boolean existsByProdutoAndStatusAndDataHoraAfter(Produto produto, StatusAlerta status, LocalDateTime dataHora);
}
