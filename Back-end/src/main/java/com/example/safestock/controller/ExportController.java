package com.example.safestock.controller;

import com.example.safestock.dto.ExportRequestDTO;
import com.example.safestock.service.ExcelExportService;
import com.example.safestock.service.ProdutoService;
import com.example.safestock.service.RegistroUsoService;
import com.example.safestock.service.HistoricoAlertasService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/export")
public class ExportController {

    private final ExcelExportService excelExportService;
    private final ProdutoService produtoService;
    private final RegistroUsoService registroUsoService;
    private final HistoricoAlertasService historicoAlertasService;

    public ExportController(
            ExcelExportService excelExportService,
            ProdutoService produtoService,
            RegistroUsoService registroUsoService,
            HistoricoAlertasService historicoAlertasService) {
        this.excelExportService = excelExportService;
        this.produtoService = produtoService;
        this.registroUsoService = registroUsoService;
        this.historicoAlertasService = historicoAlertasService;
    }

    @PostMapping("/excel")
    public ResponseEntity<byte[]> exportToExcel(@RequestBody List<ExportRequestDTO> requests) {
        try {
            if (requests == null || requests.isEmpty()) {
                return ResponseEntity.badRequest().body("Nenhuma tabela enviada.".getBytes());
            }

            ExportRequestDTO req = requests.get(0); // pega a primeira (no seu caso é só uma)
            String table = req.getTable();
            String month = req.getMonth();

            List<Map<String, Object>> data = getDataByTable(table, month);

            if (data.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            // Define headers for the Excel file
            String[] headers = data.get(0).keySet().toArray(new String[0]);

            // Use the styled method to generate the Excel file
            byte[] excelBytes = excelExportService.gerarExcelComEstilos(data, headers);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=" + table + "_" + (month != null ? month : "all") + ".xlsx")
                    .body(excelBytes);

        } catch (IOException e) {
            return ResponseEntity.internalServerError()
                    .body(("Erro ao gerar Excel: " + e.getMessage()).getBytes());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(("Erro inesperado: " + e.getMessage()).getBytes());
        }
    }

    private List<Map<String, Object>> getDataByTable(String table, String month) {
        switch (table.toLowerCase()) {
            case "produtos":
                return produtoService.buscarProdutosComoMapa(month);
            case "registro_uso":
                return registroUsoService.buscarRegistrosComoMapa(month);
            case "alertas":
            case "historicoalertas":
                return historicoAlertasService.buscarAlertasComoMapa(month);
            default:
                throw new IllegalArgumentException("Tabela desconhecida: " + table);
        }
    }

    @GetMapping("/consolidated")
    public ResponseEntity<byte[]> exportConsolidatedData(@RequestParam(required = false) String month) {
        try {
            Map<String, List<Map<String, Object>>> dadosPorRelatorio = new HashMap<>();

            dadosPorRelatorio.put("Produtos", produtoService.buscarProdutosComoMapa(month));
            dadosPorRelatorio.put("Registros de Uso", registroUsoService.buscarRegistrosComoMapa(month));
            dadosPorRelatorio.put("Alertas", historicoAlertasService.buscarAlertasComoMapa(month));

            if (dadosPorRelatorio.values().stream().allMatch(List::isEmpty)) {
                return ResponseEntity.status(204).body(null); // Retorna 204 No Content
            }

            byte[] excelBytes = excelExportService.gerarExcelConsolidado(dadosPorRelatorio);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=Relatorios_Todos_" + (month != null ? month : "all") + ".xlsx")
                    .body(excelBytes);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(("Erro nos dados fornecidos: " + e.getMessage()).getBytes());
        } catch (IOException e) {
            return ResponseEntity.internalServerError()
                    .body(("Erro ao gerar relatório consolidado: " + e.getMessage()).getBytes());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(("Erro inesperado: " + e.getMessage()).getBytes());
        }
    }
}
