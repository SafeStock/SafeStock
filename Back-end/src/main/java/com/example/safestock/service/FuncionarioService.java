package com.example.safestock.service;

import com.example.safestock.dto.FuncionarioListar;
import com.example.safestock.repository.RegistroUsoRepository;
import org.springframework.security.core.Authentication;
import com.example.safestock.config.GerenciadorTokenJwt;
import com.example.safestock.dto.FuncionarioMapper;
import com.example.safestock.dto.TokenDTO;
import com.example.safestock.model.Funcionario;
import com.example.safestock.repository.FuncionarioRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {

    private final PasswordEncoder passwordEncoder;
    private final FuncionarioRepository funcionarioRepository;
    private final GerenciadorTokenJwt gerenciadorTokenJwt;
    private final AuthenticationManager authenticationManager;
    private final RegistroUsoRepository registroUsoRepository;

    public FuncionarioService(PasswordEncoder passwordEncoder,
                              FuncionarioRepository funcionarioRepository,
                              GerenciadorTokenJwt gerenciadorTokenJwt,
                              AuthenticationManager authenticationManager,
                              RegistroUsoRepository registroUsoRepository) {
        this.passwordEncoder = passwordEncoder;
        this.funcionarioRepository = funcionarioRepository;
        this.gerenciadorTokenJwt = gerenciadorTokenJwt;
        this.authenticationManager = authenticationManager;
        this.registroUsoRepository = registroUsoRepository;
    }

    public void cadastrarFuncionario(Funcionario novoFuncionario){
        String senhaCriptografada = passwordEncoder.encode(novoFuncionario.getSenha());
        novoFuncionario.setSenha(senhaCriptografada);
        this.funcionarioRepository.save(novoFuncionario);
    }

    public TokenDTO autenticar(Funcionario funcionario) {
        final UsernamePasswordAuthenticationToken credentials = new UsernamePasswordAuthenticationToken(
                funcionario.getEmail(), funcionario.getSenha());

        final Authentication authentication = this.authenticationManager.authenticate(credentials);

        Funcionario funcionarioAutenticado =
                funcionarioRepository.findByEmail(funcionario.getEmail())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Email não cadastrado"));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        final String token = gerenciadorTokenJwt.generateToken(authentication);

        return FuncionarioMapper.of(funcionarioAutenticado, token);
    }

    public List<FuncionarioListar> listarTodos(){
        List<Funcionario> funcionarioEncontrado = funcionarioRepository.findAll();
        return funcionarioEncontrado.stream().map(FuncionarioMapper::of).toList();
    }

    @Transactional
    public void deletarFuncionario(Long id) {
        registroUsoRepository.deleteByFuncionarioId(id);
        funcionarioRepository.deleteById(id);
    }

    public Optional<FuncionarioListar> buscarFuncionarioListarPorId(Long id) {
        return funcionarioRepository.findById(id)
                .map(FuncionarioMapper::of);
    }

    public Optional<Funcionario> atualizarFuncionario(Long id, Funcionario novoFuncionario) {
        return funcionarioRepository.findById(id).map(funcionario -> {
            funcionario.setNome(novoFuncionario.getNome());
            funcionario.setEmail(novoFuncionario.getEmail());
            funcionario.setSobrenome(novoFuncionario.getSobrenome());
            funcionario.setSenha(passwordEncoder.encode(novoFuncionario.getSenha()));
            funcionario.setTelefone(novoFuncionario.getTelefone());
            funcionario.setCargo(novoFuncionario.getCargo());
            return funcionarioRepository.save(funcionario);
        });
    }

}
