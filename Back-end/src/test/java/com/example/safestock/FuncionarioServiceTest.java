package com.example.safestock;

import com.example.safestock.infrastructure.config.GerenciadorTokenJwt;
import com.example.safestock.core.domain.Funcionario;
import com.example.safestock.infrastructure.repository.FuncionarioRepository;
import com.example.safestock.infrastructure.repository.RegistroUsoRepository;
import com.example.safestock.core.application.usecase.FuncionarioService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FuncionarioServiceTest {


    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private FuncionarioRepository funcionarioRepository;

    @Mock
    private GerenciadorTokenJwt gerenciadorTokenJwt;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private RegistroUsoRepository registroUsoRepository;

    @InjectMocks
    private FuncionarioService funcionarioService;

    private Funcionario criarFuncionarioValido() {
        Funcionario funcionario = new Funcionario();
        funcionario.setId(1L);
        funcionario.setNome("João");
        funcionario.setEmail("joao@email.com");
        funcionario.setSenha("senha123");
        funcionario.setSobrenome("Souza");
        funcionario.setTelefone("11988887777");
        return funcionario;
    }

    @Test
    void donoDeveCadastrarNovoFuncionario() {
        Funcionario funcionario = criarFuncionarioValido();

        when(passwordEncoder.encode(any())).thenReturn("senhaCodificada");
        when(funcionarioRepository.save(any())).thenReturn(funcionario);

        funcionarioService.cadastrarFuncionario(funcionario);

        verify(passwordEncoder).encode("senha123");
        verify(funcionarioRepository).save(funcionario);
    }

    @Test
    void deveAtualizarFuncionarioComSenhaCriptografada() {
        Funcionario funcionario = criarFuncionarioValido();
        Funcionario novo = criarFuncionarioValido();
        novo.setNome("João da Silva");
        novo.setSenha("novaSenha");

        when(funcionarioRepository.findById(1L)).thenReturn(Optional.of(funcionario));
        when(passwordEncoder.encode("novaSenha")).thenReturn("senhaCriptografada");
        when(funcionarioRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        Optional<Funcionario> atualizado = funcionarioService.atualizarFuncionario(1L, novo);

        assertNotNull(atualizado);
        assertEquals("João da Silva", atualizado.get().getNome());
        assertEquals("senhaCriptografada", atualizado.get().getSenha());
    }

}
