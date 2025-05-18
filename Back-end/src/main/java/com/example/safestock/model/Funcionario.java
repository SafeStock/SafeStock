package com.example.safestock.model;

import com.example.safestock.model.enums.CargoFuncionario;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="Funcionario")
@Getter @Setter @AllArgsConstructor @ToString
public class Funcionario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O campo nome não pode estar em branco")
    private String nome;

    @NotBlank(message = "O campo nome não pode estar em branco")
    private String sobrenome;

    private CargoFuncionario cargo;

    @NotBlank(message = "O campo email não pode estar em branco")
    @Email
    private String email;

        @NotBlank(message = "O campo senha não pode ser nulo")
    @Size(min = 4, message = "O campo senha deve conter no minimo 4 caracteres")
    private String senha;

    @NotBlank(message = "O campo telefone não pode ser nulo")
    @Pattern(regexp = "\\d{11}", message = "O campo telefone deve conter 11 caracteres")
    private String telefone;

    @ManyToOne
    @JoinColumn(name = "fkCreche")
    private Creche creche;

    @OneToMany(mappedBy = "funcionario")
    private List<RegistroUso> registroUso;


    public Funcionario() {};

    public Funcionario(String nome, String sobrenome, CargoFuncionario cargo, String email, String senha, String telefone) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cargo = cargo;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
    }

    // getters e setters
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


}
