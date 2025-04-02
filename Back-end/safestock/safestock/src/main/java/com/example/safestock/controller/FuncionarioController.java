package com.example.safestock.controller;


import com.example.safestock.model.Funcionario;
import com.example.safestock.repository.FuncionarioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/funcionarios")
public class FuncionarioController {

    private final FuncionarioRepository funcionarioRepository;

    public FuncionarioController(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    @GetMapping("/{id}")
    public Optional<Funcionario> listarUsuarioPorId(@PathVariable Long id){
        return usuarioRepository.findById(id);
    }

    @GetMapping
    public List<Funcionario> listarUsuario(){
        return usuarioRepository.findAll();
    }

    @PostMapping
    public Funcionario adicionarUsuario(@RequestBody Funcionario usuario){
        return usuarioRepository.save(usuario);
    }



    @DeleteMapping("/{id}")
    public String removerUsuario(@PathVariable Long id){
        usuarioRepository.deleteById(id);
        return "Usuario removido com sucesso!";
    }

    @PutMapping("/{id}")
    public Funcionario atualizarUsuario(@PathVariable Long id, @RequestBody Funcionario novoUsuario){
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNome(novoUsuario.getNome());
            usuario.setEmail(novoUsuario.getEmail());
            usuario.setSenha(novoUsuario.getSenha());
            usuario.setTelefone(novoUsuario.getTelefone());
            usuario.setCargo(novoUsuario.getCargo());
            return usuarioRepository.save(usuario);
        }).orElseThrow(() -> new RuntimeException("Usuario não Encontrado"));
    }
}
