package com.example.safestock.application.port.out;

import com.example.safestock.domain.model.HistoricoAlertas;

import java.util.List;

public interface HistoricoAlertasRepository {

    HistoricoAlertas save (HistoricoAlertas historicoAlertas);
    
    List<HistoricoAlertas> findAll();
}
