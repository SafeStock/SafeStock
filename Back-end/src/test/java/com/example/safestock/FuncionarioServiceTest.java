package com.example.safestock;

import com.example.safestock.model.Funcionario;
import com.example.safestock.repository.FuncionarioRepository;
import com.example.safestock.service.FuncionarioService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class FuncionarioServiceTest {

    @Autowired
    private FuncionarioService funcionarioService;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Test
    void donoDeveCadastrarNovoFuncionario() {
        Funcionario funcionario = new Funcionario();
        funcionario.setNome("João");
        funcionario.setEmail("joao@email.com");
        funcionario.setSenha("senha123");
        funcionario.setSobrenome("Souza");
        funcionario.setTelefone("11988887777");
        funcionarioService.cadastrarFuncionario(funcionario);
        Funcionario salvo = funcionarioRepository.findByEmail("joao@email.com").orElse(null);
        assertNotNull(salvo);
        assertEquals("João", salvo.getNome());
    }
    @Test
    void deveEditarFuncionario() {
        Funcionario funcionario = new Funcionario();
        funcionario.setNome("Ana");
        funcionario.setEmail("ana@email.com");
        funcionario.setSenha("senha123");
        funcionario.setSobrenome("Lima");
        funcionario.setTelefone("11977776666");
        funcionarioService.cadastrarFuncionario(funcionario);
        Funcionario novo = new Funcionario();
        novo.setNome("Ana Paula");
        novo.setEmail("ana@email.com");
        novo.setSenha("novaSenha");
        novo.setSobrenome("Lima");
        novo.setTelefone("11977776666");
        funcionarioService.atualizarFuncionario(funcionario.getId(), novo);
        Funcionario atualizado = funcionarioRepository.findByEmail("ana@email.com").orElse(null);
        assertNotNull(atualizado);
        assertEquals("Ana Paula", atualizado.getNome());
    }
    @Test
    void deveExcluirFuncionario() {
        Funcionario funcionario = new Funcionario();
        funcionario.setNome("Carlos");
        funcionario.setEmail("carlos@email.com");
        funcionario.setSenha("senha123");
        funcionario.setSobrenome("Pereira");
        funcionario.setTelefone("11966665555");
        funcionarioService.cadastrarFuncionario(funcionario);
        Long id = funcionarioRepository.findByEmail("carlos@email.com").get().getId();
        funcionarioService.deletarFuncionario(id);
        assertFalse(funcionarioRepository.findById(id).isPresent());
    }
    @Test
    void deveValidarDuplicidadeDeEmail() {
        Funcionario f1 = new Funcionario();
        f1.setNome("Lucas");
        f1.setEmail("lucas@email.com");
        f1.setSenha("senha123");
        f1.setSobrenome("Oliveira");
        f1.setTelefone("11955554444");
        funcionarioService.cadastrarFuncionario(f1);
        Funcionario f2 = new Funcionario();
        f2.setNome("Lucas 2");
        f2.setEmail("lucas@email.com"); // mesmo email
        f2.setSenha("senha456");
        f2.setSobrenome("Oliveira");
        f2.setTelefone("11955554445");
        assertThrows(DataIntegrityViolationException.class, () -> {
            funcionarioService.cadastrarFuncionario(f2);
            funcionarioRepository.flush(); // força persistência para lançar exceção
        });
    }
    @Test
    void deveAtualizarFuncionario() {
        Funcionario funcionario = new Funcionario();
        funcionario.setNome("Paula");
        funcionario.setEmail("paula@email.com");
        funcionario.setSenha("senha123");
        funcionario.setSobrenome("Mendes");
        funcionario.setTelefone("11944443333");
        funcionarioService.cadastrarFuncionario(funcionario);
        Funcionario novo = new Funcionario();
        novo.setNome("Paula Mendes");
        novo.setEmail("paula@email.com");
        novo.setSenha("novaSenha");
        novo.setSobrenome("Mendes");
        novo.setTelefone("11944443333");
        funcionarioService.atualizarFuncionario(funcionario.getId(), novo);
        Funcionario atualizado = funcionarioRepository.findByEmail("paula@email.com").orElse(null);
        assertNotNull(atualizado);
        assertEquals("Paula Mendes", atualizado.getNome());
        assertNotEquals("novaSenha", atualizado.getSenha()); // senha deve estar criptografada
    }
}