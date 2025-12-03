package com.example.safestock.application.port.out;

import com.example.safestock.domain.enuns.StatusAlerta;
import com.example.safestock.domain.model.HistoricoAlertas;
import com.example.safestock.domain.model.Produto;

import java.time.LocalDateTime;
import java.util.List;

public interface HistoricoAlertasRepository {

    HistoricoAlertas save (HistoricoAlertas historicoAlertas);
    
    List<HistoricoAlertas> findAll();
    
    boolean existsByProdutoAndStatusAndDataHoraAfter(Produto produto, StatusAlerta status, LocalDateTime dataHora);
    
    void deleteByProduto(Produto produto);
}
