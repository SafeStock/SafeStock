package com.example.safestock.adapter.outbound.mapper;

import com.example.safestock.domain.model.HistoricoAlertas;
import com.example.safestock.domain.model.Produto;
import com.example.safestock.infrastructure.entity.HistoricoAlertasEntity;
import com.example.safestock.infrastructure.entity.ProdutoEntity;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class HistoricoAlertasMapper {

    public static HistoricoAlertasEntity toEntity(HistoricoAlertas d) {
        if (d == null) return null;
        HistoricoAlertasEntity e = new HistoricoAlertasEntity();
        e.setId(d.getId());
        e.setDataHora(d.getDataHora());
        e.setStatus(d.getStatus());
        e.setDescricao(d.getDescricao());
        e.setNomeProduto(d.getNomeProduto());

        if (d.getProduto() != null) {
            ProdutoEntity pe = new ProdutoEntity();
            pe.setId(d.getProduto().getId());
            e.setProduto(pe);
        }

        if (d.getRelatorio() != null) {
            List<com.example.safestock.infrastructure.entity.RelatorioEntity> rels = d.getRelatorio().stream()
                    .map(r -> {
                        com.example.safestock.infrastructure.entity.RelatorioEntity re = new com.example.safestock.infrastructure.entity.RelatorioEntity();
                        re.setIdRelatorio(r.getIdRelatorio());
                        return re;
                    }).collect(Collectors.toList());
            e.setRelatorio(rels);
        } else {
            e.setRelatorio(Collections.emptyList());
        }

        return e;
    }

    public static HistoricoAlertas toDomain(HistoricoAlertasEntity e) {
        if (e == null) return null;
        HistoricoAlertas d = new HistoricoAlertas();
        d.setId(e.getId());
        d.setDataHora(e.getDataHora());
        d.setStatus(e.getStatus());
        d.setDescricao(e.getDescricao());
        d.setNomeProduto(e.getNomeProduto());

        if (e.getProduto() != null) {
            Produto p = new Produto();
            p.setId(e.getProduto().getId());
            p.setNome(e.getProduto().getNome());
            d.setProduto(p);
        }

        if (e.getRelatorio() != null) {
            List<com.example.safestock.domain.model.Relatorio> rels = e.getRelatorio().stream()
                    .map(re -> {
                        com.example.safestock.domain.model.Relatorio r = new com.example.safestock.domain.model.Relatorio();
                        r.setIdRelatorio(re.getIdRelatorio());
                        r.setDataRelatorio(re.getDataRelatorio());
                        return r;
                    }).collect(Collectors.toList());
            d.setRelatorio(rels);
        }

        return d;
    }
}
