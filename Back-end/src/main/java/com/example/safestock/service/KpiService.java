package com.example.safestock.service;

import com.example.safestock.model.Produto;
import com.example.safestock.model.RegistroUso;
import com.example.safestock.repository.ProdutoRepository;
import com.example.safestock.repository.RegistroUsoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;import com.example.safestock.model.Produto;
import com.example.safestock.model.RegistroUso;

import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

@Service
public class KpiService {
    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private RegistroUsoRepository registroUsoRepository;

    public List<Produto> getProdutosProximosAoLimite() {
        List<Produto> produtos = produtoRepository.findAll();
        List<Produto> proximosAoLimite = new ArrayList<>();

        LocalDate hoje = LocalDate.now();
        LocalDate inicioSemana = hoje.with(DayOfWeek.MONDAY);
        LocalDate fimSemana = hoje.with(DayOfWeek.SUNDAY);

        for (Produto produto : produtos) {
            List<RegistroUso> registrosSemana = registroUsoRepository
                    .findByProdutoAndDataRegistroBetween(produto, inicioSemana, fimSemana);

            int usoSemanal = registrosSemana.stream()
                    .mapToInt(RegistroUso::getQuantidade)
                    .sum();

            int diferenca = produto.getLimiteSemanalDeUso() - usoSemanal;
            if (diferenca >= 1 && diferenca <= 3) {
                proximosAoLimite.add(produto);
            }
        }

        return proximosAoLimite;
    }
}
