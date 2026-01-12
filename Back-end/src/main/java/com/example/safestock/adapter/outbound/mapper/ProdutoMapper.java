package com.example.safestock.adapter.outbound.mapper;

import com.example.safestock.domain.model.Creche;
import com.example.safestock.domain.model.Produto;
import com.example.safestock.infrastructure.entity.CrecheEntity;
import com.example.safestock.infrastructure.entity.ProdutoEntity;
import com.example.safestock.infrastructure.entity.RelatorioEntity;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class ProdutoMapper {

    public static ProdutoEntity toEntity(Produto d) {
        if (d == null) return null;
        ProdutoEntity e = new ProdutoEntity();
        e.setId(d.getId());
        e.setNome(d.getNome());
        e.setCategoriaProduto(d.getCategoriaProduto());
        e.setQuantidade(d.getQuantidade());
        e.setLimiteSemanalDeUso(d.getLimiteSemanalDeUso());
        e.setDataValidade(d.getDataValidade());
        e.setDataEntrada(d.getDataEntrada());

        if (d.getCreche() != null) {
            CrecheEntity ce = new CrecheEntity();
            ce.setId(d.getCreche().getId());
            e.setCreche(ce);
        }

        if (d.getRelatorio() != null) {
            List<RelatorioEntity> rels = d.getRelatorio().stream()
                    .map(r -> {
                        RelatorioEntity re = new RelatorioEntity();
                        re.setIdRelatorio(r.getIdRelatorio());
                        return re;
                    }).collect(Collectors.toList());
            e.setRelatorios(rels);
        } else {
            e.setRelatorios(Collections.emptyList());
        }

        return e;
    }

    public static Produto toDomain(ProdutoEntity e) {
        if (e == null) return null;
        Produto d = new Produto();
        d.setId(e.getId());
        d.setNome(e.getNome());
        d.setCategoriaProduto(e.getCategoriaProduto());
        d.setQuantidade(e.getQuantidade());
        d.setLimiteSemanalDeUso(e.getLimiteSemanalDeUso());
        d.setDataValidade(e.getDataValidade());
        d.setDataEntrada(e.getDataEntrada());

        if (e.getCreche() != null) {
            Creche c = new Creche();
            c.setId(e.getCreche().getId());
            c.setNome(e.getCreche().getNome());
            d.setCreche(c);
        }

        if (e.getRelatorios() != null) {
            List<com.example.safestock.domain.model.Relatorio> rels = e.getRelatorios().stream()
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
