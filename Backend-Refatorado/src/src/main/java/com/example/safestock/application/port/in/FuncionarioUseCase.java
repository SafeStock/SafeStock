package com.example.safestock.application.port.in;

import com.example.safestock.adapter.inbound.dto.FuncionarioResponse;
import com.example.safestock.domain.model.Funcionario;
import com.example.safestock.domain.model.PagedResult;

import java.util.List;
import java.util.Optional;

public interface FuncionarioUseCase {

    List<FuncionarioResponse> buscarFuncionariosExcetoLogadoEDono(String emailLogado);

    Optional<Funcionario> buscarFuncionarioPorId(Long id);

    void deletarFuncionario(Long id);

    Optional<Funcionario> autenticar(String email, String senha);
    
    PagedResult<FuncionarioResponse> buscarFuncionariosExcetoLogadoEDonoPaginado(String emailLogado, int page, int size);
}
