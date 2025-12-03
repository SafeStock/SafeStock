package com.example.safestock.adapter.inbound.dto;

import java.util.List;

public class ExportRequestDTO {
    private List<String> relatorios;
    private String month; // formato yyyy-MM

    public ExportRequestDTO() {
    }

    public ExportRequestDTO(List<String> relatorios, String month) {
        this.relatorios = relatorios;
        this.month = month;
    }

    public List<String> getRelatorios() {
        return relatorios;
    }

    public void setRelatorios(List<String> relatorios) {
        this.relatorios = relatorios;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }
}
