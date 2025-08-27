package com.example.safestock.core.application.usecase;

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
}
