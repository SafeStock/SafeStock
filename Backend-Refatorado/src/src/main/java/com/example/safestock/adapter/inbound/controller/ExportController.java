package com.example.safestock.adapter.inbound.controller;

import com.example.safestock.adapter.inbound.dto.ExportRequestDTO;
import com.example.safestock.application.service.ExcelExportService;
import com.example.safestock.application.service.ProdutoService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/export")
@SecurityRequirement(name = "Bearer")
public class ExportController {

    private final ExcelExportService excelExportService;
    private final ProdutoService produtoService;
    private final com.example.safestock.application.service.RegistroUsoService registroUsoService;
    private final com.example.safestock.application.service.HistoricoAlertasService historicoAlertasService;

    public ExportController(
            ExcelExportService excelExportService, 
            ProdutoService produtoService,
            com.example.safestock.application.service.RegistroUsoService registroUsoService,
            com.example.safestock.application.service.HistoricoAlertasService historicoAlertasService) {
        this.excelExportService = excelExportService;
        this.produtoService = produtoService;
        this.registroUsoService = registroUsoService;
        this.historicoAlertasService = historicoAlertasService;
    }

    @PostMapping("/excel")
    public ResponseEntity<byte[]> exportarParaExcel(@RequestBody ExportRequestDTO request) throws IOException {
        List<String> relatorios = request.getRelatorios();
        String month = request.getMonth();

        if (relatorios == null || relatorios.isEmpty()) {
            return ResponseEntity.badRequest().body("Nenhum relatório selecionado.".getBytes());
        }

        // Se apenas um relatório foi solicitado
        if (relatorios.size() == 1) {
            String tipoRelatorio = relatorios.get(0);
            List<Map<String, Object>> dados = obterDadosRelatorio(tipoRelatorio, month);

            if (dados.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            String[] titulos = dados.get(0).keySet().toArray(new String[0]);
            byte[] excelBytes = excelExportService.gerarExcelComEstilos(dados, titulos);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", tipoRelatorio + ".xlsx");

            return ResponseEntity.ok().headers(headers).body(excelBytes);
        }

        // Se múltiplos relatórios foram solicitados, gera arquivo consolidado
        Map<String, List<Map<String, Object>>> dadosPorRelatorio = new HashMap<>();

        for (String tipoRelatorio : relatorios) {
            List<Map<String, Object>> dados = obterDadosRelatorio(tipoRelatorio, month);
            if (!dados.isEmpty()) {
                dadosPorRelatorio.put(tipoRelatorio, dados);
            }
        }

        if (dadosPorRelatorio.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        byte[] excelBytes = excelExportService.gerarExcelConsolidado(dadosPorRelatorio);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "relatorios_consolidados.xlsx");

        return ResponseEntity.ok().headers(headers).body(excelBytes);
    }

    private List<Map<String, Object>> obterDadosRelatorio(String tipoRelatorio, String month) {
        switch (tipoRelatorio.toLowerCase()) {
            case "produtos":
                return produtoService.buscarProdutosComoMapa(month);
            case "registro_uso":
            case "registrouso":
                return registroUsoService.buscarRegistrosComoMapa(month);
            case "alertas":
            case "historicoalertas":
            case "historico_alertas":
                return historicoAlertasService.buscarAlertasComoMapa(month);
            default:
                return Collections.emptyList();
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
                return ResponseEntity.status(204).body(null);
            }

            byte[] excelBytes = excelExportService.gerarExcelConsolidado(dadosPorRelatorio);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", 
                "Relatorios_Todos_" + (month != null ? month : "all") + ".xlsx");

            return ResponseEntity.ok().headers(headers).body(excelBytes);
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
