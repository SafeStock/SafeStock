package com.example.safestock;

import com.example.safestock.model.Funcionario;
import com.example.safestock.repository.FuncionarioRepository;
import com.example.safestock.service.AutenticacaoService;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AutenticacaoServiceTest {

    @Mock
    private FuncionarioRepository funcionarioRepository;

    @InjectMocks
    private AutenticacaoService autenticacaoService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void deveRetornarFuncionarioQuandoEmailExiste() {
        Funcionario funcionario = new Funcionario();
        funcionario.setEmail("teste@email.com");
        when(funcionarioRepository.findByEmail("teste@email.com"))
                .thenReturn(Optional.of(funcionario));

        assertNotNull(autenticacaoService.loadUserByUsername("teste@email.com"));
        verify(funcionarioRepository, times(1)).findByEmail("teste@email.com");
    }

    @Test
    void deveLancarExcecaoQuandoEmailNaoExiste() {
        when(funcionarioRepository.findByEmail("naoexiste@email.com"))
                .thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            autenticacaoService.loadUserByUsername("naoexiste@email.com");
        });
        verify(funcionarioRepository, times(1)).findByEmail("naoexiste@email.com");
    }

    @Test
    void deveValidarCamposObrigatoriosDoFuncionario() {
        // Arrange
        Funcionario funcionario = new Funcionario();
        funcionario.setEmail(""); // email vazio
        funcionario.setSenha(""); // senha vazia

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        // Act
        Set<ConstraintViolation<Funcionario>> violations = validator.validate(funcionario);

        // Assert
        assertFalse(violations.isEmpty(), "Deveria haver violações de validação para campos obrigatórios");
        
        boolean temViolacaoEmail = violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("email"));
        boolean temViolacaoSenha = violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("senha"));
                
        assertTrue(temViolacaoEmail || temViolacaoSenha, "Deveria ter violação de email ou senha");
    }

}
