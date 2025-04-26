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
        tokenDTO.setToken(token);

        return tokenDTO;
    }

    public static FuncionarioListar of(Funcionario funcionario) {
        FuncionarioListar funcionarioListar = new FuncionarioListar();

        funcionarioListar.setId(funcionario.getId());
        funcionarioListar.setEmail(funcionario.getEmail());
        funcionarioListar.setNome(funcionario.getNome());

        return funcionarioListar;
    }

}