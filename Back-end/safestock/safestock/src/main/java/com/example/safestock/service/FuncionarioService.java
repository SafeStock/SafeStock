package com.example.safestock.service;

import com.example.safestock.model.Creche;
import com.example.safestock.model.Funcionario;
import com.example.safestock.repository.FuncionarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {

    public final FuncionarioRepository funcionarioRepository;

    public FuncionarioService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    public List<Funcionario> listarFuncionarios() {
        return funcionarioRepository.findAll();
    }

    public Optional<Funcionario> buscarFuncionarioPorId(Long id) {
        return funcionarioRepository.findById(id);
    }

    public Funcionario salvarFuncionario(Funcionario funcionario) {
        return funcionarioRepository.save(funcionario);
    }

    public void removerFuncionarioPorId(Long id) {
        funcionarioRepository.deleteById(id);
    }

    public Optional<Funcionario> atualizarFuncionario(Long id, Funcionario novoFuncionario) {
        return funcionarioRepository.findById(id).map(funcionario -> {
            funcionario.setNome(novoFuncionario.getNome());
            funcionario.setEmail(novoFuncionario.getEmail());
            funcionario.setSenha(novoFuncionario.getSenha());
            funcionario.setTelefone(novoFuncionario.getTelefone());
            funcionario.setTipoCargo(novoFuncionario.getTipoCargo());
            return funcionarioRepository.save(funcionario);
        });
    }
}
