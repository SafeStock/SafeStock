package com.example.safestock.dto;

import com.example.safestock.model.HistoricoAlertas;

import java.util.LinkedHashMap;
import java.util.Map;

public class HistoricoAlertasMapper {

    public static Map<String, Object> toMap(HistoricoAlertas alerta) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("ID", alerta.getId());
        map.put("Produto", alerta.getProduto().getNome());
        map.put("Status", alerta.getStatus());
        map.put("Data e Hora", alerta.getDataHora());
        map.put("Descrição", alerta.getDescricao()); // se houver
        return map;
    }
}
