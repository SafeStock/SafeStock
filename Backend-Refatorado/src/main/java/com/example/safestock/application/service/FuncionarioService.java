package com.example.safestock.application.service;

import com.example.safestock.adapter.inbound.dto.FuncionarioCadastro;
import com.example.safestock.adapter.inbound.dto.FuncionarioAtualizar;
import com.example.safestock.adapter.inbound.dto.FuncionarioResponse;
import com.example.safestock.adapter.outbound.mapper.FuncionarioResponseMapper;
import com.example.safestock.application.port.in.FuncionarioUseCase;
import com.example.safestock.application.port.out.CrecheRepository;
import com.example.safestock.application.port.out.FuncionarioRepository;
import com.example.safestock.domain.enuns.CargoFuncionario;
import com.example.safestock.domain.model.Creche;
import com.example.safestock.domain.model.Funcionario;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService implements FuncionarioUseCase {

    private final FuncionarioRepository funcionarioRepository;
    private final CrecheRepository crecheRepository;
    private final PasswordEncoder passwordEncoder;

    public FuncionarioService(FuncionarioRepository funcionarioRepository, 
                             CrecheRepository crecheRepository,
                             PasswordEncoder passwordEncoder) {
        this.funcionarioRepository = funcionarioRepository;
        this.crecheRepository = crecheRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public FuncionarioResponse cadastrarFuncionario(FuncionarioCadastro funcionarioCadastro) {
        // Verificar se email já existe
        Optional<Funcionario> funcionarioExistente = funcionarioRepository.buscarFuncionarioPorEmail(funcionarioCadastro.getEmail());
        if (funcionarioExistente.isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        // Buscar creche
        Creche creche = crecheRepository.buscarPorId(funcionarioCadastro.getCrecheId())
                .orElseThrow(() -> new IllegalArgumentException("Creche não encontrada"));

        // Criar funcionário
        Funcionario funcionario = new Funcionario();
        funcionario.setNome(funcionarioCadastro.getNome());
        funcionario.setSobrenome(funcionarioCadastro.getSobrenome());
        funcionario.setEmail(funcionarioCadastro.getEmail());
        funcionario.setSenha(passwordEncoder.encode(funcionarioCadastro.getSenha()));
        funcionario.setCargo(funcionarioCadastro.getCargo());
        funcionario.setCreche(creche);
        funcionario.setTelefone(funcionarioCadastro.getTelefone()); // CORREÇÃO AQUI

        // Salvar funcionário
        Funcionario funcionarioSalvo = funcionarioRepository.salvar(funcionario);
        
        return FuncionarioResponseMapper.toResponse(funcionarioSalvo);
    }

    @Override
    @Transactional
    public FuncionarioResponse atualizarFuncionario(Long id, FuncionarioAtualizar funcionarioAtualizar) {
        // Buscar funcionário existente
        Funcionario funcionario = funcionarioRepository.buscarFuncionarioId(id)
                .orElseThrow(() -> new IllegalArgumentException("Funcionário não encontrado"));

        // Verificar se email foi alterado e se já existe
        if (!funcionario.getEmail().equals(funcionarioAtualizar.getEmail())) {
            Optional<Funcionario> funcionarioComEmail = funcionarioRepository.buscarFuncionarioPorEmail(funcionarioAtualizar.getEmail());
            if (funcionarioComEmail.isPresent() && !funcionarioComEmail.get().getId().equals(id)) {
                throw new IllegalArgumentException("Email já cadastrado");
            }
        }

        // Buscar creche se foi alterada
        Creche creche = crecheRepository.buscarPorId(funcionarioAtualizar.getCrecheId())
                .orElseThrow(() -> new IllegalArgumentException("Creche não encontrada"));

        // Atualizar dados
        funcionario.setNome(funcionarioAtualizar.getNome());
        funcionario.setSobrenome(funcionarioAtualizar.getSobrenome());
        funcionario.setEmail(funcionarioAtualizar.getEmail());
        funcionario.setCargo(funcionarioAtualizar.getCargo());
        funcionario.setTelefone(funcionarioAtualizar.getTelefone());
        funcionario.setCreche(creche);

        // Salvar alterações
        Funcionario funcionarioAtualizado = funcionarioRepository.salvar(funcionario);
        
        return FuncionarioResponseMapper.toResponse(funcionarioAtualizado);
    }

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
        List<FuncionarioResponse> all = new java.util.ArrayList<>(buscarFuncionariosExcetoLogadoEDono(emailLogado));
        
        // Ordena por nome A-Z
        all.sort((f1, f2) -> f1.getNome().compareToIgnoreCase(f2.getNome()));
        
        int start = page * size;
        int end = Math.min(start + size, all.size());
        
        if (start >= all.size()) {
            return new com.example.safestock.domain.model.PagedResult<>(List.of(), page, size, all.size());
        }
        
        List<FuncionarioResponse> pageContent = all.subList(start, end);
        return new com.example.safestock.domain.model.PagedResult<>(pageContent, page, size, all.size());
    }
}