package com.example.safestock.adapter.outbound.mapper;

import com.example.safestock.domain.model.Funcionario;
import com.example.safestock.domain.model.RegistroUso;
import com.example.safestock.infrastructure.entity.FuncionarioEntity;
import com.example.safestock.infrastructure.entity.RegistroUsoEntity;
import com.example.safestock.infrastructure.entity.RelatorioEntity;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


public class RegistroUsoMapper {

    public static RegistroUsoEntity toEntity(RegistroUso d) {
        if (d == null) return null;
        RegistroUsoEntity e = new RegistroUsoEntity();
        e.setId(d.getId());
        e.setProduto(d.getProduto());
        e.setDataValidade(d.getDataValidade());
        e.setQuantidade(d.getQuantidade());
        e.setDataHoraSaida(d.getDataHoraSaida());

        if (d.getFuncionario() != null) {
            FuncionarioEntity fe = new FuncionarioEntity();
            fe.setId(d.getFuncionario().getId());
            e.setFuncionario(fe);
        }

        if (d.getRelatorio() != null) {
            List<RelatorioEntity> rels = d.getRelatorio().stream()
                    .map(r -> {
                        RelatorioEntity re = new RelatorioEntity();
                        re.setIdRelatorio(r.getIdRelatorio());
                        return re;
                    }).collect(Collectors.toList());
            e.setRelatorio(rels);
        } else {
            e.setRelatorio(Collections.emptyList());
        }

        return e;
    }

    public static RegistroUso toDomain(RegistroUsoEntity e) {
        if (e == null) return null;
        RegistroUso d = new RegistroUso();
        d.setId(e.getId());
        d.setProduto(e.getProduto());
        d.setDataValidade(e.getDataValidade());
        d.setQuantidade(e.getQuantidade());
        d.setDataHoraSaida(e.getDataHoraSaida());

        if (e.getFuncionario() != null) {
            Funcionario f = new Funcionario();
            f.setId(e.getFuncionario().getId());
            f.setNome(e.getFuncionario().getNome());
            f.setSobrenome(e.getFuncionario().getSobrenome());
            d.setFuncionario(f);
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
