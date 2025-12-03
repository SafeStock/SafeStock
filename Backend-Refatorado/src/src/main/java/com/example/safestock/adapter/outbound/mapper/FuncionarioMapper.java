package com.example.safestock.adapter.outbound.mapper;

import com.example.safestock.domain.model.Creche;
import com.example.safestock.domain.model.Funcionario;
import com.example.safestock.domain.model.RegistroUso;
import com.example.safestock.infrastructure.entity.CrecheEntity;
import com.example.safestock.infrastructure.entity.FuncionarioEntity;
import com.example.safestock.infrastructure.entity.RegistroUsoEntity;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class FuncionarioMapper {

    public static FuncionarioEntity toEntity(Funcionario d) {
        if (d == null) return null;
        FuncionarioEntity e = new FuncionarioEntity();
        e.setId(d.getId());
        e.setNome(d.getNome());
        e.setSobrenome(d.getSobrenome());
        e.setCargo(d.getCargo());
        e.setEmail(d.getEmail());
        e.setSenha(d.getSenha());
        e.setTelefone(d.getTelefone());

        if (d.getCreche() != null) {
            CrecheEntity ce = new CrecheEntity();
            ce.setId(d.getCreche().getId());
            e.setCreche(ce);
        }

        if (d.getRegistroUso() != null) {
            List<RegistroUsoEntity> registros = d.getRegistroUso().stream()
                    .map(r -> {
                        RegistroUsoEntity re = new RegistroUsoEntity();
                        re.setId(r.getId());
                        return re;
                    }).collect(Collectors.toList());
            e.setRegistrosUso(registros);
        } else {
            e.setRegistrosUso(Collections.emptyList());
        }

        return e;
    }

    public static Funcionario toDomain(FuncionarioEntity e) {
        if (e == null) return null;
        Funcionario d = new Funcionario();
        d.setId(e.getId());
        d.setNome(e.getNome());
        d.setSobrenome(e.getSobrenome());
        d.setCargo(e.getCargo());
        d.setEmail(e.getEmail());
        d.setSenha(e.getSenha());
        d.setTelefone(e.getTelefone());

        if (e.getCreche() != null) {
            Creche c = new Creche();
            c.setId(e.getCreche().getId());
            c.setNome(e.getCreche().getNome());
            d.setCreche(c);
        }

        // Não mapear registrosUso para evitar LazyInitializationException
        // Os registros não são necessários para autenticação e dashboard

        return d;
    }
}
