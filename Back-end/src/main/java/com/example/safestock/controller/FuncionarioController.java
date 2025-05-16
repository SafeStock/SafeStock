package com.example.safestock.controller;

import com.example.safestock.dto.*;
import com.example.safestock.model.Funcionario;
import com.example.safestock.service.FuncionarioService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<FuncionarioListar>> listarFuncionarios(){
        List<FuncionarioListar> funcionariosEncontrados = this.funcionarioService.listarTodos();
        if (funcionariosEncontrados.isEmpty()){
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(200).body(funcionariosEncontrados);
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

        Funcionario funcionario = FuncionarioMapper.of(funcionarioAtualizar);

        return funcionarioService.atualizarFuncionario(id, funcionario)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
