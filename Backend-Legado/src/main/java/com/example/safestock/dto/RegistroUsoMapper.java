package com.example.safestock.dto;

import com.example.safestock.model.RegistroUso;

import java.util.LinkedHashMap;
import java.util.Map;

public class RegistroUsoMapper {

    public static Map<String, Object> toMap(RegistroUso registroUso) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("ID", registroUso.getId());
        map.put("Produto", registroUso.getProduto());
        map.put("Quantidade", registroUso.getQuantidade());
        map.put("Funcionário", registroUso.getFuncionario() != null ? registroUso.getFuncionario().getNome() : null);
        map.put("Data de Saída", registroUso.getDataHoraSaida());
        return map;
    }
}
