package com.example.safestock.service;

import com.example.safestock.model.HistoricoAlertas;
import com.example.safestock.model.Produto;
import com.example.safestock.model.enums.StatusAlerta;
import com.example.safestock.repository.ProdutoRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AlertaService {

    private final ProdutoRepository produtoRepository;
    private final HistoricoAlertasService historicoAlertasService;
    private final EmailService emailService;

    public AlertaService(ProdutoRepository produtoRepository,
                         HistoricoAlertasService historicoAlertasService, EmailService emailService) {
        this.produtoRepository = produtoRepository;
        this.historicoAlertasService = historicoAlertasService;
        this.emailService = emailService;
    }

    //@Scheduled(cron = "0 0 8 * * MON") - uma vez na semana toda segunda
    // Executa de 15 em 15 segundos
    @Scheduled(cron = "0/15 * * * * *")
    public void verificarVencimentos() {
        List<Produto> produtos = produtoRepository.findAll();
        LocalDate hoje = LocalDate.now();

        for (Produto produto : produtos) {
            if (produto.getDataValidade() == null) continue;

            long mesesRestantes = ChronoUnit.MONTHS.between(
                    hoje,
                    produto.getDataValidade()
            );

            StatusAlerta status = null;
            String descricao = null;

            if (mesesRestantes >= 1 && mesesRestantes <= 2) {
                status = StatusAlerta.critico;
                descricao = "Vencimento próximo (1-2 meses)";
            } else if (mesesRestantes >= 3 && mesesRestantes <= 4) {
                status = StatusAlerta.atenção;
                descricao = "Vencimento aproximando (3-4 meses)";
            }

            if (status != null) {
                verificarEAdicionarAlerta(produto, status, descricao);
            }

        }
    }

    private final Map<String, LocalDateTime> cacheAlertas = new ConcurrentHashMap<>();
    private void verificarEAdicionarAlerta(Produto produto, StatusAlerta status, String descricao) {
        String chave = produto.getId() + "_" + status.name();
        LocalDateTime agora = LocalDateTime.now();
        LocalDateTime ultimoAlerta = cacheAlertas.get(chave);
        LocalDateTime limite = agora.minusMinutes(2);  // impede alertas repetidos com intervalo menor que 1 minuto

        boolean precisaCriar = false;



        if (ultimoAlerta == null || ultimoAlerta.isBefore(limite)) {
            boolean existeNoBanco = historicoAlertasService.existsByProdutoAndStatusAndDataHoraAfter(
                    produto, status, limite
            );

            if (!existeNoBanco) {
                precisaCriar = true;
            }
        }

        if (precisaCriar) {
            criarAlerta(produto, status, descricao);
            cacheAlertas.put(chave, agora);
        }
    }


    private void criarAlerta(Produto produto, StatusAlerta status, String descricao) {
        HistoricoAlertas alerta = new HistoricoAlertas();
        alerta.setDataHora(LocalDateTime.now());
        alerta.setStatus(status);
        alerta.setDescricao(descricao);
        alerta.setProduto(produto);
        alerta.setNomeProduto(produto.getNome()); // Salva nome redundante para consultas

        historicoAlertasService.cadastrarAlerta(alerta);

        emailService.enviarEmail(
                "ekkoante@gmail.com",
                "⚠️ Alerta de Vencimento: " + produto.getNome(),
                "Prezado(a),\n\n" +
                        "Informamos que o produto abaixo encontra-se com o seguinte status:\n\n" +
                        "Produto: " + produto.getNome() + "\n" +
                        "Status: " + status + "\n" +
                        "Descrição: " + descricao + "\n\n" +
                        "Solicitamos a gentileza de verificar e tomar as providências necessárias.\n\n" +
                        "Atenciosamente,\n" +
                        "- Stock, Safe"
        );


    }
}