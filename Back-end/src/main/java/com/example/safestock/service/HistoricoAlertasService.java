package com.example.safestock.service;

import com.example.safestock.model.HistoricoAlertas;
import com.example.safestock.repository.HistoricoAlertasRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

@Service
public class HistoricoAlertasService {
    private final HistoricoAlertasRepository historicoAlertasRepository;

    public HistoricoAlertasService(HistoricoAlertasRepository historicoAlertasRepository) {
        this.historicoAlertasRepository = historicoAlertasRepository;
    }

    public HistoricoAlertas cadastrarAlerta(@RequestBody HistoricoAlertas historico){
        return historicoAlertasRepository.save(historico);
    }

    public List<HistoricoAlertas> listarHistorico (){
        return historicoAlertasRepository.findAll();
    }
}
