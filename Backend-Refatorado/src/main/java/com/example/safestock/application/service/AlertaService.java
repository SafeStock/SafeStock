package com.example.safestock.application.service;

import com.example.safestock.domain.enuns.StatusAlerta;
import com.example.safestock.domain.model.HistoricoAlertas;
import com.example.safestock.domain.model.Produto;
import com.example.safestock.application.port.out.ProdutoRepository;
import com.example.safestock.infrastructure.messaging.AlertaRabbitMQService;
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
    private final AlertaRabbitMQService alertaRabbitMQService;

    private final Map<String, LocalDateTime> cacheAlertas = new ConcurrentHashMap<>();

    public AlertaService(ProdutoRepository produtoRepository,
                         HistoricoAlertasService historicoAlertasService,
                         EmailService emailService,
                         AlertaRabbitMQService alertaRabbitMQService) {
        this.produtoRepository = produtoRepository;
        this.historicoAlertasService = historicoAlertasService;
        this.emailService = emailService;
        this.alertaRabbitMQService = alertaRabbitMQService;
    }

    // Executa de 5 em 5 segundos para demonstração - aguarda 5s antes da primeira execução
    // Para produção: @Scheduled(cron = "0 0 8 * * MON") - toda segunda às 8h
    @Scheduled(initialDelay = 10000, fixedRate = 10000)
    public void verificarVencimentos() {
        List<Produto> produtos = produtoRepository.findAll();
        LocalDate hoje = LocalDate.now();

        for (Produto produto : produtos) {
            if (produto.getDataValidade() == null) continue;

            long mesesRestantes = ChronoUnit.MONTHS.between(hoje, produto.getDataValidade());

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

    private void verificarEAdicionarAlerta(Produto produto, StatusAlerta status, String descricao) {
        String chave = produto.getId() + "_" + status.name();
        LocalDateTime agora = LocalDateTime.now();
        LocalDateTime ultimoAlerta = cacheAlertas.get(chave);
        LocalDateTime limite = agora.minusSeconds(30); // impede alertas repetidos com intervalo menor que 30 segundos

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
        alerta.setNomeProduto(produto.getNome());

        historicoAlertasService.cadastrarAlerta(alerta);

        String mensagem = String.format(
                "Novo alerta: %s | Status: %s | Produto: %s",
                alerta.getDescricao(),
                alerta.getStatus(),
                alerta.getProduto().getNome()
        );
        alertaRabbitMQService.enviarAlerta(mensagem);

        // Descomente para enviar email
        // emailService.enviarEmail(
        //       "ekkoante@gmail.com",
        //       "⚠️ Alerta de Vencimento: " + produto.getNome(),
        //       "Prezado(a),\n\n" +
        //               "Informamos que o produto abaixo encontra-se com o seguinte status:\n\n" +
        //               "Produto: " + produto.getNome() + "\n" +
        //               "Status: " + status + "\n" +
        //               "Descrição: " + descricao + "\n\n" +
        //               "Solicitamos a gentileza de verificar e tomar as providências necessárias.\n\n" +
        //               "Atenciosamente,\n" +
        //               "- Stock, Safe"
        // );
    }
}
