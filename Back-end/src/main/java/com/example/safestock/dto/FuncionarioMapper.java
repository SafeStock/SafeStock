package com.example.safestock.dto;

import com.example.safestock.model.Funcionario;

public class FuncionarioMapper {

    public static Funcionario of(FuncionarioCadastro funcionarioCadastro) {
        Funcionario funcionario = new Funcionario();

        funcionario.setNome(funcionarioCadastro.getNome());
        funcionario.setSobrenome(funcionarioCadastro.getSobrenome());
        funcionario.setEmail(funcionarioCadastro.getEmail());
        funcionario.setSenha(funcionarioCadastro.getSenha());
        funcionario.setTelefone(funcionarioCadastro.getTelefone());
        funcionario.setCargo(funcionarioCadastro.getCargo());

        return funcionario;
    }

    public static Funcionario of(FuncionarioLogin funcionarioLogin) {
        Funcionario funcionario = new Funcionario();

        funcionario.setEmail(funcionarioLogin.getEmail());
        funcionario.setSenha(funcionarioLogin.getSenha());

        return funcionario;
    }

    public static TokenDTO of(Funcionario funcionario, String token) {
        TokenDTO tokenDTO = new TokenDTO();

        tokenDTO.setId(funcionario.getId());
        tokenDTO.setEmail(funcionario.getEmail());
        tokenDTO.setNome(funcionario.getNome());
        tokenDTO.setSobrenome(funcionario.getSobrenome());
        tokenDTO.setTelefone(funcionario.getTelefone());
        tokenDTO.setToken(token);
        tokenDTO.setCargo(funcionario.getCargo());

        return tokenDTO;
    }

    public static FuncionarioListar of(Funcionario funcionario) {
        FuncionarioListar funcionarioListar = new FuncionarioListar();

        funcionarioListar.setId(funcionario.getId());
        funcionarioListar.setEmail(funcionario.getEmail());
        funcionarioListar.setSobrenome(funcionario.getSobrenome());
        funcionarioListar.setNome(funcionario.getNome());

        return funcionarioListar;
    }

    public static FuncionarioRemover of(Long id) {
        FuncionarioRemover remover = new FuncionarioRemover();
        remover.setId(id);
        return remover;
    }

    public static Funcionario of(Long id, FuncionarioAtualizar funcionarioAtualizar) {
        Funcionario funcionario = new Funcionario();

        funcionario.setId(id);
        funcionario.setNome(funcionarioAtualizar.getNome());
        funcionario.setSobrenome(funcionarioAtualizar.getSobrenome());
        funcionario.setEmail(funcionarioAtualizar.getEmail());
        funcionario.setSenha(funcionarioAtualizar.getSenha());
        funcionario.setTelefone(funcionarioAtualizar.getTelefone());
        funcionario.setCargo(funcionarioAtualizar.getCargo());

        return funcionario;
    }

}