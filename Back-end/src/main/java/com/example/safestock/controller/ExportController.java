package com.example.safestock.controller;
import com.example.safestock.service.ExcelExportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/export")
public class ExportController {

    private final ExcelExportService excelExportService;

    public ExportController(ExcelExportService excelExportService) {
        this.excelExportService = excelExportService;
    }

    @PostMapping("/excel")
    public ResponseEntity<byte[]> exportToExcel(@RequestBody List<Map<String, Object>> data) {
        try {
            byte[] excelBytes = excelExportService.exportToExcel(data);

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=export.xlsx")
                    .body(excelBytes);

        } catch (IOException e) {
            return ResponseEntity.internalServerError()
                    .body(("Erro na exportação: " + e.getMessage()).getBytes());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(e.getMessage().getBytes());
        }
    }
}