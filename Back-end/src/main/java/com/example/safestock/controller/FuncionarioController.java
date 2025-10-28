package com.example.safestock.controller;

import com.example.safestock.dto.*;
import com.example.safestock.model.Funcionario;
import com.example.safestock.service.FuncionarioService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;
import org.springframework.data.domain.Page;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    // ✅ LISTAR FUNCIONÁRIOS COM PAGINAÇÃO
    @GetMapping
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<Page<FuncionarioListar>> listarFuncionarios(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy
    ) {
        String emailLogado = SecurityContextHolder.getContext().getAuthentication().getName();

        Page<FuncionarioListar> funcionariosPaginados =
                funcionarioService.listarTodosExcetoLogadoEDonoPaginado(emailLogado, page, size, sortBy);

        if (funcionariosPaginados.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(funcionariosPaginados);
    }

    @DeleteMapping("/deletar/{id}")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<FuncionarioRemover> deletarFuncionarioPorId(@PathVariable Long id) {
        if (funcionarioService.buscarFuncionarioListarPorId(id).isPresent()) {
            funcionarioService.deletarFuncionario(id);
            FuncionarioRemover removido = FuncionarioMapper.of(id);
            return ResponseEntity.ok(removido);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/listar/{id}")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<FuncionarioListar> buscarFuncionarioListarPorId(@PathVariable Long id){
        Optional<FuncionarioListar> funcionarioDTO = funcionarioService.buscarFuncionarioListarPorId(id);
        return funcionarioDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/cadastro")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<Void> adicionarFuncionario(@RequestBody @Valid FuncionarioCadastro funcionarioCadastro){
        final Funcionario novoFuncionario = FuncionarioMapper.of(funcionarioCadastro);
        this.funcionarioService.cadastrarFuncionario(novoFuncionario);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody FuncionarioLogin funcionarioLogin){
        final Funcionario funcionario = FuncionarioMapper.of(funcionarioLogin);
        TokenDTO funcionarioTokenDto = this.funcionarioService.autenticar(funcionario);
        return ResponseEntity.ok(funcionarioTokenDto);
    }

    @PutMapping("/atualizar/{id}")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<Funcionario> atualizarFuncionario(
            @PathVariable Long id,
            @RequestBody FuncionarioAtualizar funcionarioAtualizar
    ) {
        Funcionario funcionario = FuncionarioMapper.of(id, funcionarioAtualizar);
        return funcionarioService.atualizarFuncionario(id, funcionario)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
