package com.example.safestock.service;

import com.example.safestock.model.HistoricoAlertas;
import com.example.safestock.model.Produto;
import com.example.safestock.model.enums.StatusAlerta;
import com.example.safestock.repository.HistoricoAlertasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

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

    public List<Map<String, Object>> buscarAlertasComoMapa(String month) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
        List<HistoricoAlertas> alertas = historicoAlertasRepository.findAll();
        return alertas.stream()
            .filter(alerta -> {
                if (month == null) return true;
                String dataHora = alerta.getDataHora().format(formatter);
                return dataHora.equals(month);
            })
            .map(alerta -> {
                Map<String, Object> map = new HashMap<>();
                map.put("Id", alerta.getId());
                map.put("Mensagem", alerta.getDescricao());
                map.put("Data e Hora", alerta.getDataHora());
                map.put("Status", alerta.getStatus());
                map.put("Produto", alerta.getProduto() != null ? alerta.getProduto().getNome() : "Não informado");
                return map;
            })
            .toList();
    }

    public Page<HistoricoAlertas> listarPaginado(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("dataHora").descending());
        return historicoAlertasRepository.findAll(pageable);
    }
}

