package com.example.safestock.adapter.inbound.dto;

public class KpiQtd {
    private Long qtd;

    public KpiQtd() {
    }

    public KpiQtd(Long qtd) {
        this.qtd = qtd;
    }

    public Long getQtd() {
        return qtd;
    }

    public void setQtd(Long qtd) {
        this.qtd = qtd;
    }
}
