package com.example.safestock.infrastructure.entity;

import com.example.safestock.domain.enuns.CargoFuncionario;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.util.List;

@Entity
@Table(name = "FuncionarioV2")
public class FuncionarioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O campo nome não pode estar em branco")
    private String nome;

    @NotBlank(message = "O campo sobrenome não pode estar em branco")
    private String sobrenome;

    @Enumerated(EnumType.STRING)
    private CargoFuncionario cargo;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "O campo email não pode estar em branco")
    @Email
    private String email;

    @NotBlank(message = "O campo senha não pode ser nulo")
    private String senha;

    @NotBlank(message = "O campo telefone não pode ser nulo")
    @Pattern(regexp = "\\d{11}", message = "O campo telefone deve conter 11 caracteres")
    private String telefone;

    @ManyToOne
    @JoinColumn(name = "fkCreche")
    private CrecheEntity creche;

    @OneToMany(mappedBy = "funcionario", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<RegistroUsoEntity> registrosUso;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public CargoFuncionario getCargo() {
        return cargo;
    }

    public void setCargo(CargoFuncionario cargo) {
        this.cargo = cargo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public CrecheEntity getCreche() {
        return creche;
    }

    public void setCreche(CrecheEntity creche) {
        this.creche = creche;
    }

    public List<RegistroUsoEntity> getRegistrosUso() {
        return registrosUso;
    }

    public void setRegistrosUso(List<RegistroUsoEntity> registrosUso) {
        this.registrosUso = registrosUso;
    }
}
