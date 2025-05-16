package com.example.safestock.service;

import com.example.safestock.dto.FuncionarioListar;
import org.springframework.security.core.Authentication;
import com.example.safestock.config.GerenciadorTokenJwt;
import com.example.safestock.dto.FuncionarioMapper;
import com.example.safestock.dto.TokenDTO;
import com.example.safestock.model.Funcionario;
import com.example.safestock.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private GerenciadorTokenJwt gerenciadorTokenJwt;

    @Autowired
    private AuthenticationManager authenticationManager;

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
                        .orElseThrow(
                                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Email não cadastrado", null)
                        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        final String token = gerenciadorTokenJwt.generateToken(authentication);

        return FuncionarioMapper.of(funcionarioAutenticado, token);

    }

    public  List<FuncionarioListar> listarTodos(){
        List<Funcionario> funcionarioEncontrado = funcionarioRepository.findAll();
        return funcionarioEncontrado.stream().map(FuncionarioMapper::of).toList();
    }

    public FuncionarioService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    public void deletarFuncionario(Long id) {
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
