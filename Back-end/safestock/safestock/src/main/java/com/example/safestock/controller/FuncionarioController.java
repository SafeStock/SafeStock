package com.example.safestock.controller;


import com.example.safestock.model.Creche;
import com.example.safestock.model.Funcionario;
import com.example.safestock.repository.FuncionarioRepository;
import com.example.safestock.service.FuncionarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/funcionarios")
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    public FuncionarioController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }

    @GetMapping
    public List<Funcionario> listarCreches(){
        return funcionarioService.listarFuncionarios();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> buscarFuncionarioPorId(@PathVariable Long id){
        Optional<Funcionario> funcionario = funcionarioService.buscarFuncionarioPorId(id);
        return funcionario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Funcionario> adicionarFuncionario(@Valid @RequestBody Funcionario funcionario){
        Funcionario novaCreche = funcionarioService.salvarFuncionario(funcionario);
        return ResponseEntity.ok(novaCreche);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Funcionario> removerCreche(@PathVariable Long id){
        if (funcionarioService.buscarFuncionarioPorId(id).isPresent()){
            funcionarioService.removerFuncionarioPorId(id);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> atualizarFuncionario(@PathVariable Long id, @RequestBody Funcionario novoFuncionario) {
        return funcionarioService.atualizarFuncionario(id, novoFuncionario)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
