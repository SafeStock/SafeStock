package com.example.safestock.application.port.out;

import com.example.safestock.domain.model.HistoricoAlertas;

public interface HistoricoAlertasRepository {

    HistoricoAlertas save (HistoricoAlertas historicoAlertas);
}
