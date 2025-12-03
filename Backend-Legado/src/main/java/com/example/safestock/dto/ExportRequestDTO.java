package com.example.safestock.dto;

public class ExportRequestDTO {
    private String table;
    private String month;

    public String getTable() {
        return table;
    }
    public void setTable(String table) {
        this.table = table;
    }

    public String getMonth() {
        return month;
    }
    public void setMonth(String month) {
        this.month = month;
    }
}
