package com.example.safestock;

import com.example.safestock.core.domain.Funcionario;
import com.example.safestock.infrastructure.repository.FuncionarioRepository;
import com.example.safestock.core.application.usecase.AutenticacaoService;
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
    void deveDetectarSenhaSemCaracterEspecialNoFuncionario() {
        // Arrange
        Funcionario funcionario = new Funcionario();
        funcionario.setEmail("teste@email.com");
        funcionario.setSenha("Senha123"); // inválida (sem caractere especial)

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        // Act
        Set<ConstraintViolation<Funcionario>> violations = validator.validate(funcionario);

        // Assert
        assertFalse(violations.isEmpty(), "Deveria haver violações de validação");

        boolean encontrouMensagemEsperada = violations.stream()
                .anyMatch(v -> v.getMessage().contains("caractere especial"));

        assertTrue(encontrouMensagemEsperada, "A mensagem de erro de caractere especial deveria estar presente");
    }

}
