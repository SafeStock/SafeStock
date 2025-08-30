package com.example.safestock.adapter.outbound.mapper;

import com.example.safestock.domain.model.Creche;
import com.example.safestock.domain.model.Funcionario;
import com.example.safestock.infrastructure.entity.CrecheEntity;
import com.example.safestock.infrastructure.entity.FuncionarioEntity;
import com.example.safestock.infrastructure.entity.RegistroUsoEntity;

public class CrecheMapper {

    public static Creche toEntity(Creche c) {
        if (c != null) {
            CrecheEntity cr = new CrecheEntity();
            cr.setId(c.getId());
            cr.setNome(c.getNome());
            cr.setEndereco(c.getEndereco());
            cr.setTelefone(c.getTelefone());
            cr.setCnpj(c.getCnpj());

            return cr;
        }
        return null;
    }

    public static Creche toDomain(CrecheEntity ct) {
        if (ct != null) {
            return ct;
        }
        return null;
    }
}
