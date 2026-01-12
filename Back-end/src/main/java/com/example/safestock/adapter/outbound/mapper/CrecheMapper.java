package com.example.safestock.adapter.outbound.mapper;

import com.example.safestock.domain.model.Creche;
import com.example.safestock.domain.model.Funcionario;
import com.example.safestock.domain.model.Produto;
import com.example.safestock.infrastructure.entity.CrecheEntity;
import com.example.safestock.infrastructure.entity.FuncionarioEntity;
import com.example.safestock.infrastructure.entity.ProdutoEntity;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class CrecheMapper {

    public static CrecheEntity toEntity(Creche d) {
        if (d == null) return null;
        CrecheEntity e = new CrecheEntity();
        e.setId(d.getId());
        e.setNome(d.getNome());
        e.setEndereco(d.getEndereco());
        e.setTelefone(d.getTelefone());
        e.setCnpj(d.getCnpj());

        if (d.getFuncionarios() != null) {
            List<FuncionarioEntity> funcionarios = d.getFuncionarios().stream()
                    .map(f -> {
                        FuncionarioEntity fe = new FuncionarioEntity();
                        fe.setId(f.getId()); // shallow
                        return fe;
                    })
                    .collect(Collectors.toList());
            e.setFuncionarios(funcionarios);
        } else {
            e.setFuncionarios(Collections.emptyList());
        }

        if (d.getProdutos() != null) {
            List<ProdutoEntity> produtos = d.getProdutos().stream()
                    .map(p -> {
                        ProdutoEntity pe = new ProdutoEntity();
                        pe.setId(p.getId()); // shallow
                        return pe;
                    })
                    .collect(Collectors.toList());
            e.setProdutos(produtos);
        } else {
            e.setProdutos(Collections.emptyList());
        }

        return e;
    }

    public static Creche toDomain(CrecheEntity e) {
        if (e == null) return null;
        Creche d = new Creche();
        d.setId(e.getId());
        d.setNome(e.getNome());
        d.setEndereco(e.getEndereco());
        d.setTelefone(e.getTelefone());
        d.setCnpj(e.getCnpj());


        if (e.getFuncionarios() != null) {
            List<Funcionario> funcionarios = e.getFuncionarios().stream()
                    .map(fe -> {
                        Funcionario f = new Funcionario();
                        f.setId(fe.getId());
                        f.setNome(fe.getNome());
                        f.setSobrenome(fe.getSobrenome());
                        return f;
                    })
                    .collect(Collectors.toList());
            d.setFuncionarios(funcionarios);
        }

        if (e.getProdutos() != null) {
            List<Produto> produtos = e.getProdutos().stream()
                    .map(pe -> {
                        Produto p = new Produto();
                        p.setId(pe.getId());
                        p.setNome(pe.getNome());
                        return p;
                    })
                    .collect(Collectors.toList());
            d.setProdutos(produtos);
        }

        return d;
    }
}