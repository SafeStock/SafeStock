package com.example.safestock.model;

import com.example.safestock.model.enums.TipoFuncionario;
import jakarta.persistence.*;

@Entity
@Table(name="usuario")
public class Funcionario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String telefone;
    private TipoFuncionario tipoCargo;

    public Funcionario() {};
    public Funcionario(String nome, String senha, String telefone, String email, TipoFuncionario tipoCargo) {
        this.nome = nome;
        this.senha = senha;
        this.telefone = telefone;
        this.email = email;
        this.tipoCargo = tipoCargo;
    };
}
