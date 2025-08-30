package com.example.safestock.adapter.outbound.mapper;

import com.example.safestock.domain.model.RegistroUso;
import com.example.safestock.domain.model.Funcionario;
import com.example.safestock.infrastructure.entity.FuncionarioEntity;
import com.example.safestock.infrastructure.entity.RegistroUsoEntity;

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
            Funcionario f = d.getFuncionario();
            FuncionarioEntity fe = new FuncionarioEntity();
            fe.setId(f.getId()); // evita carregar tudo
            e.setFuncionario(fe);
        }

        // relatorios -> normalmente você gerencia pelo lado do Relatorio
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

        // relatorios -> idem (preencher se necessário)
        return d;
    }
}
