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
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173" )
@RestController
@RequestMapping("api/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<List<FuncionarioListar>> listarFuncionarios() {
        String emailLogado = SecurityContextHolder.getContext().getAuthentication().getName();
        List<FuncionarioListar> funcionariosEncontrados = this.funcionarioService
                .listarTodosExcetoLogadoEDono(emailLogado);

        if (funcionariosEncontrados.isEmpty()){
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(funcionariosEncontrados);
    }


    @GetMapping("/paged")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<?> listarFuncionariosPaginado(@RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "5") int size) {
        String emailLogado = SecurityContextHolder.getContext().getAuthentication().getName();
        org.springframework.data.domain.Page<com.example.safestock.dto.FuncionarioListar> resultado =
                funcionarioService.listarPaginadoExcetoLogadoEDono(emailLogado, page, size);

        if (resultado == null || resultado.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        java.util.Map<String, Object> body = new java.util.HashMap<>();
        body.put("content", resultado.getContent());
        body.put("page", resultado.getNumber());
        body.put("size", resultado.getSize());
        body.put("totalPages", resultado.getTotalPages());
        body.put("totalElements", resultado.getTotalElements());

        return ResponseEntity.ok(body);
    }

    // Endpoint público temporário para testes locais (não requer token)
    @GetMapping("/public/paged")
    public ResponseEntity<?> listarFuncionariosPaginadoPublico(@RequestParam(defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "5") int size) {
        org.springframework.data.domain.Page<com.example.safestock.dto.FuncionarioListar> resultado =
                funcionarioService.listarPaginadoExcetoLogadoEDono("", page, size);

        if (resultado == null || resultado.isEmpty()) {
            return ResponseEntity.status(204).build();
        }

        java.util.Map<String, Object> body = new java.util.HashMap<>();
        body.put("content", resultado.getContent());
        body.put("page", resultado.getNumber());
        body.put("size", resultado.getSize());
        body.put("totalPages", resultado.getTotalPages());
        body.put("totalElements", resultado.getTotalElements());

        return ResponseEntity.ok(body);
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
        final  Funcionario funcionario = FuncionarioMapper.of(funcionarioLogin);
        TokenDTO funcionarioTokenDto = this.funcionarioService.autenticar(funcionario);

        return  ResponseEntity.status(200).body(funcionarioTokenDto);
    }

    @PutMapping("/atualizar/{id}")
    @SecurityRequirement(name = "Bearer")
    public ResponseEntity<Funcionario> atualizarFuncionario(@PathVariable Long id, @RequestBody FuncionarioAtualizar funcionarioAtualizar) {

        Funcionario funcionario = FuncionarioMapper.of(id, funcionarioAtualizar); // <- corrigido aqui

        return funcionarioService.atualizarFuncionario(id, funcionario)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
