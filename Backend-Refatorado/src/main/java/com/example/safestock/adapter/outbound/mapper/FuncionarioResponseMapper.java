package com.example.safestock.adapter.outbound.mapper;

import com.example.safestock.adapter.inbound.dto.FuncionarioResponse;
import com.example.safestock.domain.model.Funcionario;

public class FuncionarioResponseMapper {

    public static FuncionarioResponse toResponse(Funcionario funcionario) {
        if (funcionario == null) {
            return null;
        }

        FuncionarioResponse response = new FuncionarioResponse();
        response.setId(funcionario.getId());
        response.setNome(funcionario.getNome());
        response.setSobrenome(funcionario.getSobrenome());
        response.setEmail(funcionario.getEmail());
        response.setTelefone(funcionario.getTelefone());
        response.setCargo(funcionario.getCargo());

        if (funcionario.getCreche() != null) {
            response.setCrecheId(funcionario.getCreche().getId());
        }

        return response;
    }
}
