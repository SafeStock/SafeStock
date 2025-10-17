package com.example.safestock.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class ExcelExportService {

    public byte[] exportToExcel(List<Map<String, Object>> data) throws IOException {
        if (data == null || data.isEmpty()) {
            throw new IllegalArgumentException("Nenhum dado fornecido para exportação.");
        }

        if (data.stream().anyMatch(row -> row.values().stream().anyMatch(value -> value == null))) {
            throw new IllegalArgumentException("Os dados contêm valores nulos que não podem ser exportados.");
        }

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Exportação");

            // Criar cabeçalho
            Row headerRow = sheet.createRow(0);
            Map<String, Object> firstRow = data.get(0);
            int headerCol = 0;
            for (String key : firstRow.keySet()) {
                Cell cell = headerRow.createCell(headerCol++);
                cell.setCellValue(key);
            }

            // Preencher dados
            int rowIdx = 1;
            for (Map<String, Object> rowData : data) {
                Row row = sheet.createRow(rowIdx++);
                int colIdx = 0;
                for (Object value : rowData.values()) {
                    Cell cell = row.createCell(colIdx++);
                    if (value != null) {
                        cell.setCellValue(value.toString());
                    }
                }
            }

            workbook.write(out);
            return out.toByteArray();
        }
    }

    public byte[] gerarExcelComEstilos(List<Map<String, Object>> dados, String[] titulos) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Relatório");

        // Estilizar cabeçalhos
        Row headerRow = sheet.createRow(0);
        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        Font font = workbook.createFont();
        font.setColor(IndexedColors.WHITE.getIndex());
        font.setBold(true);
        headerStyle.setFont(font);

        for (int i = 0; i < titulos.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(titulos[i]);
            cell.setCellStyle(headerStyle);
        }

        // Estilizar células de dados
        CellStyle dataStyle = workbook.createCellStyle();
        dataStyle.setBorderBottom(BorderStyle.THIN);
        dataStyle.setBorderTop(BorderStyle.THIN);
        dataStyle.setBorderLeft(BorderStyle.THIN);
        dataStyle.setBorderRight(BorderStyle.THIN);

        // Adicionar dados
        int rowIndex = 1;
        for (Map<String, Object> rowData : dados) {
            Row row = sheet.createRow(rowIndex++);
            int colIndex = 0;
            for (Object value : rowData.values()) {
                Cell cell = row.createCell(colIndex++);
                cell.setCellValue(value != null ? value.toString() : "");
                cell.setCellStyle(dataStyle);
            }
        }

        // Ajustar largura das colunas
        for (int i = 0; i < titulos.length; i++) {
            sheet.autoSizeColumn(i);
        }

        // Salvar em um array de bytes
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();
        return out.toByteArray();
    }

    public byte[] gerarExcelConsolidado(Map<String, List<Map<String, Object>>> dadosPorRelatorio) throws IOException {
        if (dadosPorRelatorio == null || dadosPorRelatorio.isEmpty()) {
            throw new IllegalArgumentException("Nenhum dado fornecido para exportação.");
        }

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            // Estilo para cabeçalhos
            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            Font font = workbook.createFont();
            font.setColor(IndexedColors.WHITE.getIndex());
            font.setBold(true);
            headerStyle.setFont(font);

            // Estilo para células de dados
            CellStyle dataStyle = workbook.createCellStyle();
            dataStyle.setBorderBottom(BorderStyle.THIN);
            dataStyle.setBorderTop(BorderStyle.THIN);
            dataStyle.setBorderLeft(BorderStyle.THIN);
            dataStyle.setBorderRight(BorderStyle.THIN);

            for (Map.Entry<String, List<Map<String, Object>>> entry : dadosPorRelatorio.entrySet()) {
                String nomeRelatorio = entry.getKey();
                List<Map<String, Object>> dados = entry.getValue();

                if (dados == null || dados.isEmpty()) {
                    throw new IllegalArgumentException("Dados inválidos para o relatório: " + nomeRelatorio);
                }

                Sheet sheet = workbook.createSheet(nomeRelatorio);

                // Criar cabeçalhos
                Row headerRow = sheet.createRow(0);
                String[] titulos = dados.get(0).keySet().toArray(new String[0]);
                for (int i = 0; i < titulos.length; i++) {
                    Cell cell = headerRow.createCell(i);
                    cell.setCellValue(titulos[i]);
                    cell.setCellStyle(headerStyle);
                }

                // Adicionar dados
                int rowIndex = 1;
                for (Map<String, Object> rowData : dados) {
                    Row row = sheet.createRow(rowIndex++);
                    int colIndex = 0;
                    for (Object value : rowData.values()) {
                        Cell cell = row.createCell(colIndex++);
                        cell.setCellValue(value != null ? value.toString() : "");
                        cell.setCellStyle(dataStyle);
                    }
                }

                // Ajustar largura das colunas
                for (int i = 0; i < titulos.length; i++) {
                    sheet.autoSizeColumn(i);
                }
            }

            workbook.write(out);
            return out.toByteArray();
        } catch (Exception e) {
            throw new IOException("Erro ao gerar o arquivo Excel consolidado: " + e.getMessage(), e);
        }
    }
}
