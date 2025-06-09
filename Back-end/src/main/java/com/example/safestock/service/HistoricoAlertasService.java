package com.example.safestock.service;

import com.example.safestock.model.HistoricoAlertas;
import com.example.safestock.model.Produto;
import com.example.safestock.model.enums.StatusAlerta;
import com.example.safestock.repository.HistoricoAlertasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HistoricoAlertasService {
    private final HistoricoAlertasRepository historicoAlertasRepository;

    public HistoricoAlertasService(HistoricoAlertasRepository historicoAlertasRepository) {
        this.historicoAlertasRepository = historicoAlertasRepository;
    }


    // Remova a anotação @RequestBody
    public HistoricoAlertas cadastrarAlerta(HistoricoAlertas historico){
        return historicoAlertasRepository.save(historico);
    }

    // Adicione este método para buscar alertas recentes
    public List<HistoricoAlertas> findAlertasRecentes() {
        LocalDateTime umMesAtras = LocalDateTime.now().minusMonths(1);
        return historicoAlertasRepository.findByDataHoraAfter(umMesAtras);
    }

    public List<HistoricoAlertas> listarHistorico (){
        return historicoAlertasRepository.findAll();
    }

    public boolean existsByProdutoAndStatusAndDataHoraAfter(Produto produto, StatusAlerta status, LocalDateTime dataHora) {
        return historicoAlertasRepository.existsByProdutoAndStatusAndDataHoraAfter(produto, status, dataHora);
    }

}

