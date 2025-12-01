package com.example.safestock.application.service;

import com.example.safestock.adapter.inbound.dto.FuncionarioResponse;
import com.example.safestock.adapter.outbound.mapper.FuncionarioResponseMapper;
import com.example.safestock.application.port.in.FuncionarioUseCase;
import com.example.safestock.application.port.out.FuncionarioRepository;
import com.example.safestock.domain.enuns.CargoFuncionario;
import com.example.safestock.domain.model.Funcionario;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService implements FuncionarioUseCase {

    private final FuncionarioRepository funcionarioRepository;
    private final PasswordEncoder passwordEncoder;

    public FuncionarioService(FuncionarioRepository funcionarioRepository, PasswordEncoder passwordEncoder) {
        this.funcionarioRepository = funcionarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

//    @Override
//    public Funcionario criar(Funcionario funcionario) {
//        // Regras de negócio aqui (ex: validações)
//        return funcionarioRepository.save(funcionario);
//    }

    @Override
    public List<FuncionarioResponse> buscarFuncionariosExcetoLogadoEDono(String emailLogado) {
        List<Funcionario> funcionarios = funcionarioRepository.buscarPorEmailDiferenteECargoDiferente(emailLogado, CargoFuncionario.dono);

        return funcionarios.stream()
                .map(FuncionarioResponseMapper::toResponse)
                .toList();
    }

    @Override
    public Optional<Funcionario> buscarFuncionarioPorId(Long id) {
        return funcionarioRepository.buscarFuncionarioId(id);
    }

    @Override
    public void deletarFuncionario(Long id) {
        funcionarioRepository.deleteFuncionario(id);
    }

    @Override
    public Optional<Funcionario> autenticar(String email, String senha) {
        return funcionarioRepository.buscarFuncionarioPorEmail(email)
                .filter(f -> passwordEncoder.matches(senha, f.getSenha()));
    }

    @Override
    public com.example.safestock.domain.model.PagedResult<FuncionarioResponse> buscarFuncionariosExcetoLogadoEDonoPaginado(String emailLogado, int page, int size) {
        List<FuncionarioResponse> all = buscarFuncionariosExcetoLogadoEDono(emailLogado);
        
        int start = page * size;
        int end = Math.min(start + size, all.size());
        
        if (start >= all.size()) {
            return new com.example.safestock.domain.model.PagedResult<>(List.of(), page, size, all.size());
        }
        
        List<FuncionarioResponse> pageContent = all.subList(start, end);
        return new com.example.safestock.domain.model.PagedResult<>(pageContent, page, size, all.size());
    }
}