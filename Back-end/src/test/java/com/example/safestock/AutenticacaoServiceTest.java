package com.example.safestock;

import org.springframework.boot.test.context.SpringBootTest;
import org.mockito.Mockito;
import com.example.safestock.model.Funcionario;
import com.example.safestock.repository.FuncionarioRepository;
import com.example.safestock.service.AutenticacaoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class AutenticacaoServiceTest {

        @Autowired
        private AutenticacaoService autenticacaoService;

        @Autowired
        private FuncionarioRepository funcionarioRepository;

        @Test
        void deveRetornarFuncionarioQuandoEmailExiste() {
            Funcionario funcionario = new Funcionario();
            funcionario.setEmail("teste@email.com");
            funcionario.setSenha("senha123");
            funcionario.setNome("Teste Funcionario");
            funcionario.setSobrenome("Damas");
            funcionario.setTelefone("11998948944");
            funcionarioRepository.save(funcionario);

            assertNotNull(autenticacaoService.loadUserByUsername("teste@email.com"));
        }

        @Test
        void deveLancarExcecaoQuandoEmailNaoExiste() {
            assertThrows(UsernameNotFoundException.class, () -> {
                autenticacaoService.loadUserByUsername("naoexiste@email.com");
            });
        }
    }


