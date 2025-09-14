package com.example.safestock.adapter.outbound.mapper;

import com.example.safestock.domain.model.Funcionario;
import com.example.safestock.domain.model.RegistroUso;
import com.example.safestock.domain.model.Relatorio;
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

        // ✅ Converte Funcionario → FuncionarioEntity
        if (d.getFuncionario() != null) {
            FuncionarioEntity fe = new FuncionarioEntity();
            fe.setId(d.getFuncionario().getId());
            fe.setNome(d.getFuncionario().getNome());
            fe.setSobrenome(d.getFuncionario().getSobrenome());
            e.setFuncionario(fe);
        }

        // ✅ Converte lista de Relatorio → RelatorioEntity
        if (d.getRelatorio() != null) {
            List<RelatorioEntity> rels = d.getRelatorio().stream()
                    .map(r -> {
                        RelatorioEntity re = new RelatorioEntity();
                        re.setIdRelatorio(r.getIdRelatorio());
                        re.setDataRelatorio(r.getDataRelatorio());
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

        // ✅ Converte FuncionarioEntity → Funcionario
        if (e.getFuncionario() != null) {
            Funcionario f = new Funcionario();
            f.setId(e.getFuncionario().getId());
            f.setNome(e.getFuncionario().getNome());
            f.setSobrenome(e.getFuncionario().getSobrenome());
            d.setFuncionario(f);
        }

        // ✅ Converte lista de RelatorioEntity → Relatorio
        if (e.getRelatorio() != null) {
            List<Relatorio> rels = e.getRelatorio().stream()
                    .map(re -> {
                        Relatorio r = new Relatorio();
                        r.setIdRelatorio(re.getIdRelatorio());
                        r.setDataRelatorio(re.getDataRelatorio());
                        return r;
                    }).collect(Collectors.toList());
            d.setRelatorio(rels);
        }

        return d;
    }
}
